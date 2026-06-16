#!/usr/bin/env python3
"""Generate top download score pages as static HTML.

Python port of catalog/admin/make-topten.php.
"""

from __future__ import annotations

import argparse
import html
import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

try:
    import psycopg  # type: ignore
except ImportError:  # pragma: no cover
    psycopg = None

try:
    import psycopg2  # type: ignore
except ImportError:  # pragma: no cover
    psycopg2 = None

DISQUALIFIED_BOOKS = (0, 6550, 6557, 9280, 9695, 9714)
DISQUALIFIED_AUTHORS = (49, 116, 216)


@dataclass(frozen=True)
class Settings:
    dsn: str
    document_root: Path
    etext_base: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate top score HTML pages from scores.book_downloads"
    )
    parser.add_argument(
        "--dsn",
        default=os.getenv("PGCAT_DSN", ""),
        help=(
            "PostgreSQL DSN. Defaults to PGCAT_DSN; if not set, "
            "constructed from PG* environment variables."
        ),
    )
    parser.add_argument(
        "--document-root",
        default=os.getenv("PUBLIC", ""),
        help="Document root directory. Defaults to PUBLIC environment variable.",
    )
    parser.add_argument(
        "--etext-base",
        default=os.getenv("ETEXT_BASE", "/ebooks"),
        help="Base URL for ebook links.",
    )
    return parser.parse_args()


def build_dsn(explicit_dsn: str) -> str:
    if explicit_dsn:
        return explicit_dsn

    # Allow using standard PostgreSQL environment variables.
    pg_keys = {
        "host": "PGHOST",
        "port": "PGPORT",
        "dbname": "PGDATABASE",
        "user": "PGUSER",
        "password": "PGPASSWORD",
    }
    pairs = []
    for dsn_key, env_key in pg_keys.items():
        value = os.getenv(env_key)
        if value:
            pairs.append(f"{dsn_key}={value}")

    if not pairs:
        raise ValueError(
            "No database settings found. Set --dsn / PGCAT_DSN or standard PG* environment variables."
        )

    return " ".join(pairs)


def normalize_title(raw_title: str | None, fk_book: int, max_len: int = 100) -> str:
    if not raw_title:
        return f"EBook #{fk_book}"
    title = re.sub(r"\s+", " ", raw_title).strip()
    if len(title) <= max_len:
        return title
    return title[: max_len - 3].rstrip() + "..."


def find_browse_page(author: str) -> str:
    # Legacy PHP logic is in pgcat.phh, which is not present in this workspace.
    # This fallback keeps links deterministic by bucketing on first alnum char.
    author = (author or "").strip().lower()
    for ch in author:
        if ch.isalpha() or ch.isdigit():
            return ch
    return "other"


def mk_header(title: str) -> str:
    safe_title = html.escape(title, quote=True)
    return (
        "<!doctype html>\n"
        "<html lang=\"en\">\n"
        "<head>\n"
        "  <meta charset=\"UTF-8\">\n"
        "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
        f"  <title>{safe_title}</title>\n"
        "</head>\n"
        "<body>\n\n"
    )


def downloads(cur, lang: str, span: str) -> int:
    if lang:
        cur.execute(
            """
            SELECT COALESCE(SUM(downloads), 0) AS downloads
            FROM dl
            WHERE fk_langs = %s AND date >= current_date - interval %s
            """,
            (lang, span),
        )
    else:
        cur.execute(
            """
            SELECT COALESCE(SUM(downloads), 0) AS downloads
            FROM dl
            WHERE date >= current_date - interval %s
            """,
            (span,),
        )
    row = cur.fetchone()
    return int(row[0]) if row else 0


def topbooks(cur, num: int, lang: str, span: str, etext_base: str) -> str:
    where_sql = "date >= current_date - interval %s"
    params: list[object] = [span]
    if lang:
        where_sql = "fk_langs = %s AND " + where_sql
        params.insert(0, lang)

    cur.execute(
        f"""
        SELECT dl.fk_books, SUM(dl.downloads) AS downloads, b.title
        FROM dl
        LEFT JOIN books b ON b.pk = dl.fk_books
        WHERE {where_sql}
        GROUP BY dl.fk_books, b.title
        ORDER BY downloads DESC
        LIMIT %s
        """,
        params + [num],
    )

    out = ["<ol>"]
    etext_prefix = etext_base.rstrip("/")
    for fk_books, dl_count, title in cur.fetchall():
        friendly = html.escape(normalize_title(title, fk_books, 100), quote=False)
        out.append(
            f'<li><a href="{etext_prefix}/{fk_books}">{friendly} ({dl_count})</a></li>'
        )
    out.append("</ol>")
    return "\n".join(out) + "\n"


def topauthors(cur, num: int, lang: str, span: str) -> str:
    where_sql = "date >= current_date - interval %s"
    params: list[object] = [span]
    if lang:
        where_sql = "fk_langs = %s AND " + where_sql
        params.insert(0, lang)

    cur.execute(
        f"""
        SELECT author, fk_authors, SUM(dl.downloads) AS downloads
        FROM authors, mn_books_authors, dl
        WHERE {where_sql}
          AND authors.pk = mn_books_authors.fk_authors
          AND mn_books_authors.fk_books = dl.fk_books
          AND fk_authors NOT IN %s
        GROUP BY author, fk_authors
        ORDER BY downloads DESC
        LIMIT %s
        """,
        params + [DISQUALIFIED_AUTHORS, num],
    )

    out = ["<ol>"]
    for author, fk_authors, dl_count in cur.fetchall():
        href = find_browse_page(author) + f"#a{fk_authors}"
        safe_author = html.escape(author, quote=False)
        out.append(f'<li><a href="/browse/authors/{href}">{safe_author} ({dl_count})</a></li>')
    out.append("</ol>")
    return "\n".join(out) + "\n"


def get_connection(dsn: str):
    if psycopg is not None:
        return psycopg.connect(dsn)
    if psycopg2 is not None:
        return psycopg2.connect(dsn)
    raise RuntimeError("Neither psycopg (v3) nor psycopg2 is installed.")


def ensure_dirs(document_root: Path) -> Path:
    scores_dir = document_root / "browse" / "scores"
    scores_dir.mkdir(parents=True, exist_ok=True)
    return scores_dir


def iter_lang_limits(cur) -> Iterable[tuple[str, int]]:
    # Top 100 and top 1000 across all languages.
    yield ("", 100)
    yield ("", 1000)

    cur.execute(
        """
        SELECT fk_langs, COUNT(fk_langs) AS cnt
        FROM mn_books_langs
        GROUP BY fk_langs
        ORDER BY cnt DESC
        """
    )
    for fk_langs, _cnt in cur.fetchall():
        yield (fk_langs, 100)


def main() -> int:
    args = parse_args()

    document_root_raw = args.document_root.strip()
    if not document_root_raw:
        print("ERROR: --document-root or PUBLIC must be set", file=sys.stderr)
        return 2

    settings = Settings(
        dsn=build_dsn(args.dsn),
        document_root=Path(document_root_raw),
        etext_base=args.etext_base,
    )

    scores_dir = ensure_dirs(settings.document_root)

    with get_connection(settings.dsn) as conn:
        conn.autocommit = False
        with conn.cursor() as cur:
            print("creating temp table ...", end="", flush=True)
            cur.execute(
                """
                CREATE TEMP TABLE dl AS
                SELECT scores.book_downloads.fk_books,
                       scores.book_downloads.date,
                       scores.book_downloads.downloads,
                       fk_langs
                FROM scores.book_downloads, mn_books_langs
                WHERE scores.book_downloads.fk_books = mn_books_langs.fk_books
                  AND scores.book_downloads.fk_books NOT IN %s
                """,
                (DISQUALIFIED_BOOKS,),
            )
            print(" done.")

            cur.execute("SELECT MAX(date) AS latest, MIN(date) AS earliest FROM scores.book_downloads")
            latest, _earliest = cur.fetchone()
            latest_str = latest.strftime("%Y-%m-%d")

            links = (
                "  <style>\n"
                "    #books-downloads-nav { display: inline-block; overflow: auto; border: solid 1px #eee; padding: 1em; background: #fafafa;}\n"
                "  </style>\n"
                "  <div id=\"books-downloads-nav\">\n"
                "    <b>Top 100 EBooks:</b> <a href=\"#books-last1\">Yesterday</a> - <a href=\"#books-last7\">7&nbsp;days</a> - <a href=\"#books-last30\">30&nbsp;days</a><br>\n"
                "    <b>Top 100 Authors:</b> <a href=\"#authors-last1\">Yesterday</a> - <a href=\"#authors-last7\">7&nbsp;days</a> - <a href=\"#authors-last30\">30&nbsp;days</a>\n"
                "  </div>\n"
            )

            for lang, num in iter_lang_limits(cur):
                file_suffix = ""
                title_suffix = str(num)
                if num != 100:
                    file_suffix += str(num)
                if lang:
                    file_suffix += f"-{lang}"
                    title_suffix += f" ({lang})"

                out_file = scores_dir / f"top{file_suffix}.html"
                print(f"writing {out_file} ... downloads ...")

                d1 = downloads(cur, lang, "1 days")
                d7 = downloads(cur, lang, "7 days")
                d30 = downloads(cur, lang, "30 days")

                with out_file.open("w", encoding="utf-8") as hd:
                    hd.write(mk_header(f"Top {title_suffix}"))
                    hd.write(
                        f"""
<h1>Frequently Viewed or Downloaded</h1>

<details>
<summary style=\"cursor: pointer\">Click here to see download statistics</summary>

<p>Calculated from the number of times each eBook gets
 downloaded. (Multiple downloads from the same Internet
 address on the same day count as one download. Addresses
 that download more than 100 eBooks in a day are considered
 robots and are not counted.)</p>

<table id=\"books-downloads-table\">
  <caption>Downloaded Books</caption>
  <tr><th>{latest_str}</th><td class=\"right\">{d1}</td></tr>
  <tr><th>last 7 days</th><td class=\"right\">{d7}</td></tr>
  <tr><th>last 30 days</th><td class=\"right\">{d30}</td></tr>
</table>

<p>Visualizations and graphs are available as
<a href=\"/about/pretty-pictures.html\">pretty pictures</a>.</p>

</details>
"""
                    )

                    print(" yesterday ... books ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="books-last1">Top {num} EBooks yesterday</h2>\n\n')
                    hd.write(topbooks(cur, num, lang, "1 days", settings.etext_base))

                    print(" authors ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="authors-last1">Top {num} Authors yesterday</h2>\n\n')
                    hd.write(topauthors(cur, num, lang, "1 days"))

                    print(" last 7 days ... books ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="books-last7">Top {num} EBooks last 7 days</h2>\n\n')
                    hd.write(topbooks(cur, num, lang, "7 days", settings.etext_base))

                    print(" authors ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="authors-last7">Top {num} Authors last 7 days</h2>\n\n')
                    hd.write(topauthors(cur, num, lang, "7 days"))

                    print(" last 30 days ... books ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="books-last30">Top {num} EBooks last 30 days</h2>\n\n')
                    hd.write(topbooks(cur, num, lang, "30 days", settings.etext_base))

                    print(" authors ...", end="", flush=True)
                    hd.write(links)
                    hd.write(f'<h2 id="authors-last30">Top {num} Authors last 30 days</h2>\n\n')
                    hd.write(topauthors(cur, num, lang, "30 days"))

                    hd.write(links)
                    hd.write("</body>\n</html>\n")

                print(" done.")

            conn.rollback()  # temp table lifecycle only

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
