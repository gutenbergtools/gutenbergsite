<?php

include_once ("mn_relation.phh");

getint ("fk_books");
getint ("fk_categories");

if (isupdatemode ("add")) {
  if ($db->Exec ("insert into mn_books_categories (fk_books, fk_categories) " . 
		 "values ($fk_books, '$fk_categories')")) {
    $msg = "msg=Book Category linked !";
  } else {
    $msg = "errormsg=Could not link book Category !";
  }
}

if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from mn_books_categories " . 
		 "where fk_books = $fk_books and fk_categories = '$fk_categories'")) {
    $msg = "msg=Book Category unlinked !";
  } else {
    $msg = "errormsg=Could not unlink book Category !";
  }
}

if (isupdate ()) {
  header ("Location: book?mode=edit&fk_books=$fk_books&$msg");
  return;
}

pageheader ($caption = MNCaption ("Category", "Book"));

class ListCategoriesTable extends ListTable {
  function __construct () {
    global $fk_books;
    $this->AddColumn ("<a href=\"mn_books_categories?mode=add&step=update&" . 
		      "fk_books=$fk_books&fk_categories=#pk#\">Link</a>", "", null, "1%");
    $this->AddSimpleColumn ("category", "Category");
  }
}

if (isfirstmode ("add")) {
  $db->exec ("select * from categories order by category;");
  $table = new ListCategoriesTable ();
  $table->PrintTable ($db, $caption);
}

if (isfirstmode ("delete")) {
  $f->Hidden ("fk_books");
  $f->Hidden ("fk_categories");
  $f->SubCaption ("You are about to unlink this book Category.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
  $f->Output ($caption, $caption);
} 

pagefooter ();

?>
