<?php

include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

$db  = $config->db ();
$db2 = $config->db ();

function getno ($filename) {
  $etext_number = null;
  if (preg_match ("/^(?:\d\/)+(\d{2,5})/", $filename, $matches)) {
    $etext_number = intval ($matches[1]);
    // double-check this
    $dir = etext2dir ($etext_number);
    if (strncmp ("$filename/", $dir, strlen ($dir)))
      $etext_number = null;
  } elseif (preg_match ("/^([1-9])$/", $filename, $matches)) {
    $etext_number = intval ($matches[1]);
  }
  return $etext_number;
}

$db->exec ("select pk, filename from files where fk_books is null and diskstatus != 2");
if ($db->FirstRow ()) {
  do {
    $pk       = $db->get ("pk", SQLINT);
    $filename = $db->get ("filename", SQLCHAR);
    $no = getno ($filename);
    if (!empty ($no)) {
      echo ("$no $filename\n");
      $db2->exec ("update files set fk_books = $no where pk = $pk");
    }
  } while ($db->Nextrow ());
}


?>
