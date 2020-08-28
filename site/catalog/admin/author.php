<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Author";

pageheader ($caption);

getstr ("msg");
getstr ("errormsg");

if (!empty ($msg))      msg ($msg);
if (!empty ($errormsg)) error_msg ($msg);

include_once ("sqlform.phh");

class ListAliasesTable extends ListTable {
  function __construct () {
    global $fk_authors;
    $prefix = "<a href=\"alias?fk_authors=$fk_authors&mode";
    $this->AddColumn ("$prefix=edit&fk_aliases=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&fk_aliases=#pk#\">Delete</a>", "", "narrow");
    $this->AddSimpleColumn ("alias",           "Alias");
    $this->AddSimpleColumn ("c_alias_heading", "Heading", "narrow");

    $this->AddSubCaption 
      ("Less prominent names and pseudonyms the author is also known under, " .
       "ASCII-fied versions, variant orthographies, common mis-spellings (Gutenburg).");
  }
}

class ListAuthorUrlsTable extends ListTable {
  function __construct () {
    global $fk_authors;
    $prefix = "<a href=\"author_url?fk_authors=$fk_authors&mode";
    $this->AddColumn ("$prefix=edit&fk_author_urls=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&fk_author_urls=#pk#\">Delete</a>", "", "narrow");

    $this->AddSimpleColumn ("description", "Description");
    $this->AddSimpleColumn ("url", "URL");

    $this->AddSubCaption ("Interesting sites about the author.");
  }
}

class ListBooksTable extends ListTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#fk_books#\">#fk_books#</a>", 
		      "Etext Nr.", "narrow right");
    $this->AddSimpleColumn ("title",   "Title");
    $this->AddSimpleColumn ("lang",    "Language", "narrow");
    $this->AddSimpleColumn ("role",    "Role", "narrow");

    $this->AddSubCaption ("Books linked to author.");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_authors");

if (ismode ("delete")) {
  $db->Exec ("select count (*) as cnt from mn_books_authors where fk_authors = $fk_authors");
  $cnt = $db->get ("cnt");
  if ($cnt > 0) {
    error_msg ("There are still $cnt books related to this author. " . 
			"You must delete them first.");
  }
  $db->Exec ("select author from authors where pk = $fk_authors");
  $author = $db->get("author");
  $f->SubCaption ("You are about to delete author: $author.");
  $f->SubCaption ("Press the '$caption' button to continue or " . 
		  "hit the back button on your browser to dismiss.");
} else {
  $f->SubCaption  ("The best-known name or pseudonym and other data.");
  $f->Text        ("author", "author",  "Name",           SQLCHAR,   80, 240, true);
  $f->ToolTip     ("Enter the name or pseudonym the author is best known under. " . 
		   "Put lesser known names or pseudonyms in aliases. " .
		   "Use full unicode here and put an ASCII-fied version in aliases." . 
		   "(eg. Brontë, Charlotte)");

  $f->Text        ("born_floor",   "born_floor",    "Born (earliest)",    SQLINT,   12,  12, false);
  $f->ToolTip     ("Year the author was born (earliest estimate). Leave empty if unknown. ". 
		   "(eg. 1803, -250)");
  $f->Text        ("born_ceil",    "born_ceil",     "Born (latest)",      SQLINT,   12,  12, false);
  $f->ToolTip     ("Year the author was born (latest estimate). Leave empty if unknown. ". 
		   "(eg. 1803, -250)");

  $f->Text        ("died_floor",   "died_floor",    "Died (earliest)",    SQLINT,   12,  12, false);
  $f->ToolTip     ("Year the author died (earliest estimate). Leave empty if unknown. ". 
		   "(eg. 1803, -250)");
  $f->Text        ("died_ceil",    "died_ceil",     "Died (latest)",      SQLINT,   12,  12, false);
  $f->ToolTip     ("Year the author died (latest estimate). Leave empty if unknown. ". 
		   "(eg. 1803, -250)");

  $f->TextArea    ("note",   "note",    "Note",           SQLCHAR,    4,  80, false);
  $f->ToolTip     ("Any note relevant to the cataloging people.");
  $f->LoadData    ("select * from authors where pk = $fk_authors");
}
$f->Hidden ("fk_authors");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into authors " . $sql)) {
      msg ("Author added !");
    } else {
      error_msg ("Could not add Author!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    if ($db->Exec ("update authors set " . $sql . "where pk = $fk_authors")) {
      msg ("Author modified !");
    } else {
      error_msg ("Could not modify author !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->Exec ("delete from aliases where fk_authors = $fk_authors");
  $db->Exec ("delete from author_urls where fk_authors = $fk_authors");
  if ($db->Exec ("delete from authors where pk = $fk_authors")) {
    msg ("Author deleted !");
    $fk_authors = null;
  } else {
    error_msg ("Could not delete author !");
  }
}

if (isupdate ()) {
  if ($fk_authors)
    p ("<a href=\"author?mode=edit&amp;fk_authors=$fk_authors\">" .
       "Back to Author</a>");
} else {

  $f->Output ($caption, $caption);

  if (ismode ("edit")) {
    $db->exec ("select * from authors where pk = $fk_authors");
    if ($db->FirstRow ()) {
      $author_from = $db->Get ("author", SQLCHAR);
      p ("<a href=\"authors_list?author_from=$author_from&amp;" . 
	 "fk_authors_from=$fk_authors\">Transfer&nbsp;Books</a>");
    }

    p("<a href=\"author?mode=delete&fk_authors=$fk_authors\">" .
      "Delete Author</a>");
    $db->exec ("select * from aliases where fk_authors = $fk_authors;");
    $db->calcfields ["c_alias_heading"] = new CalcFieldAliasHeading ();
    $table = new ListAliasesTable ();
    $table->PrintTable ($db, "Aliases");	

    $db->exec ("select * from author_urls where fk_authors = $fk_authors;");
    $table = new ListAuthorUrlsTable ();
    $table->PrintTable ($db, "URLs");	

    $db->exec ("select * from v_books where fk_authors = $fk_authors order by title;");
    $table = new ListBooksTable ();
    $table->PrintTable ($db, "Books");	
  }
}

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>
