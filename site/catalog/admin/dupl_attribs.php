<?php

include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

getint("fk_attriblist");
getint("cnt");

$db->Exec("select name from attriblist where pk=$fk_attriblist");
$attr_name = $db->Get("name");

pageheader("Books with $cnt of the '$attr_name' field");


class DuplAttribDetailTable extends ListTable {
  function __construct () {
        $this->AddColumn("<a href=\"book?mode=edit&fk_books=#fk_books#\">" .
			 "#fk_books#</a>", "Etext #");
	$this->AddColumn("#text#", "Text of field");
  }
}
$table= new DuplAttribDetailTable();
$db->Exec ("select fk_books, text from attributes where fk_attriblist=$fk_attriblist and fk_books in (select fk_books from attributes where fk_attriblist=$fk_attriblist group by fk_books, fk_attriblist having count(fk_attriblist)=$cnt) order by fk_books");
$table->PrintTable($db, "");
/* TODO: Convert $cnt to words, i.e. "five" not "5" */

p("<a href=\"dupl_attrib_list\">Return to list</a>");

pagefooter();
