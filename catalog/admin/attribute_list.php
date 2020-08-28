<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();


getint("attribute");
$db = $config->db ();
$db->logger = new logger ();

$db->Exec("select name from attriblist where pk = $attribute");
$marcfield = $db->Get("name");
if (!$marcfield) {
  pageheader("Usage of ... field");

  echo("<b>Error: Unrecognized MARC attribute \"$attribute\" given.</b>");
  pagefooter();
  return;
 }
pageheader ("Usage of $marcfield field");
$db->Exec("select fk_books, text from attributes " .
	  "where fk_attriblist = $attribute");
if ($db->Get("fk_books")) {
  echo("<table>\n".
       "<caption>Uses</caption>" .
       "<tr><th>Etext#</th><th>Text of MARC field</th></tr>");
  do {
    $etext=$db->Get("fk_books");
    echo("<tr><td><a href=\"/etext/${etext}e\">${etext}</a></td><td>" . 
	 $db->Get("text") . "</td></tr>\n");  
  } while ($db->NextRow());
  echo ("</table>");
 } else {
  echo("MARC field $attribute is unused.");
 }
pagefooter();
?>
