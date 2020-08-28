<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Category";

pageheader ($caption);

include_once ("sqlform.phh");

class ListBooksTable extends MoreTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>", 
		      "Etext Nr.", "right", "1*");
    $this->AddSimpleColumn ("author", "Author");
    $this->AddSimpleColumn ("title", "Title");
    $this->limit = 25;
    $this->relay = array ("fk_categories", "mode", "filter");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_categories");
getstr ("filter");

if (ismode ("delete")) {
  $db->Exec ("select count (*) as cnt from mn_books_categories " . 
	     "where fk_categories = $fk_categories");
  $cnt = $db->get ("cnt");
  if ($cnt > 0) {
    $f->SubCaption ("Warning: There are $cnt books related to this category. ");
  }
  $f->SubCaption ("You are about to delete this category.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("category", "category",  "Category",      SQLCHAR,   80, 240, true);
  $f->LoadData    ("select * from categories where pk = $fk_categories");
}
$f->Hidden ("fk_categories");
$f->Hidden ("filter");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into categories " . $sql)) {
      msg ("Category added !");
    } else {
      error_msg ("Could not add category!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update categories set " . $sql . "where pk = $fk_categories")) {
      msg ("Category modified !");
    } else {
      error_msg ("Could not modify category !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from mn_books_categories where fk_categories = $fk_categories");
  if ($db->Exec ("delete from categories where pk = $fk_categories")) {
    msg ("Category deleted !");
  } else {
    error_msg ("Could not delete category !");
  }
}

if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    echo ("    <p><a href=\"category?mode=edit&filter=$filter&fk_categories=$fk_categories\">" .
	  "Back to Category</a></p>\n\n");
  } 
} else {
  $f->Output ($caption, $caption);
}

echo ("    <p><a href=\"categories_list?filter=$filter\">" . 
      "Back to Category List</a></p>\n\n");

pagefooter ();

?>
