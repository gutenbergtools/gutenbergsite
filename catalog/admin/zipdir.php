<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

pageheader ("Zip File Directory");

getstr ("file");

$root = "/public/ftp/pub/docs/books/gutenberg/";
$file = realpath ("$root$file");

if (!preg_match ("|^$root|", $file) || (!$hd = fopen ($file, "r"))) {
  // serve only files below root
  p ("I see no such file here");
  exit;
}

fclose ($hd);

$file = escapeshellarg ($file);
echo ("<pre>\n" . shell_exec ("./unzip -lv $file") . "\n</pre>\n");

/*
class ZipdirTable extends ListTable {
  function __construct () {
    $this->AddSimpleColumn ("",  "Filename");
    $this->AddSimpleColumn ("",  "Original&nbsp;Size");
    $this->AddSimpleColumn ("",  "Compressed&nbsp;Size");
    $this->AddSimpleColumn ("",  "Compression&nbsp;Method");
    $this->limit = -1;
  }
}

$array = array ();

$zip = zip_open ($file);

if ($zip) {
  while ($zip_entry = zip_read ($zip)) {
    $array[] = zip_entry_name ($zip_entry);
    $array[] = zip_entry_filesize ($zip_entry);
    $array[] = zip_entry_compressedsize ($zip_entry);
    $array[] = zip_entry_compressionmethod ($zip_entry);
  }
  zip_close($zip);
}

$table = new ZipdirTable ();
$table->summary = "Contents of zip file.";
$table->toprows = $array;
$table->PrintTable (null, "Zip Directory");
*/

pagefooter ();

?>
