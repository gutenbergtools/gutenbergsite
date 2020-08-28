<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

pageheader ("Batch Update File Entries");

$db = $config->db ();
$db->logger = new logger ();

getint ("fk_files");
getint ("fk_books");
getstr ("filemask");

getarray ("pks_update");
getarray ("pks");
getarray ("fk_books_a");
getarray ("filenames");
getarray ("editions");
getarray ("obsoleteds");
getarray ("fk_filetypes");
getarray ("fk_compressions");
getarray ("fk_encodings");

foreach ($pks as $pk) {
  $fk_book        = array_shift ($fk_books_a);
  $filename       = array_shift ($filenames);
  $edition        = array_shift ($editions);
  $fk_filetype    = array_shift ($fk_filetypes);
  $fk_compression = array_shift ($fk_compressions);
  $fk_encoding    = array_shift ($fk_encodings);

  // p ("file: $pk $filename $fk_book $fk_filetype $fk_compression $fk_encoding");

  if (!in_array ($pk, $pks_update)) 
    continue;

  $sql_pk              = $db->f ($pk,             SQLINT);
  $sql_fk_books        = $db->f ($fk_book,        SQLINT);
  $sql_edition         = $db->f ($edition,        SQLINT);
  $sql_obsoleted       = $db->f ($obsoleted,      SQLINT);
  $sql_fk_filetypes    = $db->f ($fk_filetype,    SQLCHAR);
  $sql_fk_compressions = $db->f ($fk_compression, SQLCHAR);
  $sql_fk_encodings    = $db->f ($fk_encoding,    SQLCHAR);
  $sql_obsoleted       = in_array ($pk, $obsoleteds) ? 1 : 0;

  $sql = "update files set " . 
    "fk_books = $sql_fk_books, " . 
    "edition = $sql_edition, " . 
    "obsoleted = $sql_obsoleted, " . 
    "fk_filetypes = $sql_fk_filetypes, " . 
    "fk_compressions = $sql_fk_compressions, " . 
    "fk_encodings = $sql_fk_encodings " . 
    "where pk = $sql_pk";

  // p ($sql);

  if ($db->exec ($sql)) {
    msg ("File $filename updated !");
  } else {
    error_msg ("Could not update file $filename !");
  }
}

p ("<a href=\"files?fk_books=$fk_books&amp;filemask=$filemask\">Back to Book Files</a>");

pagefooter ();

?>
