<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pg.phh");
include_once ("db.phh");

$db  = $config->db ();
$db2 = $config->db ();

function cmp ($a, $b) {
  // sort on score descending
  if ($a->score == $b->score) {
    return 0;
  }
  return ($a->score > $b->score) ? -1 : 1;
}

function book ($fk_books) {
  global $config, $db2;

  // find best indexing candidate

  $db2->exec ("select pk, filename, fk_filetypes, fk_encodings from files " . 
	     "where fk_books = $fk_books and fk_compressions = 'none' and obsoleted = 0 and " .
	     "fk_filetypes in  ('txt', 'html', 'tex')");

  if ($db2->FirstRow ()) {
    do {
      $o->filename     = $db2->get ("filename",     SQLCHAR);
      $o->fk_filetypes = $db2->get ("fk_filetypes", SQLCHAR);
      $o->fk_encodings = $db2->get ("fk_encodings", SQLCHAR);
      $o->fk_files     = $db2->get ("pk",           SQLINT);
      $o->score = 0;
      $o->type  = "TXT*";
      $files[]  = $o;
    } while ($db2->NextRow ());
  }

  for ($i = 0; $i < count ($files); $i++) {
    $o =& $files[$i];
    if ($o->fk_filetypes == 'html') {
      $o->score = 16;
      $o->type  = "HTML*";
    }
    if ($o->fk_filetypes == 'tex') {
      $o->score = 0;
    }
    if ($o->fk_filetypes == 'txt') {
      // swish-e supports iso-8859-* only, exclude everything else from indexing
      if (!isset ($o->fk_encodings) || $o->fk_encodings == "us-ascii") {
	$o->score = 1;
      }
      if (!strncmp ($o->fk_encodings, "iso-", 4)) {
	$o->score = 2;
      }
      if (!strncmp ($o->fk_encodings, "windows-", 8)) {
	$o->score = 3;
      }
    }
  }
  if (count ($files) == 0)
    return;

  usort ($files, "cmp");
  $maxscore = $files[0]->score;

  // careful! there may be more than one file per book to scan

  for ($i = 0; $i < count ($files); $i++) {
    $o =& $files[$i];
    if ($o->score != $maxscore) {
      continue;
    }
    if (is_link ("$config->filesroot/$o->filename")) {
      continue;
    }
    if (!is_readable ("$config->filesroot/$o->filename")) {
      continue;
    }
    $s = @stat ("$config->filesroot/$o->filename");
    if (!$s) {
      continue;
    }

    // ok, send it out
    echo ("Path-Name: $fk_books/$o->fk_files/$o->fk_filetypes/$o->fk_encodings\n" .
	  "Content-Length: {$s['size']}\n" .
	  "Document-Type: $o->type\n\n");

    readfile ("$config->filesroot/$o->filename");
  }
}

$db->exec ("select pk from books order by pk");

if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("pk", SQLINT);
    book ($fk_books);
  } while ($db->NextRow ());
}

?>
