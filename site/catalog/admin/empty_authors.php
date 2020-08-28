<?php

include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

class AuthorsBirthDeathDeletionTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"author?mode=delete&fk_authors=#pk#\">" .
		     "Delete</a>", "", "narrow");
    $this->AddColumn("<a href=\"author?mode=edit&fk_authors=#pk#\">" .
		     "#author#</a>", "Author");
    $this->AddSimpleColumn("born_floor", "Birth");
    $this->AddSimpleColumn("died_floor", "Death");
  }
}

pageheader("Authors with no books");

$table = new AuthorsBirthDeathDeletionTable ();
$db->Exec("select distinct pk, author, born_floor, died_floor " .
	  "from authors left join mn_books_authors " .
	  "on fk_authors=authors.pk where fk_books is null " .
	  "order by author, pk");
$table->PrintTable($db, "Authors with no books linked");

pagefooter();
