<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("author_from");
getstr ("author_to");
$caption = "Transfer All Books From $author_from To $author_to";

pageheader ($caption);

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_authors_from");
getint ("fk_authors_to");

if (!$fk_authors_from) error_msg ("No From Author");
if (!$fk_authors_to) error_msg ("No To Author");
// don't test for author equality, transferring to the same author
// can be useful to batch-change the role.
// if ($fk_authors_to == $fk_authors_from) error_msg ("But that is the same author!");

if (!isupdate ()) {
  $db->Exec ("select count (*) as cnt from mn_books_authors where fk_authors = $fk_authors_from");
  $cnt = $db->get ("cnt");
  $f->SQLSelect ("fk_roles", "fk_roles", "Author Role", SQLCHAR, 40, 40, true,
		 "select 'same' as value, 'Same Role' as caption union " . 
		 "select pk as value, role as caption from roles order by caption");
  $f->SetFieldData ("fk_roles", "same");
  $f->SubCaption ("You are about to transfer $cnt books from $author_from to $author_to.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
}

$f->Hidden ("fk_authors_from");
$f->Hidden ("fk_authors_to");
$f->Hidden ("author_from");
$f->Hidden ("author_to");

if (isupdate ()) {
  getstr ("fk_roles");
  if ($fk_roles == "same") {
    $sql = "update mn_books_authors set fk_authors = $fk_authors_to " . 
           "where fk_authors = $fk_authors_from";
  } else {
    $sql_fk_roles = $db->f ($fk_roles, SQLCHAR);
    $sql = "update mn_books_authors set fk_authors = $fk_authors_to, fk_roles = $sql_fk_roles " . 
           "where fk_authors = $fk_authors_from";
  }
  if ($db->exec ($sql)) {
    msg ("Books transferred !");
  } else {
    error_msg ("Could not transfer books !");
  }
  p ("<a href=\"author?mode=delete&fk_authors=$fk_authors_from\">Delete From Author ($author_from)</a>");
  p ("<a href=\"author?mode=edit&fk_authors=$fk_authors_to\">Back to To Author ($author_to)</a>");
} else {
  $f->Output ($caption, $caption);
}

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>

