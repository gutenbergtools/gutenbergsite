<?php

include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

pageheader("Books with duplicate MARC fields");

class DuplAttribTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"dupl_attribs" .
		     "?fk_attriblist=#code#&cnt=#cnt#\">" .
		     "#name#</a>", "MARC Field");
    $this->AddColumn("#cnt#", "# of fields per book");
    $this->AddColumn("#count#", "# of books");
  }
}
p("Click on the MARC Fields to see a list of the actual duplicates.");
$db->Exec("select name, code, cnt, count(cnt) from (select fk_attriblist as code, count(fk_attriblist) as cnt from attributes group by fk_books, fk_attriblist having count(fk_attriblist)>1) as foo join attriblist on code=attriblist.pk group by attriblist.pk, attriblist.name, code, cnt order by code");
$table = new DuplAttribTable();
$table->PrintTable($db, "Duplicate MARC Fields");

pagefooter();
