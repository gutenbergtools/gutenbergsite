<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

pageheader ("Batch Update Attributes");

$db = $config->db ();
$db->logger = new logger ();

getstr ("titlemask");
getint ("maxcnt");

getarray ("pks_update");
getarray ("pks");

getarray ("titles_a");
getarray ("nonfilings");
getarray ("marcs");

foreach ($pks as $pk) {
  $title     = array_shift ($titles_a);
  $nonfiling = array_shift ($nonfilings);
  $marc      = array_shift ($marcs);

  if (!in_array ($pk, $pks_update)) 
    continue;

  $sql_pk          = $db->f ($pk,          SQLINT);
  $sql_title       = $db->f ($title,       SQLCHAR);
  $sql_nonfiling   = $db->f ($nonfiling,   SQLINT);
  $sql_marc        = $db->f ($marc,        SQLINT);

  $sql = "update attributes set " . 
    "text = $sql_title, " . 
    "nonfiling = $sql_nonfiling, " . 
    "fk_attriblist = $sql_marc " . 
    "where pk = $sql_pk";

  p ($sql);

  if ($db->exec ($sql)) {
    msg ("Attribute '$title' updated !");
  } else {
    error_msg ("Could not update attribute '$title' !");
  }
}

p ("<a href=\"titles?titlemask=$titlemask&amp;maxcnt=$maxcnt\">Back to Batch-Edit Attributes</a>");

pagefooter ();

?>
