<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include ("pgcat.phh");

$gutindex    = "$config->documentroot/dirs/GUTINDEX.ALL.iso-8859-1.txt";

$fp = fopen ($gutindex, "r");
if (!$fp) {
  die ("cannot open $gutindex");
}

$db = $config->db ();

$pks   = array ();
$gutindex = array ();

$db->exec ("select * from books");
if ($db->FirstRow ()) {
  do {
    $pk = $db->get ("pk", SQLINT);
    $pks[$pk] = 1;
  } while ($db->NextRow ());
}

$mode = 0;
$pk = 0;
$buffer = "";

while (!feof ($fp)) {
  $line = fgets ($fp);
  $tline = trim ($line);

  switch ($mode) {
  case 0:
    if (preg_match ("/^~ ~ ~ ~/", $tline, $matches)) {
      $mode = 1;
    }
    break;
  case 1:
    if ($tline == "<==End of GUTINDEX.ALL==>") {
      $mode = 0;
      break;
    }
    // fall thru
  case 2:
    if (preg_match ("/(\d+)[-BC]?$/", $tline, $matches)) {
      if (!preg_match ("/GUTINDEX/", $tline)) {
	$gutindex[$pk] = $buffer;
	$buffer = utf8_encode ($line);
	$mode = 2;
	$pk = intval ($matches [1]);
	break;
      }
    }
    if (empty ($tline) || preg_match ("/\*$/", $tline)) {
      $gutindex[$pk] = $buffer;
      $buffer = "";
      $mode = 1;
      $pk = 0;
      break;
    }
    $buffer .= utf8_encode ($line);
    break;
  }
}

fclose ($fp);

foreach ($gutindex as $pk => $book) {
  if (isset ($pks[$pk])) {
    $sql_book = $db->f ($book, SQLCHAR);
    $db->exec ("update books set gutindex = $sql_book where pk = $pk");
    $db->exec ("commit");
    // echo ("Updated #$pk\n");
  }
}

?>
