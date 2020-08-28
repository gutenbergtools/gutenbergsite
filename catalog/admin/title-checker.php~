<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

include ("pgcat.phh");

$db  = $config->db ();
$db2 = $config->db ();

$pks   = array ();
$gutindex = array ();

$db->exec ("select * from titles where title_order = 1 order by fk_books");

if ($db->FirstRow ()) {
  do {
    $pk       = $db->get ("pk",       SQLINT);
    $fk_books = $db->get ("fk_books", SQLINT);
    $title    = $db->get ("title",    SQLCHAR);

    $db2->exec ("select gutindex from books where pk = $fk_books");
    $gutindex = $db2->get ("gutindex", SQLCHAR);

    if (empty ($gutindex)) {
      continue;
    }

    $gutindex = preg_replace ("/^\w+\s+\d+\s+/", "", $gutindex);
    $title    = preg_replace ("/\s*&mdash;.*/", "", $title); 
    $title    = preg_replace ("/\s*--.*/", "", $title); 

    $s = array ('The ', 'A ', 'An ');
    $r = array ('', '', '');

    $gutindex = str_replace ($s, $r, $gutindex); 
    $title    = str_replace ($s, $r, $title); 


    if (!strncasecmp ($title, $gutindex, strlen ($title))) continue;

    $t = strtr ($title, ",.:;-_'", "       ");
    $awords = preg_split ("/\s+/", $t);

    $i = 0;
    $words = 0;
    $matched = 0;

    foreach ($awords as $word) {
      if (strlen ($word) >= 5) {
	if (!strncasecmp ($word, "Vol", 3)) continue;
	if ($word == "Part") continue;
	$words++;
	if (strpos ($gutindex, $word) !== false) {
	  $matched++;
	}
      }
      $i++;
    }
    if ($matched < 1) {
      echo ("$fk_books\n\n$title\n\n$gutindex\n\n----------\n\n");
    }
  } while ($db->NextRow ());
}


?>