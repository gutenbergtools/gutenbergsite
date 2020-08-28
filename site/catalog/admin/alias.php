<?php

include_once ("pgcat.phh");
include_once ("sqlform.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

getstr ("mode");
getint ("fk_aliases");
getint ("fk_authors");

$caption = ucfirst ($mode);

$f = new SQLForm ();

if (ismode ("add")) {
  $f->SQLInject ("fk_authors", "fk_authors", SQLINT);
}
$f->Text      ("alias", "alias", "Alias", SQLCHAR, 80, 240, true);

$f->KeySelect ("alias_heading",  "alias_heading", "Heading",    SQLINT,  10,   2, false);
$f->last->PushOptions ($titles_heading);
$f->last->ToolTip  ("Should this alias generate a user-visible heading?");

$f->LoadData ("select * from aliases where pk = $fk_aliases");

$f->Hidden ("fk_aliases");
$f->Hidden ("fk_authors");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this alias. " .
                  "Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
}

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    $retcode = $db->Exec ("insert into aliases " . $sql);
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    $retcode = $db->Exec ("update aliases set " . $sql . "where pk = $fk_aliases");
  }
}
if (isupdatemode ("delete")) {
  $retcode = $db->Exec ("delete from aliases where pk = $fk_aliases");
}

if (isupdate ()) {
  $msg = confirmation_msg ($retcode, $mode, "alias");
  header ("Location: author?mode=edit&fk_authors=$fk_authors&$msg");
  return;
}

pageheader ("$caption Author Alias");
$f->Output ($caption, $caption);
pagefooter ();

?>
