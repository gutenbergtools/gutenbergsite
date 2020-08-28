<?php

// For each (non-removed) file in the 'files' table,
// check that it still exists in the filesystem.
// If not, mark it as removed (diskstatus = 5).

include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();

echo ("Initializing ...\n");

register_shutdown_function ('rollback_transaction');
set_time_limit (0);

$cnt = 0;
$db->Exec ("select filename from files where diskstatus != 5 order by filename");
if ($db->FirstRow ()) {
  do {
    $files[$db->Get ("filename", SQLCHAR)] = 0;
    $cnt++;
  } while ($db->NextRow ());
}

echo ("$cnt files in database.\n");

echo ("Stat-ing files ...\n");

$cnt = 0;
$gonecnt = 0;
foreach ($files as $filename => $value) {
  if ($filename[0] == '/') {
    if (@stat ($filename) === FALSE) {
      $gone[$filename] = 1;
      $gonecnt++;
      echo ("Gone: $filename\n");
    }
  } elseif (preg_match ('/^(cache|masters)\//', $filename)) {
    if (@stat ("$config->documentroot/$filename") === FALSE) {
      $gone[$filename] = 1;
      $gonecnt++;
      echo ("Gone: $config->documentroot//$filename\n");
    }
  } else {
    if (@stat ("$config->filesroot/$filename") === FALSE) {
      $gone[$filename] = 1;
      $gonecnt++;
      echo ("Gone: $config->filesroot//$filename\n");
    }
  }
  $cnt++;
  if (($cnt % 100000) == 0) {
    echo ("Stat: $cnt gone: $gonecnt\n");
  }
  if ($gonecnt > 10000) {
    echo ("Gone over 10.000 files!\nDeleted nothing. Check for errors.");
    die ();
  }
}

$files = null;
echo ("Gone: $gonecnt files\n");

// stat everything again, maybe nfs is flaky today
for ($i = 0; $i < 10; $i++) {
  if (!$gonecnt)
    break;
  echo ("Waiting ...\n");
  sleep (600);
  echo ("Re-stat-ing: $gonecnt files\n");
  clearstatcache ();
  foreach ($gone as $filename => $value) {
    if ($value == 1) {
      if (preg_match ('/^cache\//', $filename)) {
        if (@stat ("$config->documentroot/$filename") !== FALSE) {
          $gone[$filename] = 0;
          $gonecnt--;
        }
      } else {
        if (@stat ("$config->filesroot/$filename") !== FALSE) {
          $gone[$filename] = 0;
          $gonecnt--;
        }
      }
    }
  }
}

if ($gonecnt) {
  echo ("Deleting: $gonecnt files ...\n");

  foreach ($gone as $filename => $value) {
    if ($value == 1) {
      echo ("Marking as deleted: $filename\n");
      $esc_filename = addslashes($filename);
      $db->exec ("update files set diskstatus = 5 where filename = '$esc_filename'");

      $infofile = "$config->privateroot/fileinfo/$filename.info";
      @unlink ($infofile);
    }
  }
}

echo ("Done.\n");

?>
