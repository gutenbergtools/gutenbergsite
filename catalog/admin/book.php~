<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("mode");
$caption = ucfirst ($mode) . " Book";

pageheader ($caption);

getstr ("msg");
getstr ("errormsg");

if (!empty ($msg))      msg ($msg);
if (!empty ($errormsg)) error_msg ($msg);

include_once ("sqlform.phh");

class ListAttributesTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"attribute?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=edit&amp;pk=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&amp;pk=#pk#\">Delete</a>", "", "narrow");

    $this->AddSimpleColumn ("name",          "MARC Tag");
    $this->AddSimpleColumn ("indicators",    "MARC Indicators", "narrow");
    $this->AddSimpleColumn ("nonfiling",     "Nonfiling Chars", "narrow");
    $this->AddSimpleColumn ("text",          "Text");
  }
}

class ListMarcFieldsTable extends ListTable {
  function __construct () {
    global $fk_books, $fk_marcauthrecs;
    $prefix = "<a href=\"mn_books_marcauthrecs?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_marcauthrecs=#fk_marcauthrecs#&amp;fk_marctags=#fk_marctags#\">Unlink</a>",
		      "", "narrow");
    // $this->AddColumn ("$prefix=edit&amp;fk_marcauthrecs=#fk_marcauthrecs#&amp;fk_marctags=#fk_marctags#\">Edit&nbsp;Link</a>", "", "narrow");

    $this->AddSimpleColumn ("name",          "MARC Tag");
    //    $this->AddSimpleColumn ("indicators",    "MARC Indicators", "narrow");
    //    $this->AddSimpleColumn ("nonfiling",     "Nonfiling Chars", "narrow");
    $this->AddSimpleColumn ("text",          "Text");
  }
}

class ListAuthorsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"mn_books_authors?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_authors=#pk#&amp;fk_roles=#fk_roles#\">Unlink</a>",
		      "<a href=\"mn_books_authors_list?fk_books=$fk_books&amp;mode=add\">Link</a>", 
		      "narrow");
    $this->AddColumn ("$prefix=edit&amp;fk_authors=#pk#&amp;fk_roles=#fk_roles#\">Edit&nbsp;Link</a>",
		      "", "narrow");
    $this->AddColumn ("<a href=\"author?mode=edit&amp;fk_authors=#pk#\">#author#</a>", "Author");
    $this->AddSimpleColumn ("role",         "Role",    "narrow");
    $this->AddSimpleColumn ("c_heading",    "Heading", "narrow");
    $this->AddSimpleColumn ("born_floor",   "Born",    "narrow right");
    $this->AddSimpleColumn ("died_floor",   "Died",    "narrow right");

    $this->AddSubCaption   ("All authors for this work.");
  }
}

class ListReviewsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $this->AddSubCaption   ("All reviews for this work.");

    $prefix = "<a href=\"review?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=edit&amp;fk_reviews=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&amp;fk_reviews=#pk#\">Delete</a>", "", "narrow");

    $this->AddSimpleColumn ("name",    "Reviewer");
    $this->AddSimpleColumn ("review",  "Review");
  }
}

class ListCategoriesTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"mn_books_categories?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_categories=#pk#\">Unlink</a>",
		      "$prefix=add\">Link</a>", "narrow");

    $this->AddSimpleColumn ("category", "Category");

    $this->AddSubCaption   ("All categories for this work.");
  }
}

class ListSubjectsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"mn_books_subjects?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_subjects=#pk#\">Unlink</a>",
		      "$prefix=add\">Link</a>", "narrow");

    $this->AddColumn ("<a href=\"subject?fk_subjects=#pk#&amp;" .
		      "mode=edit\">#subject#</a>", "Subject");
    //Make the subject name's clickable links to the edit & list of books page

    $this->AddColumn ("#pk#", "#", "narrow"); 
    //List the Internal Code #.

    $this->AddSubCaption   ("All subjects for this work.");
  }
}

class ListLangsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"mn_books_langs?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_langs=#pk#\">Unlink</a>",
		      "$prefix=add\">Link</a>", "narrow");

    $this->AddSimpleColumn ("lang", "Language");

    $this->AddSubCaption   ("Languages of all major sections in this work.");
  }
}

class ListLoccsTable extends ListTable {
  function __construct () {
    global $fk_books;
    $prefix = "<a href=\"mn_books_loccs?fk_books=$fk_books&amp;mode";
    $this->AddColumn ("$prefix=delete&amp;fk_loccs=#pk#\">Unlink</a>",
		      "$prefix=add\">Link</a>", "narrow");
    $this->AddSimpleColumn("pk", "Code");
    $this->AddSimpleColumn ("locc", "LoC class");

    $this->AddSubCaption   ("All LoC Classes this work falls into.");
  }
}

$db = $config->db ();
$db->logger = new logger ();
$f  = new SQLForm ();
getint ("fk_books");

if (ismode ("delete")) {
  $f->SubCaption ("You are about to delete this book.");
  $f->SubCaption ("Press the '$caption' button to continue or hit " . 
		  "the back button on your browser to dismiss.");
} else {
  $f->Text     ("pk",           "pk",           "EText Nr.",     SQLINT,    20,   5, true);
  $f->ToolTip  ("Enter the ebook number.");
  $f->Text     ("release_date", "release_date", "Release Date",  SQLCHAR,   20,  20, false);
  $f->ToolTip  ("Enter the official release date.");
  $f->CheckBox ("copyrighted",  "copyrighted",  "Copyrighted",   SQLINT);
  $f->ToolTip  ("Check if book is copyrighted.");
  $f->CheckBox ("updatemode",   "updatemode",   "Manual Update", SQLINT);
  $f->ToolTip  ("Check if book is manually updated.");

  $f->LoadData ("select * from books where pk = $fk_books");
}
$f->Hidden ("fk_books");

if (isupdatemode ("add")) {
  if ($f->Check ()) {
    $sql = $f->mkInsert ($db->GetFormatter ());
    if ($db->Exec ("insert into books " . $sql)) {
      msg ("Book added !");
    } else {
      error_msg ("Could not add Book!");
    }
  }
}
if (isupdatemode ("edit")) {
  if ($f->Check ()) {
    $sql = $f->mkUpdate ($db->GetFormatter ());
    // set manually updated mode
    if ($db->Exec ("update books set " . $sql . "where pk = $fk_books")) {
      msg ("Book modified !");
    } else {
      error_msg ("Could not modify book !");
    }
  }
}
if (isupdatemode ("delete")) {
  $db->exec ("delete from files               where fk_books = $fk_books");
  $db->exec ("delete from attributes          where fk_books = $fk_books");
  $db->exec ("delete from reviews.reviews     where fk_books = $fk_books");
  $db->Exec ("delete from mn_books_authors    where fk_books = $fk_books");
  $db->Exec ("delete from mn_books_langs      where fk_books = $fk_books");
  $db->Exec ("delete from mn_books_loccs      where fk_books = $fk_books");
  $db->Exec ("delete from mn_books_subjects   where fk_books = $fk_books");
  $db->Exec ("delete from mn_books_categories where fk_books = $fk_books");
  if ($db->Exec ("delete from books where pk = $fk_books")) {
    msg ("Book deleted !");
  } else {
    error_msg ("Could not delete book !");
  }
}

if (isupdate ()) {
  getint ("fk_books");
  echo ("    <p><a href=\"book?mode=edit&amp;fk_books=$fk_books\">Back to Book</a></p>\n\n");
} else {
  $f->Output ($caption, $caption);

  if (ismode ("edit")) {

    p ("<a href=\"files?fk_books=$fk_books\">Goto Edit Files Page</a> &mdash; " .
       "<a href=\"$config->etext/${fk_books}#bibrec\">Goto Bibrec Page</a> &mdash; " . 
       "<a href=\"$config->etext/${fk_books}#download\">Goto Bibrec Download Page</a>");

    $db->exec ("select gutindex from books where pk = $fk_books");
    if ($db->FirstRow ()) {
      $gutindex = $db->get ("gutindex", SQLCHAR);
      if (!empty ($gutindex)) {
	echo ("<pre class=\"boxed\">$gutindex</pre>\n");
      }
    }

    // Authors for book
    $db->exec ("select authors.pk as pk, author, heading, born_floor, died_floor, " . 
	       "fk_roles, role " .
	       "from authors, mn_books_authors, roles " . 
	       "where authors.pk = mn_books_authors.fk_authors " . 
	       "and mn_books_authors.fk_roles = roles.pk " .
	       "and mn_books_authors.fk_books = $fk_books " . 
	       "order by author;");
    $db->calcfields ["c_heading"] = new CalcFieldHeading ();
    $table = new ListAuthorsTable ();
    $table->PrintTable ($db, "Authors", "pgdbdata");	

    p ("<a href=\"http://www.loc.gov/marc/umb/um07to10.html\">A Summary of Commonly Used MARC 21 Fields</a>");

    // Uncontrolled Fields for book
    $db->exec ("select attributes.*, attriblist.name from attributes, attriblist " . 
               "where attributes.fk_books = $fk_books and " . 
               "attributes.fk_attriblist = attriblist.pk " . 
               "order by attriblist.name;");
    $table = new ListAttributesTable ();
    $table->PrintTable ($db, "Uncontrolled MARC 21 Fields", "pgdbdata");	

    // Controlled Fields for book
//     $db->exec ("select marcfields.text, marctags.name, mn_books_marcauthrecs.* " . 
//                "from mn_books_marcauthrecs, marcfields, marctags " . 
//                "where mn_books_marcauthrecs.fk_books = $fk_books " . 
//                "and marcfields.fk_marcauthrecs = mn_books_marcauthrecs.fk_marcauthrecs " . 
//                "and marctags.pk = mn_books_marcauthrecs.fk_marctags " . 
//                "and marcfields.fk_marctags like 'A1%' order by marctags.name, marcfields.text;");

//     $table = new ListMarcFieldsTable ();
//     $table->PrintTable ($db, "Controlled MARC 21 Fields", "pgdbdata");

//     $f2 = new SQLForm ("mn_books_marcauthrecs", "get");
//     $f2->KeySelect      ("fk_marctags", "fk_marctags", "Tag to Link", SQLCHAR, 40, 40, true);
//     $f2->last->LoadSQL  ("select pk as key, name as caption from marctags where pk like 'B%' and type IS NOT NULL and not exists (select * from mn_books_marcauthrecs as mnm, marctags as mt where mnm.fk_books = $fk_books and mnm.fk_marctags = mt.pk and mt.excludes = marctags.excludes) order by name");
//     $f2->last->DefValue ("B100");
//     $f2->last->ToolTip  ("Select a Bibliographic MARC Tag.");
//     $f2->Hidden ("fk_books");
//     $f2->Hidden ("mode", "add");
//     $f2->Hidden ("step", "first");
//     $f2->Output ("Link Controlled Field", "Link Controlled Field");

    // Categories for book
    $db->exec ("select * from categories, mn_books_categories " .
	       "where categories.pk = mn_books_categories.fk_categories " . 
	       "and mn_books_categories.fk_books =$fk_books " .
	       "order by category;");
    $table = new ListCategoriesTable ();
    $table->PrintTable ($db, "Categories", "pgdbdata");

    // Subjects for book
    $db->exec ("select * from subjects, mn_books_subjects " .
	       "where subjects.pk = mn_books_subjects.fk_subjects " . 
	       "and mn_books_subjects.fk_books =$fk_books " .
	       "order by subject;");
    $table = new ListSubjectsTable ();
    $table->PrintTable ($db, "Subjects", "pgdbdata");

    form_open ("mn_books_subjects");
    form_hidden ("mode", "add");
    form_hidden ("step", "update");
    form_hidden ("fk_books", $fk_books);
    echo ("Quick link subject: <input type=\"text\" name=\"fk_subjects\" size=\"5\"> Use internal subject #!\n");
    form_submit ("Link Subject");
    echo ("(See \"#\" column above.)");
    form_close ();

    // Languages for book
    $db->exec ("select langs.pk as pk, lang from langs, mn_books_langs " . 
	       "where mn_books_langs.fk_langs = langs.pk " . 
	       "and fk_books = $fk_books order by lang;");
    $table = new ListLangsTable ();
    $table->PrintTable ($db, "Languages", "pgdbdata");	

    form_open ("mn_books_langs");
    form_hidden ("mode", "add");
    form_hidden ("step", "update");
    form_hidden ("fk_books", $fk_books);
    echo ("Quick link language: <input type=\"text\" name=\"fk_langs\" size=\"3\"> Use 2-letter code!\n");
    form_submit ("Link Language");
    form_close ();

    // LoCCs for book
    $db->exec ("select loccs.pk as pk, locc from loccs, mn_books_loccs " . 
	       "where mn_books_loccs.fk_loccs = loccs.pk " .
	       "and fk_books = $fk_books order by locc;");
    $table = new ListLoccsTable ();
    $table->PrintTable ($db, "LoC Classes", "pgdbdata");	

    form_open ("mn_books_loccs");
    form_hidden ("mode", "add");
    form_hidden ("step", "update");
    form_hidden ("fk_books", $fk_books);
    echo ("Quick link LoC class: <input type=\"text\" name=\"fk_loccs\" size=\"5\"> Use code!\n");
    form_submit ("Link LoC Class");
    form_close ();

    // Reviews for book
    $db->exec ("select reviews.reviews.*, reviews.reviewers.name from reviews.reviews, reviews.reviewers where fk_books = $fk_books and reviews.reviewers.pk = reviews.reviews.fk_reviewers;");
    $table = new ListReviewsTable ();
    $table->PrintTable ($db, "Reviews", "pgdbdata");	

  }
}

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>
