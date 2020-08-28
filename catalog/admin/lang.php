<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Language";

pageheader ($caption);

include_once ("sqlform.phh");

class ListBooksTable extends MoreTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>", 
		      "Etext&nbsp;Nr.", "right", "1*");
    $this->AddSimpleColumn ("author", "Author");
    $this->AddSimpleColumn ("title", "Title");
    $this->limit = 25;
    $this->relay = array ("fk_langs", "mode", "filter");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getstr ("fk_langs");
getstr ("filter");

if (ismode ("delete")) {
  $db->Exec ("select count (*) as cnt from mn_books_langs " . 
	     "where fk_langs = '$fk_langs'");
  $cnt = $db->get ("cnt");
  if ($cnt > 0) {
    $f->SubCaption ("Warning: There are $cnt books related to this language. ");
  }
  $f->SubCaption ("You are about to delete this language.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("fk_langs", "pk",  "Id",          SQLCHAR,   10,  10, true);
  $f->Text        ("lang", "lang",  "Language",      SQLCHAR,   80, 240, true);
  $f->LoadData    ("select * from langs where pk = '$fk_langs'");
}
$f->Hidden ("fk_langs");
$f->Hidden ("filter");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into langs " . $sql)) {
      msg ("Language added !");
    } else {
      error_msg ("Could not add language!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update langs set " . $sql . "where pk = '$fk_langs'")) {
      msg ("Language modified !");
    } else {
      error_msg ("Could not modify language !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from mn_books_langs where fk_langs = '$fk_langs'");
  if ($db->Exec ("delete from langs where pk = '$fk_langs'")) {
    msg ("Language deleted !");
  } else {
    error_msg ("Could not delete language !");
  }
}

if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    echo ("    <p><a href=\"lang?mode=edit&filter=$filter&fk_langs=$fk_langs\">" .
	  "Back to Lang</a></p>\n\n");
  } 
} else {
  $f->Output ($caption, $caption);

  if (ismode ("edit")) {
    $table = new ListBooksTable ();
    $db->exec ("select books.pk as pk, title, author " . 
	       "from books, mn_books_langs, titles, mn_books_authors, authors " .
	       "where books.pk = mn_books_langs.fk_books " . 
	       "and books.pk = mn_books_authors.fk_books " . 
	       "and authors.pk = mn_books_authors.fk_authors " . 
	       "and books.pk = titles.fk_books " .
	       "and mn_books_langs.fk_langs = '$fk_langs' order by author, title " . 
	       $table->MkOffset ());
    $table->PrintTable ($db, "Books for Language");	
  }
}

echo ("    <p><a href=\"langs_list?filter=$filter\">" . 
      "Back to Language List</a></p>\n\n");

pagefooter ();

?>
