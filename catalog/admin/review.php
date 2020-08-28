<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");
include_once ("sqlform.phh");

authenticate ();

$db->logger = new logger ();
$db = $config->db ();

getstr ("mode");
getint ("fk_reviews");
getint ("fk_books");
$caption = ucfirst ($mode) . " Review";

$f = new SQLForm ();

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this review.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  if (ismode ("add")) {
    $f->SQLInject ("fk_books", "fk_books", SQLINT);
  }
  $f->SQLSelect   ("fk_reviewers",    "fk_reviewers", "Reviewer",        SQLINT,  10,   2, true, 
		"select pk as value, name as caption from reviews.reviewers order by caption");
  $f->ToolTip  ("Name of the reviewer.");

  $f->Text     ("title",           "title",        "Title",           SQLCHAR,  80,  80, true);
  $f->ToolTip  ("Enter a title for the review, eg. Summary, Review, Excerpts, Critique");

  $f->TextArea ("review",          "review",       "Review",          SQLCHAR,  20,  80, true);
  $f->ToolTip  ("Enter a review for the work.");

  $f->LoadData ("select * from reviews.reviews where pk = $fk_reviews");
}
$f->Hidden ("fk_reviews");
$f->Hidden ("fk_books");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into reviews.reviews " . $sql)) {
      $msg = "msg=Review added !";
    } else {
      $msg = "errormsg=Could not add review!";
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update reviews.reviews set " . $sql . "where pk = $fk_reviews")) {
      $msg = "msg=Review modified !";
    } else {
      $msg = "errormsg=Could not modify review !";
    }
  }
}
if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from reviews.reviews where pk = $fk_reviews")) {
    $msg = "msg=Review deleted !";
  } else {
    $msg = "errormsg=Could not delete review !";
  }
}

if (isupdate ()) {
  header ("Location: book?mode=edit&fk_books=$fk_books&$msg");
  return;
}

pageheader ($caption);
$f->Output ($caption, $caption);
pagefooter ();

?>
