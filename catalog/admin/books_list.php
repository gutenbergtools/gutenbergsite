<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("author");
getstr ("title");
getint ("nr");

pageheader ($caption = "Books");

class ListBooksTable extends ListTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#fk_books#\">Edit</a>",
		      "<a href=\"book?mode=add\">Add</a>", "left", "1%");
    $this->AddColumn ("<a href=\"book?mode=delete&fk_books=#fk_books#\">Delete</a>",
		      "", "left", "1%");
    $this->AddSimpleColumn ("fk_books", "Nr.", "right", "1%");
    $this->AddSimpleColumn ("author", "Author");
    $this->AddSimpleColumn ("title",  "Title");
  }
}

$db = $config->db ();
$f = $db->GetFormatter ();

if (isset ($author)) {
  $author = $f->f ("$author%", SQLCHAR);
  $author = "and author ilike $author ";
}
if (isset ($title)) { 
  $title = $f->f ("%$title%", SQLCHAR);
  $title = "and title ilike $title ";
}
if (isset ($nr)) {
  $nr = $f->f ($nr, SQLINT);
  $nr = "and fk_books = $nr ";
}

$where = substr ($author . $title . $nr, 4);

if (strlen ($where)) {
  $where = "where $where";

  $db->exec ("select * from v_books $where order by author, title");

  $table = new ListBooksTable ();
  $table->PrintTable ($db, $caption);
} else {
  msg ("Please enter at least one search argument.");
}

pagefooter ();
?>
