<?php

include_once ("mn_relation.phh");

getint ("fk_books");
getint ("fk_subjects");

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
if (isupdatemode ("add")) {
  if ($db->Exec ("insert into mn_books_subjects (fk_books, fk_subjects) " . 
		 "values ($fk_books, '$fk_subjects')")) {
    $msg = "msg=Subject '$subject_name' linked!";
  } else {
    $msg = "errormsg=Could not link Subject '$subject_name'!";
  }
}

if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from mn_books_subjects " . 
		 "where fk_books = $fk_books and fk_subjects = '$fk_subjects'")) {
    $msg = "msg=Subject '$subject_name' unlinked !";
  } else {
    $msg = "errormsg=Could not unlink Subject '$subject_name'!";
  }
}

if (isupdate ()) {
  header ("Location: book?mode=edit&fk_books=$fk_books&$msg");
  return;
}

pageheader ($caption = MNCaption ("Subject", "Book"));

class ListSubjectsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $this->AddColumn ("<a href=\"mn_books_subjects?mode=add&step=update&" . 
		      "fk_books=$fk_books&fk_subjects=#pk#\">Link</a>", "<a href=\"subject?mode=add\">Add</a>", null, "1%");
    $this->AddColumn ("<a href=\"subject?mode=edit&fk_subjects=#pk#\">#subject#</a>", "Subject");
  }
}

if (isfirstmode ("add")) {
  $f->OutputFormHeader ();
  echo ("  <p>Please enter the first few characters of " . 
	"the Subject description (at least one). Use * as wildcard.</p>\n" .
	"  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
  form_submit ("Search");
  
  form_relay ("mode");
  form_relay ("fk_books");
  form_relay ("fk_subjects");
  form_close ();

  if ($filter != "") {
    $filter = preg_replace ('/\*/', '%', $filter);
    $db->exec ("select * from subjects where subject like '$filter%' order by subject;");
    $table = new ListSubjectsTable ();
    $table->PrintTable ($db, $caption);
  }
}

if (isfirstmode ("delete")) {
  $db->Exec("select text from attributes where fk_books = $fk_books " .
	    "and fk_attriblist=245");
  $book_name=$db->Get("text");
  $f->Hidden ("fk_books");
  $f->Hidden ("fk_subjects");
  $f->SubCaption ("You are about to unlink the Subject '$subject_name' " .
		  "from the book entitled '$book_name'.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
  $f->Output ($caption, $caption);
} 

pagefooter ();

?>
