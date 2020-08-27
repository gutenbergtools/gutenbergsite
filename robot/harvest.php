<?php

# gbn: Our high-speed mirrors. Sailor is gone.  20170417
# $mirror      = 'http://www.gutenberg.lib.md.us/';
$mirror      = 'http://aleph.gutenberg.org/';
# $epub_mirror = 'http://gutenberg.pglaf.org/';
$epub_mirror = 'http://aleph.gutenberg.org/';

include_once ("pgcat.phh");

$limit = 100;

getint ("offset", 0);
getarray ("filetypes");
getarray ("langs");

// sanitize array
foreach ($filetypes as $ft) {
  if (!preg_match ("/^[.a-z0-9]+$/i", $ft)) {
    header("HTTP/1.0 404 Not Found");
    p ("Malformed filetype.");
    exit ();
  }
}
foreach ($langs as $l) {
  if (!preg_match ("/^[a-z0-9]+$/i", $l)) {
    header("HTTP/1.0 404 Not Found");
    p ("Malformed language code.");
    exit ();
  }
}

$db = $config->db ();

$fts = join (" ", $filetypes);
if (strlen ($fts)) {
  $fts = ", filetypes: $fts";
}
$ls = join (" ", $langs);
if (strlen ($ls)) {
  $ls = ", languages: $ls";
}
$caption = "All Files (offset: $offset$fts$ls)";

echo <<< EOT
<!DOCTYPE HTML PUBLIC "$config->dtd_public" "$config->dtd_system">

<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>$caption - Project Gutenberg</title>
  </head>
  <body>
    <h1>$caption</h1>
EOT;

$where_filetypes = join ("','", $filetypes);
if (strlen ($where_filetypes)) {
  $where_filetypes = " and fk_filetypes in ('$where_filetypes') ";
}
$where_languages = join ("','", $langs);
if (strlen ($where_languages)) {
  $where_languages = " and fk_langs in ('$where_languages') ";
}

$db->exec ($sql = "select pk, files.fk_books, fk_langs, filename 
from files left join mn_books_langs 
on mn_books_langs.fk_books = files.fk_books
where (fk_compressions = 'zip' or fk_filetypes in 
   ('epub.images', 'epub.noimages', 'kindle.images', 'kindle.noimages', 'mp3')) 
$where_filetypes
$where_languages
and diskstatus != 5 and obsoleted = 0
and pk > $offset order by pk limit $limit;");

// p ($sql);

if ($db->FirstRow ()) {
  do {
    $filename = $db->get ("filename", SQLCHAR);
    $offset   = $db->get ("pk", SQLINT);
    $fk_books = $db->get ("fk_books", SQLINT);

    /*
     $dir = etext2dir ($fk_books);
    if (preg_match ("!^$dir!", $filename)) {
      $symlink = preg_replace ("!^$dir!", "$config->files/$fk_books/", $filename);
    } elseif (strncmp ($filename, "cache/", 6) == 0) {
      $symlink = "/$filename";
    } else {
      $symlink = "$config->downloadbase/$filename";
      } */

    if (strpos ($filename, '/epub/') !== false) {
      // gbn: For change to aleph.gutenberg.org:
      // $filename = str_replace ('/epub/', '/generated/', $filename);
      $symlink = $epub_mirror . $filename;
    } else {
      $symlink = $mirror . $filename;
    }

    p ("<a href=\"$symlink\">$symlink</a>");
  } while ($db->NextRow ());

  $url = "harvest?offset=$offset";
  foreach ($filetypes as $filetype) {
    $url .= "&amp;filetypes[]=$filetype";
  }
  foreach ($langs as $l) {
    $url .= "&amp;langs[]=$l";
  }

  p ("<a href=\"$url\">Next Page</a>");
} else {
  p ("No more files.");
}

echo ("  </body>\n</html>\n");

?>
