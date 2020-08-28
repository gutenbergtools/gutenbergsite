<?php

include_once ("mn_relation.phh");

getint ("fk_books");
getstr ("fk_langs");

if (isupdatemode ("add")) {
  if ($db->Exec ("insert into mn_books_langs (fk_books, fk_langs) " . 
		 "values ($fk_books, '$fk_langs')")) {
    $msg = "msg=Book language linked !";
  } else {
    $msg = "errormsg=Could not link book language !";
  }
}

if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from mn_books_langs " . 
		 "where fk_books = $fk_books and fk_langs = '$fk_langs'")) {
    $msg = "msg=Book language unlinked !";
  } else {
    $msg = "errormsg=Could not unlink book language !";
  }
}

if (isupdate ()) {
  header ("Location: book?mode=edit&fk_books=$fk_books&$msg");
  return;
}

pageheader ($caption = MNCaption ("Language", "Book"));

class ListLangsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $this->AddColumn ("<a href=\"mn_books_langs?mode=add&step=update&" . 
		      "fk_books=$fk_books&fk_langs=#pk#\">Link</a>", "", null, "1%");
    $this->AddSimpleColumn ("lang", "Language");
  }
}

if (isfirstmode ("add")) {
  $f->OutputFormHeader ();
  echo ("  <p>Please enter the first few characters of " . 
	"the language name (at least one). Use * as wildcard.</p>\n" .
	"  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
  form_submit ("Search");
  
  form_relay ("mode");
  form_relay ("fk_books");
  form_relay ("fk_langs");
  form_close ();

  if ($filter != "") {
    $filter = preg_replace ('/\*/', '%', $filter);
    $db->exec ("select * from langs where lang like '$filter%' order by lang;");
    $table = new ListLangsTable ();
    $table->PrintTable ($db, $caption);
  }
}

if (isfirstmode ("delete")) {
  $f->Hidden ("fk_books");
  $f->Hidden ("fk_langs");
  $f->SubCaption ("You are about to unlink this book language.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
  $f->Output ($caption, $caption);
} 

pagefooter ();

?>
