<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

include_once ("pgcat.phh");

$db  = $config->db ();
$db2 = $config->db ();

$db->exec ("select * from attributes where fk_attriblist = 505 and text ~ '^Contents:' order by text");

if ($db->FirstRow ()) {
  do {
    $title = $db->get ("text", SQLCHAR);
    $orig  = $title;
    $pk    = $db->get ("pk", SQLINT);
    $nonfiling = "";

    $title = preg_replace ("/^Contents: /", "", $title);

    if ($title != $orig) {
      $sql_title = $db-> f ($title, SQLCHAR);
            echo ("update attributes set text = $sql_title where pk = $pk\n");
      $db2->exec ("update attributes set text = $sql_title where pk = $pk");
    }

  } while ($db->NextRow ());
}

?>
