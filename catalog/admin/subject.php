<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Subject";

pageheader ($caption);

include_once ("sqlform.phh");

class ListBooksTable extends MoreTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>", 
		      "Etext Nr.", "right", "1*");
    $this->AddSimpleColumn ("author", "Author");
    $this->AddSimpleColumn ("title", "Title");
    $this->limit = 25;
    $this->relay = array ("fk_subjects", "mode", "filter");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_subjects");
getstr ("filter");

$subject_name = "";
if ($db->Exec("select subject from subjects where pk = $fk_subjects")) {
#it will make life nicer if the message includes *what* subject was linked.
  $subject_name =  $db->Get("subject");
 }
if (!$subject_name) { 
  /* if getting the actual name fails for some reason, use the internal number instead; 
   at least it is something...*/
  $subject_name = "Internal #: $fk_subjects";
 }

if (ismode ("delete")) {
  $db->Exec ("select count (*) as cnt from mn_books_subjects " . 
	     "where fk_subjects = $fk_subjects");
  $cnt = $db->get ("cnt");
  if ($cnt > 0) {
    $f->SubCaption ("Warning: There are $cnt books related to \"$subject_name\". ");
  }
  $f->SubCaption ("You are about to delete \"$subject_name\".");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("subject", "subject",  "Subject",      SQLCHAR,   80, 240, true);
  $f->LoadData    ("select * from subjects where pk = $fk_subjects");

}
$f->Hidden ("fk_subjects");
$f->Hidden ("filter");

if (isupdatemode ("add")) {
  $subject_name=htmlspecialchars(urldecode($_POST["subject"]));
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into subjects " . $sql)) {
      msg ("Subject  '$subject_name' added !");
    } else {
      error_msg ("Could not add subject '$subject_name'!");
    }
    $db->Exec ("select last_value from subjects_pk_seq");
    $fk_subjects=$db->Get("last_value");
  }
}
if (isupdatemode ("edit")) {
  $subject_name=htmlspecialchars(urldecode($_POST["subject"]));
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update subjects set " . $sql . "where pk = $fk_subjects")) {
      msg ("Subject '$subject_name' modified !");
    } else {
      error_msg ("Could not modify subject '$subject_name'!");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from mn_books_subjects where fk_subjects = $fk_subjects");
  if ($db->Exec ("delete from subjects where pk = $fk_subjects")) {
    msg ("Subject '$subject_name' deleted !");
  } else {
    error_msg ("Could not delete subject '$subject_name'!");
  }
}

if ($fk_subjects) {
    echo("Internal Subject #: <b> $fk_subjects </b><br>");
    //Only display the Internal # when it exists. ;-)
}
if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    echo ("    <p><a href=\"subject?mode=edit&filter=$filter" .
	  "&fk_subjects=$fk_subjects\">" .
	  "Back to Subject \"$subject_name\"</a></p>\n\n");
  } 
} else {
  $f->Output ($caption, $caption);

  if (ismode ("edit")) {
    echo ("<br>" .
	  "<a href=\"subject?filter=$filter&mode=delete" .
	  "&fk_subjects=$fk_subjects\">" .
	  "Delete Subject</a>\n");

    $table = new ListBooksTable ();
    $db->Exec ("select fk_books as pk, text as title, author " . 
	       "from (mn_books_subjects join attributes using (fk_books)) " . 
	       "left join mn_books_authors using (fk_books) " .
	       "left join authors on authors.pk = fk_authors " .
	       "where fk_subjects=$fk_subjects and fk_attriblist in (240, 245, 246) " .
	       "order by author, title " .
	       $table->MkOffset ());
    if ($db->Get("pk")) {
      $table->PrintTable ($db, "Books for Subject");
    } else {
      echo ("<p><b>There are no books with this Subject!</b></p>\n");
    }
  }
}

echo ("    <p><a href=\"subjects_list?filter=$filter\">" . 
      "Back to Subject List</a></p>\n");
echo ("    <p><a href=\"subject?filter=$filter&mode=add\">" .
      "Add a new Subject</a></p>\n\n");

pagefooter ();

?>
