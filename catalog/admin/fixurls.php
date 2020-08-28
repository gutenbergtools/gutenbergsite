<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

$db  = $config->db ();
$db2 = $config->db ();

$cnt = 0;

$db->exec ("select * from author_urls order by url");

if ($db->FirstRow ()) {
  do {
    $url  = $db->get ("url", SQLCHAR);
    $orig = $url;
    $pk   = $db->get ("pk", SQLINT);

    $url = rawurldecode ($url);
    if ($url == $orig) {
      continue;
    }

    //    echo ("$orig\n");

    if (utf8_encode (utf8_decode ($url)) != $url) {
      // not an utf-8 string
      if (($url = iconv ("ISO-8859-1", "UTF-8", $url)) === FALSE) {
        // nor an iso-8859-1 one ???
        // punt on this one
        continue;
      }
    }

    // echo ("$url\n");

    if ($url != $orig) {
      $sql_url = $db-> f ($url, SQLCHAR);
      echo ("update author_urls set url = $sql_url where pk = $pk\n");
      $db2->exec ("update author_urls set url = $sql_url where pk = $pk;");
      $cnt++;
    }

  } while ($db->NextRow ());
}

echo ("$cnt url changes\n");
?>
