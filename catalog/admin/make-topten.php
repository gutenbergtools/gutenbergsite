<?php

// 2020-01-06: gbn
// Copied from Marcello's program in
// /public/vhost/g/gutenberg/html/catalog/admin

// This makes various static pages for browsing the collection.
// It's not just "top10." It's top 100, in various subsets.

$cli = php_sapi_name() == "cli";
if (!$cli) {
    exit();
}

include("pgcat.phh");

// PUBLIC is different for dev
$docroot = getenv('PUBLIC');
if ($docroot) {
    $config->documentroot = $docroot;
}

$config->page_encoding = "UTF-8";

function mk_header($title)
{
    $menu = <<<'MENU'
<header>
    <input type="radio" name="toggle" id="search-toggle" style="display: none" >
    <input type="radio" name="toggle" id="search-close" style="display: none" >
    <input type="checkbox" id="about-toggle" style="display: none" >
    <div class="logo-container">
        <a id="main_logo" href="/" class="no-hover">
            <img src="/gutenberg/pg-logo-new.jpg" alt="Project Gutenberg" draggable="false" >
        </a>
    </div>

    <div class="top-header">
        <form
            class="search-form"
            method="get"
            action="/ebooks/search/"
            accept-charset="utf-8"
        >
            <label
                for="search-toggle"
                class="search-icon-btn"
                aria-label="Open Search"
            >
                <svg
                    class="search-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="1em"
                    height="1em"
                >
                    <path
                        d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                    />
                    <path d="M0 0h24v24H0z" fill="none" />
                </svg>
            </label>
            <label for="search-close" class="search-close-btn" aria-label="Close Search">X</label>
            <input
                type="text"
                class="search-input"
                name="query"
                placeholder="Quick search"
                aria-label="Search books"
            >
            <button type="submit" class="search-button">Go!</button>
        </form>

        <div class="donate-container">
            <form
                class="donatelink"
                action="https://www.paypal.com/cgi-bin/webscr"
                method="post"
                target="new"
            >
                <input type="hidden" name="cmd" value="_s-xclick" >
                <input
                    type="hidden"
                    name="hosted_button_id"
                    value="XKAL6BZL3YPSN"
                >
                <input
                    class="donbtn"
                    type="image"
                    src="/pics/en_US.gif"
                    name="submit"
                    alt="Donate via PayPal"
                >
            </form>
            <a href="/donate/" class="donate-link"> Donate </a>
        </div>
    </div>

    <div class="lower-header" role="navigation">
        <div class="dropdown" tabindex="0">
            <label for="about-toggle" class="dropdown-button" aria-haspopup="true">About<span aria-hidden="true" class="dropdown-icon">▼</span></label>
            <div class="dropdown-content">
                <a href="/about/">About Project Gutenberg </a>
                <a href="/help/reading_options.html">Reading Options & Kindle</a>
                <a href="/about/contact_information.html">Contact Us</a>
                <a href="/about/background/">History &amp; Philosophy</a>
                <a href="/help/">Help Pages</a>
                <a href="/ebooks/offline_catalogs.html">Offline Catalogs</a>
                <a href="/donate/">Donate</a>
            </div>
        </div>

        <div class="main-links">
            <a href="/browse/scores/top" class="link-freq-downloaded"
                >Frequently Downloaded</a
            >
            <a href="/ebooks/categories" class="link-main-categories"
                >Main Categories</a
            >
            <a href="/ebooks/bookshelf/" class="link-reading-lists"
                >Reading Lists</a
            >
            <a href="/ebooks/" class="link-advanced-search">Search Options</a>
        </div>
    </div>

    <div class="tertiary-header" >
        <a href="/browse/scores/top" class="tertiary-link link-freq-downloaded"
            >Frequently Downloaded</a
        >
        <a href="/ebooks/categories" class="tertiary-link link-main-categories"
            >Main Categories</a
        >
    </div>
</header>

MENU;

    $safeTitle = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
    return "<!DOCTYPE html>\n"
            . "<html class=\"client-nojs\" lang=\"en-US\" dir=\"ltr\" data-lt-installed=\"true\">\n"
            . "<head>\n"
            . "  <meta charset=\"UTF-8\">\n"
            . "  <title>$safeTitle | Project Gutenberg</title>\n"
            . "\n"
            . " <link rel=\"stylesheet\" href=\"/gutenberg/gutenberg-globals.css\">\n"
            . "\n"
            . "\n"
            . " <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n"
            . " <meta name=\"keywords\" content=\"books, ebooks, free, kindle, android, iphone, ipad\">\n"
            . " <meta name=\"google-site-verification\" content=\"wucOEvSnj5kP3Ts_36OfP64laakK-1mVTg-ptrGC9io\">\n"
            . " <meta name=\"alexaVerifyID\" content=\"4WNaCljsE-A82vP_ih2H_UqXZvM\">\n"
            . " \n"
            . " <link rel=\"copyright\" href=\"https://www.gnu.org/copyleft/fdl.html\">\n"
            . " <link rel=\"icon\" type=\"image/png\" href=\"/gutenberg/favicon.ico\" sizes=\"16x16\" >\n"
            . " \n"
            . " <meta property=\"og:title\"        content=\"Project Gutenberg\" >\n"
            . " <meta property=\"og:type\"         content=\"website\" >\n"
            . " <meta property=\"og:url\"          content=\"https://www.gutenberg.org/\" >\n"
            . " <meta property=\"og:description\"  content=\"Project Gutenberg is a library of free eBooks.\" >\n"
            . " <meta property=\"fb:admins\"       content=\"615269807\" >\n"
            . " <meta property=\"fb:app_id\"       content=\"115319388529183\" >\n"
            . " <meta property=\"og:site_name\"    content=\"Project Gutenberg\" >\n"
            . " <meta property=\"og:image\"        content=\"https://www.gutenberg.org/gutenberg/pg-logo-144x144.png\" >\n"
            . "</head>\n"
            . "<body>\n"
            . "<div class=\"container\"><!-- start body -->\n"
            . $menu
            . "<div class=\"page_content\"><!-- start content -->\n";
}

function mk_footer($handle)
{
    $footer = <<<'HTML'
    </div><!--content ending-->
    </div><!-- body ending -->
     <div class="footer" role="contentinfo"><!-- start footer -->

    <ul>
        <li>
            <a href="/about/">About Project Gutenberg</a>
        </li>
        <li>
            <a href="/policy/privacy_policy.html">Privacy policy</a>
        </li>
        <li>
            <a href="/policy/permission.html" title="Permissions, Licensing and other Common Requests">Permissions</a>
        </li>
        <li>
            <a href="/policy/terms_of_use.html">Terms of Use</a>
        </li>
        <li>
            <a href="/a11y/">Accessibility</a>
        </li>
        <li>
            <a href="/about/contact_information.html" title="How to contact Project Gutenberg">Contact Us</a>
        </li>
        <li><a href="/help/" title="Help, How-To, Procedures, Guidance and Information">Help</a></li>
    </ul>

    <a href="https://www.ibiblio.org/" title="Project Gutenberg is hosted by ibiblio">
     <img src="/gutenberg/ibiblio-logo.png" alt="ibiblio" width="110" height="32">
    </a>

     </div><!-- footer ending-->
 </body>
</html>
HTML;

    fwrite($handle, $footer);
}

$dir = "browse";
$dir_scores = "$dir/scores";

@mkdir("$config->documentroot/$dir", 0755);
@mkdir("$config->documentroot/$dir_scores", 0755);

$db = $config->db();
$db2 = $config->db();

////////////////////////////////////////////////////////////////////////////////
// top scores

// disqualified because they are mp3 files and have "House" in title
// its amazing how many kids try to download these
// moreover "Usher" seems to be a rap artist
$disqualifiedbooks = "0, 6550, 6557, 9280, 9695, 9714";
// unknown, anonymous and various
$disqualifiedauthors = "49, 116, 216";

function downloads($where = "")
{
    global $db2, $config, $disqualifiedbooks;
    $s = "";

    $db2->exec("
SELECT SUM (downloads) AS downloads 
FROM dl
WHERE $where");

    if ($db2->FirstRow()) {
        return $db2->get("downloads", SQLINT);
    }

    return 0;
}

function topbooks($num, $where = "")
{
    global $db2, $config, $disqualifiedbooks;
    $s = "";

    $db2->exec("
SELECT fk_books, SUM (downloads) AS downloads 
FROM dl
WHERE $where
GROUP BY fk_books
ORDER BY downloads DESC LIMIT $num");

    $s .= "<ol>\n";

    if ($db2->FirstRow()) {
        do {
            $fk_books = $db2->get("fk_books", SQLINT);
            $downloads = $db2->get("downloads", SQLINT);
            $friendlytitle = friendlytitle($fk_books, 100);
            $s .= "<li><a href=\"$config->etext/$fk_books\">$friendlytitle ($downloads)</a></li>\n";
        } while ($db2->NextRow());
    }

    $s .= "</ol>\n";
    return $s;
}

function topauthors($num, $where = "")
{
    global $db2, $config, $disqualifiedbooks, $disqualifiedauthors;
    $s = "";

    $db2->exec("
SELECT author, fk_authors, SUM (dl.downloads) as downloads
FROM authors, mn_books_authors, dl
WHERE $where 
  AND authors.pk = mn_books_authors.fk_authors
  AND mn_books_authors.fk_books = dl.fk_books 
  AND fk_authors NOT IN ($disqualifiedauthors) 
GROUP BY author, fk_authors 
ORDER BY downloads DESC LIMIT $num");

    $s .= "<ol>\n";

    if ($db2->FirstRow()) {
        do {
            $author = $db2->get("author", SQLCHAR);
            $fk_authors = $db2->get("fk_authors", SQLINT);
            $downloads = $db2->get("downloads", SQLINT);
            $href = find_browse_page($author) . "#a$fk_authors";

            $s .= ("<li><a href=\"/browse/authors/$href\">$author ($downloads)</a></li>\n");
        } while ($db2->NextRow());
    }

    $s .= "</ol>\n";
    return $s;
}

/////////////////////////////////////////////////////////////////////////////////////
// start main

echo("creating temp table ...");

$db2->exec("CREATE TEMP TABLE dl AS 
SELECT scores.book_downloads.fk_books, scores.book_downloads.date, 
       scores.book_downloads.downloads, fk_langs
FROM scores.book_downloads, mn_books_langs
WHERE scores.book_downloads.fk_books = mn_books_langs.fk_books 
AND scores.book_downloads.fk_books NOT IN ($disqualifiedbooks)");

echo(" done.\n");

$langs = [];

$langs[] = ["",  100];  // Top  100 all languages
$langs[] = ["", 1000];  // Top 1000 all languages

$db2->exec("select fk_langs, count (fk_langs) as cnt from mn_books_langs group by fk_langs order by cnt desc;");
if ($db2->FirstRow()) {
    do {
        $fk_langs = $db2->get("fk_langs", SQLCHAR);
        $langs[] = [$fk_langs, 100]; // Top 100 this language
    } while ($db2->NextRow());
}

echo(" done.\n");

$db2->exec("select max (date) as latest, min (date) as earliest from scores.book_downloads");
$latest = date("Y-m-d", $db2->get("latest", SQLDATE));
$earliest = date("Y-m-d", $db2->get("earliest", SQLDATE));

// start output

foreach ($langs as $l) {
    $lang = $l[0];
    $num = $l[1];

    $filesuffix = "";
    $titlesuffix = "$num";
    $langwhere = "";

    if ($num != 100) {
        $filesuffix .= "$num";
    }

    if (!empty($lang)) {
        $filesuffix .= "-$lang";
        $titlesuffix .= " ($lang)";
        $langwhere = "fk_langs = '$lang' AND ";
    }

    if ($hd = fopen($file = "$config->documentroot/$dir_scores/top$filesuffix.html", "w")) {
        $d1 = downloads("$langwhere date >= current_date - interval '1 days'");
        $d7 = downloads("$langwhere date >= current_date - interval '7 days'");
        $d30 = downloads("$langwhere date >= current_date - interval '30 days'");

        fputs($hd, mk_header("Top $titlesuffix"));

        $s = <<< EOF

            <h1>Frequently Viewed or Downloaded</h1>

            <details>
            <summary style="cursor: pointer" save_image_to_download="true">Click here to see download statistics</summary>

            <p>Calculated from the number of times each eBook gets
            downloaded. (Multiple downloads from the same Internet
            address on the same day count as one download. Addresses
            that download more than 100 eBooks in a day are considered
            robots and are not counted.)</p>

            <table id="books-downloads-table">
              <caption>Downloaded Books</caption>
              <tr><th>$latest</th><td class="right">$d1</td></tr>
              <tr><th>last 7 days</th><td class="right">$d7</td></tr>
              <tr><th>last 30 days</th><td class="right">$d30</td></tr>
            </table>

            <p>Visualizations and graphs are available as
            <a href="/about/pretty-pictures.html">pretty pictures</a>.</p>

            </details>
            EOF;

        fputs($hd, $s);

        $links = "  <style>
    #books-downloads-nav { display: inline-block; overflow: auto; border: solid 1px #eee; padding: 1em; background: #fafafa;}
  </style>
  <div id=\"books-downloads-nav\">
    <b>Top 100 EBooks:</b> <a href=\"#books-last1\">Yesterday</a> - <a href=\"#books-last7\">7&nbsp;days</a> - <a href=\"#books-last30\">30&nbsp;days</a><br>
    <b>Top 100 Authors:</b> <a href=\"#authors-last1\">Yesterday</a> - <a href=\"#authors-last7\">7&nbsp;days</a></li> - <a href=\"#authors-last30\">30&nbsp;days</a>
  </div>
";

        // Yesterday

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"books-last1\">Top $num EBooks yesterday</h2>\n\n");

        fputs($hd, topbooks($num, "$langwhere date >= current_date - interval '1 days'"));

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"authors-last1\">Top $num Authors yesterday</h2>\n\n");

        fputs($hd, topauthors($num, "$langwhere date >= current_date - interval '1 days'"));

        // Last 7 days

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"books-last7\">Top $num EBooks last 7 days</h2>\n\n");

        fputs($hd, topbooks($num, "$langwhere date >= current_date - interval '7 days'"));

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"authors-last7\">Top $num Authors last 7 days</h2>\n\n");

        fputs($hd, topauthors($num, "$langwhere date >= current_date - interval '7 days'"));

        // Last 30 days

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"books-last30\">Top $num EBooks last 30 days</h2>\n\n");

        fputs($hd, topbooks($num, "$langwhere date >= current_date - interval '30 days'"));

        fputs($hd, $links);
        fputs($hd, "<h2 id=\"authors-last30\">Top $num Authors last 30 days</h2>\n\n");

        fputs($hd, topauthors($num, "$langwhere date >= current_date - interval '30 days'"));

        fputs($hd, $links);

        mk_footer($hd);
        fclose($hd);

        echo(" done.\n");
    }
}
