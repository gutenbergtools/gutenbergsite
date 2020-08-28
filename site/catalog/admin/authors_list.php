<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("filter");
getstr ("author_from");
getint ("fk_authors_from");

if ($fk_authors_from) {
  pageheader ($caption = "Transfer Books $filter");
  p ("Transferring all books from $author_from to:");
} else {
  pageheader ($caption = "Authors $filter");
}

class ListAuthorsTable extends ListTable {
  function __construct () {
    global $fk_authors_from, $author_from, $filter;

    $this->AddColumn ("<a href=\"author?mode=edit&fk_authors=#pk#\">Edit</a>",
		      "<a href=\"author?mode=add\">Add</a>", "narrow");
    $this->AddColumn ("<a href=\"author?mode=delete&fk_authors=#pk#\">Delete</a>",
		      "", "narrow");
    if ($fk_authors_from) {
      $this->AddColumn ("<a href=\"authors_transfer?author_from=$author_from&amp;author_to=#author#&amp;" . 
			"fk_authors_from=$fk_authors_from&amp;fk_authors_to=#pk#\">Transfer&nbsp;To</a>",
			"", "narrow");
      $this->TitleColumn ("Transfer all books linked to $author_from to this one.");
    } else {
      $this->AddColumn ("<a href=\"authors_list?author_from=#author#&amp;" . 
			"fk_authors_from=#pk#&amp;filter=$filter\">Transfer&nbsp;From</a>",
			"", "narrow");
      $this->TitleColumn ("Transfer all books linked to this author to a different one.");
    }
    $this->AddSimpleColumn ("author", "Name");
    $this->AddSimpleColumn ("cnt_books",    "No. of Books", "narrow right");
    $this->AddSimpleColumn ("born_floor",   "Born",  "narrow right");
    $this->AddSimpleColumn ("died_floor",   "Died",  "narrow right");
  }
}

$db = $config->db ();

echo ("
<p>Please enter the first few characters of the authors name (at least one).
Search is case-insensitive.
Use * as wildcard. (eg. Moli*re)
To see everything just enter *.</p>
");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
form_hidden ("fk_authors_from", $fk_authors_from);
form_hidden ("author_from", $author_from);
form_submit ("Search");
form_close ();

if ($filter != "") {
  $sql_filter = str_replace ('*', '%', $filter);
  $sql_filter = $db->f ("$sql_filter%", SQLCHAR);
  $db->exec ("select *, (select count (*) from mn_books_authors where fk_authors = authors.pk) as cnt_books from authors where " . 
	     "(author ilike $sql_filter or authors.pk in " . 
	     "(select fk_authors from aliases where alias ilike $sql_filter)) " . 
	     "order by author");
  $table = new ListAuthorsTable ();
  $table->PrintTable ($db, $caption, "pgdbfiles");
}

pagefooter ();

?>
