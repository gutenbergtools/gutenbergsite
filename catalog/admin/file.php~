<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " File Entry";

pageheader ($caption);

include_once ("sqlform.phh");

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();

getint ("fk_files");
getint ("fk_books");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this file.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  if (ismode ("add")) {
    $f->SQLInject ("fk_books", "fk_books", SQLINT);
  } 
  $f->Text      ("filename", "filename", "Filename",  SQLCHAR, 80, 240, true);
  $f->Text      ("fk_books", "fk_books", "Etext-Nr.",  SQLINT, 20, 80, false);
  $f->Text      ("edition", "edition", "Edition",  SQLINT, 20, 80, false);
  $f->Text      ("filemtime", "filemtime", "File&nbsp;Modification&nbsp;Time", SQLDATE, 20, 20, false);
  $f->CheckBox  ("obsoleted",  "obsoleted",  "Obsoleted",   SQLINT);
  $f->SQLSelect ("fk_filetypes", "fk_filetypes", "File Type", SQLCHAR, 40,  80, true,
		 "select pk as value, filetype as caption from filetypes order by filetype");
  $f->SQLSelect ("fk_compressions", "fk_compressions", "Compression", SQLCHAR, 40,  80, true,
		 "select pk as value, compression as caption from compressions order by compression");
  $f->SQLSelect ("fk_encodings", "fk_encodings", "Encoding", SQLCHAR, 40,  80, false,
		 "select null as value, 'unknown' as caption union " . 
		 "select pk as value, pk as caption from encodings order by caption");
  $f->Text      ("filesize", "filesize", "File Size", SQLINT, 20,  80, false);
  $f->TextArea  ("note",       "note",       "Note",        SQLCHAR,    4,  80, false);
  $f->LoadData  ("select * from files where pk = $fk_files");
}
$f->Hidden ("fk_files");
$f->Hidden ("fk_books");
$f->Hidden ("filemask");

if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update files set " . $sql . "where pk = $fk_files")) {
      msg ("File modified !");
    } else {
      error_msg ("Could not modify file !");
    }
  }
}

if (isupdate ()) {
  getint ("fk_books");
  getstr ("filemask");
  echo ("<p><a href=\"files?fk_books=$fk_books&amp;filemask=$filemask\">Back to Book Files</a></p>\n\n");
} else {
  $f->Output ($caption, $caption);
}

pagefooter ();

?>
