<?php

// delete fileinfos of removed files

include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

include_once ("sqlform.phh");

$db = $config->db ();

set_time_limit (0);

$cnt = 0;
$db->Exec ("select filename from files where diskstatus = 5 order by filename");
if ($db->FirstRow ()) {
  do {
    $filename = $db->Get ("filename", SQLCHAR);
    $infofile = "$config->privateroot/fileinfo/$filename.info";
    echo ("unlinking $infofile\n");
    if (unlink ($infofile))
       $cnt++;
  } while ($db->NextRow ());
}

echo ("unlinked $cnt files.\n");

echo ("Done.\n");

?>
