<?php

include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
getint ("fk_books");
getstr ("filemask");

pageheader ("Files for EBook #$fk_books");

p ("Careful! If you change the Ebook number you link the file to a different Ebook.");
p ("Note: you cannot add files to the database. " . 
   "That is done automagically by a nightly cron job.");

p ("<a href=\"book?mode=edit&amp;fk_books=$fk_books\">Goto Edit Book Page</a> &mdash; " .
   "<a href=\"$config->etext/${fk_books}\">Goto Bibrec Page</a>");

function mk_options ($name, $options, $option) {
  $ret = "";
  foreach ($options as $value => $opt) {
    $selected = ($opt == $option) ? " selected=\"selected\"" : "";
    $ret .= "<option value=\"$value\"$selected>$opt</option>\n";
  }
  return "<select name=\"${name}[]\">\n" . $ret . "</select>\n";
}

$filetypes[null] = "unknown";
$db->Exec ("select * from filetypes order by filetype");
if ($db->FirstRow ()) {
  do {
    $filetypes[$db->Get ("pk")] = $db->Get ("filetype");
  } while ($db->NextRow ());
}

$compressions[null] = "unknown";
$db->Exec ("select * from compressions order by compression");
if ($db->FirstRow ()) {
  do {
    $compressions[$db->Get ("pk")] = $db->Get ("compression");
  } while ($db->NextRow ());
}

$encodings[null] = "unknown";
$db->Exec ("select * from encodings order by pk");
if ($db->FirstRow ()) {
  do {
    $encodings[$db->Get ("pk")] = $db->Get ("pk");
  } while ($db->NextRow ());
}

class HeadColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "", "narrow");
  }
  function Data ($db) {
    $filename = $db->get ("filename");
    if (preg_match ("/\.zip$/i", $filename))
      return "<td><a href=\"zipdir?file=$filename\" target=\"newwin\">Dir</a></td>";
    return "<td><a href=\"head?file=$filename&amp;lines=500\" target=\"newwin\">Head</a></td>";
  }
}

class CharsetColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "", "narrow");
  }
  function Data ($db) {
    $filename = $db->get ("filename");
    if (preg_match ("/\.zip$/i", $filename))
      return "<td></td>";
    return "<td><a href=\"charset_guesser?file=$filename\" target=\"newwin\">Guess</a></td>";
  }
}

class SizeColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "Size", "pgdbfilessize");
  }
  function Header () {
    return "<th class=\"pgdbfilessize\">Size</th>";
  }
  function Data ($db) {
    return "<td class=\"pgdbfilessize\">" . human_readable_size ($db->get ("filesize")) . "</td>";
  }
}

class FiletypeColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "File&nbsp;Type", "pgdbfilesfiletype");
  }
  function Data ($db) {
    global $filetypes;
    return "<td>" . mk_options ("fk_filetypes", $filetypes, $db->get ("filetype")) . "</td>";
  }
}

class CompressionColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "Compression", "pgdbfilescompression");
  }
  function Data ($db) {
    global $compressions;
    return "<td>" . mk_options ("fk_compressions", $compressions, $db->get ("compression")) . "</td>";
  }
}

class EncodingColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "Encoding", "pgdbfilesencoding");
  }
  function Data ($db) {
    global $encodings;
    return "<td>" . mk_options ("fk_encodings", $encodings, $db->get ("fk_encodings")) . "</td>";
  }
}

class ObsoletedColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "Obs.", "pgdbfilesobsoleted");
  }
  function Data ($db) {
    $obs = $db->get ("obsoleted", SQLINT) ? " checked=\"checked\"" : "";
    $pk  = $db->get ("pk", SQLINT);
    return "<td><input type=\"checkbox\" name=\"obsoleteds[]\" value=\"$pk\"$obs /></td>";
  }
}

form_open_get ();
echo ("Enter Perl RegExp: <input type=\"text\" name=\"filemask\" value=\"$filemask\" /> eg. /12345/");
form_relay ("fk_books");
form_submit ("Reload");
form_close ();

// Files for book
$prefix = "<a href=\"file?fk_books=$fk_books&mode";

$t = new ListTable ();
$t->AddColumn ("<input type=\"checkbox\" name=\"pks_update[]\" value=\"#pk#\" />", "", "narrow");
$t->AddColumn ("$prefix=edit&fk_files=#pk#\">Edit</a>", "", "narrow");
$t->AddColumnObject (new HeadColumn ());
$t->AddColumn ("<a href=\"mailto:errata2010@pglaf.org?subject=Bug in ebook $fk_books file #filename#\">Bug</a>", "", "narrow");
$t->AddColumn ("<a href=\"$config->downloadbase/#filename#\">#filename#</a>" . 
	       "<input type=\"hidden\" name=\"filenames[]\" value=\"#filename#\" />", 
	       "Filename");
$t->AddColumn ("<input type=\"text\" size=\"5\" name=\"fk_books_a[]\" value=\"#fk_books#\" />" . 
	       "<input type=\"hidden\" name=\"pks[]\" value=\"#pk#\" />", "EBook");
$t->AddColumn ("<input type=\"text\" size=\"2\" name=\"editions[]\" value=\"#edition#\"/>", "Edition");
$t->AddColumnObject (new ObsoletedColumn ());
$t->AddColumnObject (new FiletypeColumn ());
$t->AddColumnObject (new EncodingColumn ());
$t->AddColumnObject (new CharsetColumn ());
$t->AddColumnObject (new CompressionColumn ());
$t->AddColumnObject (new SizeColumn ());

/////////////////////////////////////////////////////////////////////////////////
// Generate list of candidate files
//

/*if (empty ($filemask)) {
  if ($fk_books > 10000) {
    $filemask = "/${fk_books}[.-]";
  } else {
    $db->Exec ("select * from books where pk = $fk_books");
    $filemask = $db->Get ("filemask");
    if (!empty ($filemask)) {
      $filemask = preg_replace ("/\./", "\\.", $filemask);
      $filemask = preg_replace ("/x+/", ".*", $filemask);
      $filemask = preg_replace ("/^[?]/", "[78]", $filemask);
    }
  }
}*/

$sql = "select files.pk as pk, fk_books, filename, edition, obsoleted, filetype, " . 
       "compression, fk_encodings, filesize " . 
       "from files left join filetypes on files.fk_filetypes = filetypes.pk " . 
       "left join compressions on files.fk_compressions = compressions.pk " .
       "where " . (empty ($filemask) ? "" : "filename ~ '$filemask' or ") .
       "(fk_books = $fk_books and diskstatus = 0) " . 
       "order by (fk_books = $fk_books) desc, obsoleted, " . 
       "filetype, fk_encodings, compression, filename;";

$db->exec ($sql);

form_open ("files2");
$t->limit = 100;
$t->PrintTable ($db, "Files Linked to Book $fk_books or Matching RegExp: $filemask", "pgdbfiles");
form_relay ("fk_books");
form_relay ("filemask");
form_submit ("Update Checked File Entries");
form_close ();

p ("To be implemented: functions for viewing bottom n lines from file, check
for character encoding, diff files, look into zips. In my copious free time.");

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>
