<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

$root = "/public/ftp/pub/docs/books/gutenberg/";

$file  = realpath ($root . $_REQUEST['file']);
$lines = intval ($_REQUEST['lines']);

if (!preg_match ("|^$root|", $file) || (!$hd = fopen ($file, "r"))) {
  // serve only files below root
  header("HTTP/1.0 404 Not Found");
  echo ("I see no such file here\n");
  exit;
}

header ("Content-Type: text/plain");

while ((!feof ($hd)) && ($lines > 0)) {
	$buffer = fgets ($hd, 4096);
	echo ($buffer);
	--$lines;
}
fclose ($hd);

?>
