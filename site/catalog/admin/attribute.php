<?php

include_once ("pgcat.phh");
include_once ("sqlform.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

getstr ("mode");
getint ("pk");
getint ("fk_books");

$caption = ucfirst ($mode);

$f = new SQLForm ();

if (ismode ("add")) {
  $f->SQLInject ("fk_books", "fk_books", SQLINT);
}
$f->KeySelect      ("fk_attriblist", "fk_attriblist", "Attribute", SQLINT, 40, 40, true);
$f->last->LoadSQL  ("select pk as key, name as caption from attriblist where type = 'unc' order by name");
$f->last->DefValue (500);
$f->last->ToolTip  ("Select an attribute.");

$f->TextArea  ("text",           "text",          "Value",          SQLCHAR,  5,  80, true);
$f->ToolTip   ("Enter the value for the selected attribute.");

$f->Text      ("nonfiling",      "nonfiling",   "Nonfiling Chars", SQLINT, 2, 2, false);
$f->DefValue  (0);
$f->ToolTip   ("No. of nonfiling characters. eg. 'The Idiot' => 4");

$f->Text      ("indicators",      "indicators",   "MARC indicators", SQLCHAR, 2, 2, false);
$f->ToolTip   ("MARC indicators (2 digits). See MARC Spec for details. If you are unsure leave blank.");

$f->KeySelect        ("fk_langs", "fk_langs", "Language", SQLCHAR, 40, 40, true);
$f->last->PushOption (null, "undefined");
$f->last->LoadSQL    ("select pk as key, lang as caption from langs order by lang");
$f->last->DefValue   ("en");
$f->last->ToolTip    ("Which language is this attribute in?");

$f->LoadData ("select * from attributes where pk = $pk");

$f->Hidden ("pk");
$f->Hidden ("fk_books");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this attribute. " .
                  "Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
}

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    $retcode = $db->Exec ("insert into attributes " . $sql);
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    $retcode = $db->Exec ("update attributes set " . $sql . "where pk = $pk");
  }
}
if (isupdatemode ("delete")) {
  $retcode = $db->Exec ("delete from attributes where pk = $pk");
}

if (isupdate ()) {
  $msg = confirmation_msg ($retcode, $mode, "attribute");
  header ("Location: book?mode=edit&fk_books=$fk_books&$msg");
  return;
}

pageheader ("$caption Attribute");
p ("<a href=\"http://www.loc.gov/marc/umb/um07to10.html\">A Summary of Commonly Used MARC 21 Fields</a>");
$f->Output ($caption, $caption);
pagefooter ();

?>
