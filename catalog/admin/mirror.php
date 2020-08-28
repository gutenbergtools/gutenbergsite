<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ("mirror");

getstr ("mode");
$caption = ucfirst ($mode) . " Mirror";

pageheader ($caption);

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getstr ("fk_mirrors");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this mirror.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("continent", "continent", "Continent", SQLCHAR,   80,  80, false);
  $f->Text        ("nation",    "nation",    "Nation",    SQLCHAR,   80,  80, false);
  $f->Text        ("location",  "location",  "Location",  SQLCHAR,   80,  80, false);
  $f->Text        ("provider",  "provider",  "Provider",  SQLCHAR,   80, 240, true);
  $f->Text        ("url",       "url",       "URL",       SQLCHAR,   80, 240, true);
  $f->TextArea    ("note",      "note",      "Note",      SQLCHAR,    4,  80, false);

  $f->LoadData    ("select * from mirrors where pk = '$fk_mirrors'");
}
$f->Hidden ("fk_mirrors");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into mirrors " . $sql)) {
      msg ("Mirror added !");
    } else {
      error_msg ("Could not add mirror!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update mirrors set " . $sql . "where pk = '$fk_mirrors'")) {
      msg ("Mirror modified !");
    } else {
      error_msg ("Could not modify mirror !");
    }
  }
}
if (isupdatemode ("delete")) {
  if ($db->Exec ("delete from mirrors where pk = '$fk_mirrors'")) {
    msg ("Mirror deleted !");
  } else {
    error_msg ("Could not delete mirror !");
  }
}

if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    p ("<a href=\"mirror?mode=edit&fk_mirrors=$fk_mirrors\">" .
       "Back to Mirror</a>");
  } 
} else {
  $f->Output ($caption, $caption);
}

p ("<a href=\"mirrors_list\">Back to Mirror List</a>");

pagefooter ();

?>
