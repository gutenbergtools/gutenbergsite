<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " LoC Class";

pageheader ($caption);

include_once ("sqlform.phh");

class ListBooksTable extends MoreTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>", 
		      "Etext&nbsp;Nr.", "right", "1*");
    $this->AddSimpleColumn ("title", "Title");
    $this->limit = 25;
    $this->relay = array ("fk_loccs", "mode", "filter");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getstr ("fk_loccs");
getstr ("filter");

if (ismode ("delete")) {
  $db->Exec ("select count (*) as cnt from mn_books_loccs " . 
	     "where fk_loccs = '$fk_loccs'");
  $cnt = $db->get ("cnt");
  if ($cnt > 0) {
    $f->SubCaption ("Warning: There are $cnt books related to this LoC class. ");
  }
  $f->SubCaption ("You are about to delete this LoC class.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("fk_loccs", "pk",  "Id",          SQLCHAR,   10,  10, true);
  $f->Text        ("locc", "locc",  "LoC Class",      SQLCHAR,   80, 240, true);
  $f->LoadData    ("select * from loccs where pk = '$fk_loccs'");
}
$f->Hidden ("fk_loccs");
$f->Hidden ("filter");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into loccs " . $sql)) {
      msg ("LoC class added !");
    } else {
      error_msg ("Could not add LoC class!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update loccs set " . $sql . "where pk = '$fk_loccs'")) {
      msg ("LoC class modified !");
    } else {
      error_msg ("Could not modify LoC class !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from mn_books_loccs where fk_loccs = '$fk_loccs'");
  if ($db->Exec ("delete from loccs where pk = '$fk_loccs'")) {
    msg ("LoC class deleted !");
  } else {
    error_msg ("Could not delete LoC class !");
  }
}

if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    echo ("    <p><a href=\"locc?mode=edit&filter=$filter&fk_loccs=$fk_loccs\">" .
	  "Back to Locc</a></p>\n\n");
  } 
} else {
  $f->Output ($caption, $caption);

  if (ismode ("edit")) {
    $table = new ListBooksTable ();
    $db->exec ("select books.pk as pk, title, author " . 
	       "from books, mn_books_loccs, titles, mn_books_authors, authors " .
	       "where books.pk = mn_books_loccs.fk_books " . 
	       "and books.pk = mn_books_authors.fk_books " . 
	       "and authors.pk = mn_books_authors.fk_authors " . 
	       "and books.pk = titles.fk_books " .
	       "and mn_books_loccs.fk_loccs = '$fk_loccs' order by author, title " . 
	       $table->MkOffset ());
    $table->PrintTable ($db, "Books for LoC Class");	
  }
}

echo ("    <p><a href=\"loccs_list?filter=$filter\">" . 
      "Back to LoC Class List</a></p>\n\n");

pagefooter ();

?>
