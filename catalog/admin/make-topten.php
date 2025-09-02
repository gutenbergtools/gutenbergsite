<?php

  // 2020-01-06: gbn
  // Copied from Marcello's program in 
  // /public/vhost/g/gutenberg/html/catalog/admin

  // This makes various static pages for browsing the collection.
  // It's not just "top10." It's top 100, in various subsets.

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

include ("pgcat.phh");

// PUBLIC is different for dev
$docroot = getenv ('PUBLIC');
if ($docroot) {
  $config->documentroot = $docroot;
}

function mk_header ($title) {
  global $config;
  return "<?php
  include (\"pgbrowse.phh\");
  \$config->page_encoding = \"UTF-8\";
  pageheader (\"$title\");
?>\n\n";
}

$dir        = "browse";
$dir_scores = "$dir/scores";

@mkdir ("$config->documentroot/$dir",        0755);
@mkdir ("$config->documentroot/$dir_scores", 0755);

$db  = $config->db ();
$db2 = $config->db ();

////////////////////////////////////////////////////////////////////////////////
// top scores

// disqualified because they are mp3 files and have "House" in title
// its amazing how many kids try to download these
// moreover "Usher" seems to be a rap artist
$disqualifiedbooks   = "0, 6550, 6557, 9280, 9695, 9714";
// unknown, anonymous and various
$disqualifiedauthors = "49, 116, 216";

function downloads ($where = "") {
  global $db2, $config, $disqualifiedbooks;
  $s = "";

  $db2->exec ("
SELECT SUM (downloads) AS downloads 
FROM dl
WHERE $where");

  if ($db2->FirstRow ()) {
    return $db2->get ("downloads", SQLINT);
  }

  return 0;
}

function topbooks ($num, $where = "") {
  global $db2, $config, $disqualifiedbooks;
  $s = "";

  $db2->exec ("
SELECT fk_books, SUM (downloads) AS downloads 
FROM dl
WHERE $where
GROUP BY fk_books
ORDER BY downloads DESC LIMIT $num");

  $s .= "<ol>\n";

  if ($db2->FirstRow ()) {
    do {
      $fk_books  = $db2->get ("fk_books",  SQLINT);
      $downloads = $db2->get ("downloads", SQLINT);
      $friendlytitle = friendlytitle ($fk_books, 100);
      $s .= "<li><a href=\"$config->etext/$fk_books\">$friendlytitle ($downloads)</a></li>\n";
    } while ($db2->NextRow ());
  }

  $s .= "</ol>\n";
  return $s;
}

function topauthors ($num, $where = "") {
  global $db2, $config, $disqualifiedbooks, $disqualifiedauthors;
  $s = "";

  $db2->exec ("
SELECT author, fk_authors, SUM (dl.downloads) as downloads
FROM authors, mn_books_authors, dl
WHERE $where 
  AND authors.pk = mn_books_authors.fk_authors
  AND mn_books_authors.fk_books = dl.fk_books 
  AND fk_authors NOT IN ($disqualifiedauthors) 
GROUP BY author, fk_authors 
ORDER BY downloads DESC LIMIT $num");

  $s .= "<ol>\n";

  if ($db2->FirstRow ()) {
    do {
      $author     = $db2->get ("author",     SQLCHAR);
      $fk_authors = $db2->get ("fk_authors", SQLINT);
      $downloads  = $db2->get ("downloads",  SQLINT);
      $href       = find_browse_page ($author) . "#a$fk_authors";

      $s .= ("<li><a href=\"/browse/authors/$href\">$author ($downloads)</a></li>\n");
    } while ($db2->NextRow ());
  }

  $s .= "</ol>\n";
  return $s;
}

/////////////////////////////////////////////////////////////////////////////////////
// start main

echo ("creating temp table ...");

$db2->exec ("CREATE TEMP TABLE dl AS 
SELECT scores.book_downloads.fk_books, scores.book_downloads.date, 
       scores.book_downloads.downloads, fk_langs
FROM scores.book_downloads, mn_books_langs
WHERE scores.book_downloads.fk_books = mn_books_langs.fk_books 
AND scores.book_downloads.fk_books NOT IN ($disqualifiedbooks)");

echo (" done.\n");

$langs = array ();

$langs[] = array ("",  100);  // Top  100 all languages
$langs[] = array ("", 1000);  // Top 1000 all languages

$db2->exec ("select fk_langs, count (fk_langs) as cnt from mn_books_langs group by fk_langs order by cnt desc;");
if ($db2->FirstRow ()) {
  do {
    $fk_langs = $db2->get ("fk_langs", SQLCHAR);
    $langs[] = array ($fk_langs, 100); // Top 100 this language
  } while ($db2->NextRow ());
}

echo (" done.\n");

$db2->exec ("select max (date) as latest, min (date) as earliest from scores.book_downloads");
$latest   = date ("Y-m-d", $db2->get ("latest", SQLDATE));
$earliest = date ("Y-m-d", $db2->get ("earliest", SQLDATE));

// start output

foreach ($langs as $l) {
  $lang = $l[0];
  $num  = $l[1];

  $filesuffix = "";
  $titlesuffix = "$num";
  $langwhere = "";

  if ($num != 100) {
    $filesuffix .= "$num";
  }

  if (!empty ($lang)) {
    $filesuffix .= "-$lang";
    $titlesuffix .= " ($lang)";
    $langwhere = "fk_langs = '$lang' AND ";
  }

  if ($hd = fopen ($file = "$config->documentroot/$dir_scores/top$filesuffix.php", "w")) {
    echo ("writing $file ... downloads ...\n");

    $d1  = downloads ("$langwhere date >= current_date - interval '1 days'");
    $d7  = downloads ("$langwhere date >= current_date - interval '7 days'");
    $d30 = downloads ("$langwhere date >= current_date - interval '30 days'");

    fputs ($hd, mk_header ("Top $titlesuffix"));

    $s = <<< EOF
<h1>Frequently Viewed or Downloaded</h1>

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

EOF;

    fputs ($hd, $s);

    $links = " <div id=\"books-downloads-nav\" class=\"padded\">
  <ul>
   <li><a href=\"#books-last1\">Top $num EBooks yesterday</a></li>
   <li><a href=\"#authors-last1\">Top $num Authors yesterday</a></li>
   <li><a href=\"#books-last7\">Top $num EBooks last 7 days</a></li>
   <li><a href=\"#authors-last7\">Top $num Authors last 7 days</a></li>
   <li><a href=\"#books-last30\">Top $num EBooks last 30 days</a></li>
   <li><a href=\"#authors-last30\">Top $num Authors last 30 days</a></li>
  </ul>
 </div>
";

    // Yesterday

    echo (" yesterday ... books ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"books-last1\">Top $num EBooks yesterday</h2>\n\n"); 

    fputs ($hd, topbooks ($num, "$langwhere date >= current_date - interval '1 days'"));

    echo (" authors ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"authors-last1\">Top $num Authors yesterday</h2>\n\n"); 

    fputs ($hd, topauthors ($num, "$langwhere date >= current_date - interval '1 days'"));

    // Last 7 days

    echo (" last 7 days ... books ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"books-last7\">Top $num EBooks last 7 days</h2>\n\n"); 

    fputs ($hd, topbooks ($num, "$langwhere date >= current_date - interval '7 days'"));

    echo (" authors ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"authors-last7\">Top $num Authors last 7 days</h2>\n\n"); 

    fputs ($hd, topauthors ($num, "$langwhere date >= current_date - interval '7 days'"));

    // Last 30 days

    echo (" last 30 days ... books ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"books-last30\">Top $num EBooks last 30 days</h2>\n\n"); 

    fputs ($hd, topbooks ($num, "$langwhere date >= current_date - interval '30 days'"));

    echo (" authors ...");

    fputs ($hd, $links);
    fputs ($hd, "<h2 id=\"authors-last30\">Top $num Authors last 30 days</h2>\n\n"); 

    fputs ($hd, topauthors ($num, "$langwhere date >= current_date - interval '30 days'"));

    fputs ($hd, $links);

    fputs ($hd, "<?php pagefooter (); ?>\n");
    fclose ($hd);

    echo (" done.\n");
  }
}

?>
