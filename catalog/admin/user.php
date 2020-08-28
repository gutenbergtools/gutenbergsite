<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ("createuser");

getstr ("mode");
$caption = ucfirst ($mode) . " User";

pageheader ($caption);

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_users");
getstr ("filter");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this user.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->Text        ("user",  "user",  "User",      SQLCHAR,   80, 240, true);
  $f->Text        ("login", "login", "Login",     SQLCHAR,   80, 240, true);
  $f->TextArea    ("note",  "note",  "Note",      SQLCHAR,    4,  80, false);

  $f->LoadData    ("select * from users where pk = $fk_users");
}
$f->Hidden ("fk_users");
$f->Hidden ("filter");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into users " . $sql)) {
      msg ("User added !");
    } else {
      error_msg ("Could not add user!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update users set " . $sql . "where pk = $fk_users")) {
      msg ("User modified !");
    } else {
      error_msg ("Could not modify user !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from mn_users_permissions where fk_users = $fk_users");
  if ($db->Exec ("delete from users where pk = $fk_users")) {
    msg ("User deleted !");
  } else {
    error_msg ("Could not delete user !");
  }
}

if (isupdate ()) {
  if (!isupdatemode ("delete")) {
    p ("<a href=\"user?mode=edit&filter=$filter&fk_users=$fk_users\">Back to User</a>");
  } 
} else {
  $f->Output ($caption, $caption);
}

p ("<a href=\"users_list?filter=$filter\">Back to User List</a>");

pagefooter ();

?>
