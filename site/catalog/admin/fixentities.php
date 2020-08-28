<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

include_once ("pgcat.phh");

$db  = $config->db ();
$db2 = $config->db ();

$trans = get_html_translation_table (HTML_ENTITIES);
$trans = array_flip ($trans);
array_walk ($trans, create_function ('&$v,$k', '$v = utf8_encode ($v);'));
$trans['&mdash;'] = chr (0xe2) . chr (0x80) . chr (0x94);
$trans['&ndash;'] = chr (0xe2) . chr (0x80) . chr (0x93);


$cnt = 0;

$db->exec ("select * from titles order by title");

if ($db->FirstRow ()) {
  do {
    $title = $db->get ("title", SQLCHAR);
    $orig  = $title;
    $pk    = $db->get ("pk", SQLINT);

    $title = strtr ($title, $trans);

    if ($title != $orig) {
      $sql_title = $db-> f ($title, SQLCHAR);
      echo ("update titles set title = $sql_title where pk = $pk\n");
      $db2->exec ("update titles set title = $sql_title where pk = $pk");
      $cnt++;
    }

  } while ($db->NextRow ());
}

echo ("$cnt title changes\n");



$cnt = 0;

$db->exec ("select * from authors order by author");

if ($db->FirstRow ()) {
  do {
    $author = $db->get ("author", SQLCHAR);
    $orig  = $author;
    $pk    = $db->get ("pk", SQLINT);

    $author = strtr ($author, $trans);

    if ($author != $orig) {
      $sql_author = $db-> f ($author, SQLCHAR);
      echo ("update authors set author = $sql_author where pk = $pk\n");
      $db2->exec ("update authors set author = $sql_author where pk = $pk");
      $cnt++;
    }

  } while ($db->NextRow ());
}

echo ("$cnt author changes\n");



$cnt = 0;

$db->exec ("select * from aliases order by alias");

if ($db->FirstRow ()) {
  do {
    $alias = $db->get ("alias", SQLCHAR);
    $orig  = $alias;
    $pk    = $db->get ("pk", SQLINT);

    $alias = strtr ($alias, $trans);

    if ($alias != $orig) {
      $sql_alias = $db-> f ($alias, SQLCHAR);
      echo ("update aliases set alias = $sql_alias where pk = $pk\n");
      $db2->exec ("update aliases set alias = $sql_alias where pk = $pk");
      $cnt++;
    }

  } while ($db->NextRow ());
}

echo ("$cnt alias changes\n");

?>
