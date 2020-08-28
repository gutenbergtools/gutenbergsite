<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

include_once ("pgcat.phh");

$db  = $config->db ();
$db2 = $config->db ();

$articles     = array ("The", "A", "An", "La", "Le", "Der", "Die", "Das");
$prepositions = array ("The", "A", "An", "In", "From", "To", "On", "Of", "Out", "For", 
		       "Into", "At", "About", "And", "Or", "But", "With", "Under", "Over", "As");

foreach ($prepositions as $s) {
  $search[]  = " $s ";
  $replace[] = strtolower (" $s ");
}

$search[]  = "--";
$replace[] = "&mdash;";
$search[]  = "Vol.";
$replace[] = "Volume";
$search[]  = "vol.";
$replace[] = "Volume";


$db->exec ("select * from titles order by title");

if ($db->FirstRow ()) {
  do {
    $title = $db->get ("title", SQLCHAR);
    $orig  = $title;
    $pk    = $db->get ("pk", SQLINT);
    $nonfiling = "";

    if (preg_match ("/Reserved:/i", $title))
      continue;

    foreach ($articles as $article) {
      if (preg_match ("/, $article\$/", $title)) {
	$title = preg_replace ("/, $article\$/", "", $title);
	$title = "$article $title";
	$nonfiling = ", nonfiling = " . strlen ("$article ");
	break;
      }
    }      

    $title = str_replace ($search, $replace, $title);

    if ($title != $orig) {
      $sql_title = $db-> f ($title, SQLCHAR);
            echo ("update titles set title = $sql_title$nonfiling where pk = $pk\n");
      $db2->exec ("update titles set title = $sql_title$nonfiling where pk = $pk");
    }

  } while ($db->NextRow ());
}

?>
