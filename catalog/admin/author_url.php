<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Author URL";

pageheader ($caption);

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_author_urls");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this URL.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  if (ismode ("add")) {
    $f->SQLInject ("fk_authors", "fk_authors", SQLINT);
  }
  $f->Text     ("description", "description", "Description", SQLCHAR, 80, 240, true);
  $f->Text     ("url",         "url",         "URL",         SQLCHAR, 80, 240, true);
  $f->LoadData ("select * from author_urls where pk = $fk_author_urls");
}
$f->Hidden ("fk_author_urls");
$f->Hidden ("fk_authors");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into author_urls " . $sql)) {
      msg ("Author URL added !");
    } else {
      error_msg ("Could not add author URL!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update author_urls set " . $sql . "where pk = $fk_author_urls")) {
      msg ("Author URL modified !");
    } else {
      error_msg ("Could not modify author URL !");
    }
  }
}
if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from author_urls where pk = $fk_author_urls")) {
    msg ("Author URL deleted !");
  } else {
    error_msg ("Could not delete author URL !");
  }
}

if (isupdate ()) {
  getint ("fk_authors");
  echo ("<p><a href=\"author?mode=edit&fk_authors=$fk_authors\">Back to Author</a></p>\n\n");
} else {
  $f->Output ($caption, $caption);
}

pagefooter ();

?>
