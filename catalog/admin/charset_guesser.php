<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
getstr ("file");
getint ("samples", 10);

pageheader ("Encoding Guesses for $file");

$root = "/public/ftp/pub/docs/books/gutenberg/";

$path = realpath ("$root$file");

if (!preg_match ("|^$root|", $path) || (!$hd = fopen ($path, "r"))) {
  // serve only files below root
  header("HTTP/1.0 404 Not Found");
  echo ("I see no such file here\n");
  exit;
}

// get some words with funny characters

$data = file_get_contents ($path);
preg_match_all ("/\b.{0,20}[\x80-\xFF].{0,20}\b/s", $data, $matches);
$found_samples = count ($matches[0]);

if ($found_samples == 0) {
  echo ("<p>No non-ascii characters found.</p>");
  pagefooter ();
  exit ();
}

$more_samples = $samples > 0 && $found_samples > $samples;

$words = join ("\n", $samples ? array_slice ($matches[0], 0, $samples) : $matches[0]);

// convert those words to all known encodings

$encodings = array ();
$db->exec ("select pk from encodings order by pk");
if ($db->FirstRow ()) {
  do {
    $encodings[] = $db->Get ("pk");
  } while ($db->NextRow ());
}

$me = $_SERVER['PATH_INFO'] . htmlspecialchars ("?file=$file");
if ($more_samples) {
  $caption = "Samples (first $samples of $found_samples found) <a href='$me&amp;samples=0'>show all</a>";
} else {
  $caption = "Samples (all $found_samples found)";
  if ($found_samples > 10)
    $caption .= " <a href='$me&amp;samples=10'>show only first 10</a>";
}

echo ("<table><tr><th>Encoding</th><th>$caption</th></tr>\n");

function hex ($c) {
  return sprintf ('\x%2X', ord ($c));
}

$sample = htmlspecialchars (@preg_replace ("/[\x80-\xFF]/e", 'hex ($0)', $words));
$sample = preg_replace ("/\n/", "<br/>", $sample);
echo ("<tr><th>hex-escaped</th><td>$sample</td></tr>\n");

mb_regex_encoding ("UTF-8");
mb_ereg_search_init ("[\x80-\x9F]");

foreach ($encodings as $enc) {
  $wordslen = strlen ($words);
  $sample = @iconv ($enc, "UTF-8", $words);
  if ($sample) {
    if (!mb_ereg ("[\200-\237]", $sample)) {
      if (iconv_strlen ($sample, 'UTF-8') == $wordslen) {
	$sample = preg_replace ("/\n/", "<br/>", htmlspecialchars ($sample));
	echo ("<tr><th>$enc</th><td>$sample</td></tr>\n");
      }
    }
  }
}

echo ("</table>");

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>
