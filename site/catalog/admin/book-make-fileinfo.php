<?php

include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

$fk_books = intval ($argv[1]);
if (!$fk_books) {
  exit ();
}

function output ($db, $caption) {
  if ($db->FirstRow ()) {
    do {
      $v = $db->get ("value", SQLCHAR);
      echo ("$caption: $v\n");
    } while ($db->NextRow ());
  }
}

$db = $config->db ();

$db->exec ("select * from books where pk = $fk_books");
if (!$db->FirstRow ()) {
  exit ();
}

$release_date = $db->get ("release_date", SQLDATE);
$copyrighted  = $db->get ("copyrighted", SQLINT);
echo ("Etext-Nr: $fk_books\n");
echo ("Release-Date: " . date ("M d, Y\n", $release_date));
echo ("Copyrighted: $copyrighted\n");

$db->exec ("select author, role from v_books_authors " . 
	   "where fk_books = $fk_books");
if ($db->FirstRow ()) {
  do {
    $author = $db->get ("author", SQLCHAR);
    $role   = $db->get ("role", SQLCHAR);
    echo ("$role: $author\n");
  } while ($db->NextRow ());
}

$db->exec ("select title as value from titles where title_order = 1 and fk_books = $fk_books");
output ($db, "Title");

$db->exec ("select title as value from titles where title_order = 2 and fk_books = $fk_books");
output ($db, "Alternate Title");

$db->exec ("select title as value from titles where title_order = 3 and fk_books = $fk_books");
output ($db, "Contents");

$db->exec ("select note as value from notes where fk_books = $fk_books");
output ($db, "Note");

$db->exec ("select lang as value from langs, mn_books_langs " . 
	   "where langs.pk = fk_langs and fk_books = $fk_books");
output ($db, "Language");

$db->exec ("select pk as value from loccs, mn_books_loccs " . 
	   "where loccs.pk = fk_loccs and fk_books = $fk_books");
output ($db, "Locc");

$db->exec ("select subject as value from subjects, mn_books_subjects " . 
	   "where subjects.pk = fk_subjects and fk_books = $fk_books");
output ($db, "Subject");

$db->exec ("select category as value from categories, mn_books_categories " . 
	   "where categories.pk = fk_categories and fk_books = $fk_books");
output ($db, "Category");

echo ("----------\n");

?>