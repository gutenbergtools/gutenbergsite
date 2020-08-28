<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include ("pgcat.phh");

function _log ($s) {
  // fwrite (STDERR, "$s\n");
}

function lout (&$book, $name, $tag) {
  $s = "";
  if (isset ($book[$name])) {
    $a = $book[$name];
    if (is_array ($a)) {
      if (count ($a) > 1) {
	$s .= "  <$tag>\n    <rdf:Bag>\n";
	foreach ($a as $val) {
	  $s .= "      <rdf:li rdf:parseType=\"Literal\">$val</rdf:li>\n";
	}
	$s .= "    </rdf:Bag>\n  </$tag>\n";
      } else {
        $val = $a[0];
	$s .= "  <$tag rdf:parseType=\"Literal\">$val</$tag>\n";
      }
    } else {
      $val = $a;
      $s .= "  <$tag rdf:parseType=\"Literal\">$val</$tag>\n";
    }
  }
  return $s;
}

function qout (&$book, $name, $tag, $tag2) {
  if (!isset ($book[$name])) {
    return "";
  }
  $a = $book[$name];
  if (is_array ($a)) {
    if (count ($a) > 1) {
      $s = "  <$tag>\n    <rdf:Bag>\n";
      foreach ($a as $val) {
        $s .= "      <rdf:li><$tag2><rdf:value>$val</rdf:value></$tag2></rdf:li>\n";
      }
      $s .= "    </rdf:Bag>\n  </$tag>\n";
      return $s;
    } else {
      $val = $a[0];
      return "  <$tag><$tag2><rdf:value>$val</rdf:value></$tag2></$tag>\n";
    }
  } 
  $val = $a;
  return "  <$tag><$tag2><rdf:value>$val</rdf:value></$tag2></$tag>\n";
}

_log ("Initializing ...");

$db = $config->db ();

_log (" Connected to Database ...");

$base_url    = "http://www.gutenberg.org";
$file_base   = "$base_url";

$now = date ("Y-m-d");

$books = array ();

_log (" Done\n");

_log ("Loading data from database ...");

_log (" Books");

$db->exec ("select * from books");
if ($db->FirstRow ()) {
  do {
    $pk = $db->get ("pk", SQLINT);
    if ($reldate = $db->get ("release_date", SQLDATE)) {
      $books[$pk]['release_date'] = date ("Y-m-d", $reldate);
      $books[$pk]['downloads'] = $db->get ("downloads", SQLINT);
    }
    if ($db->get ("copyrighted", SQLINT)) {
      $books[$pk]['copyrighted'] = 1;
    }
  } while ($db->NextRow ());
}

_log (" Authors");

$db->exec ("select * from v_books_authors order by fk_books");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $role     = $db->get ("role", SQLCHAR);
    if ($role == "Creator" || $role == "Author") {
      $val = htmlspecialchars (FormatAuthorDate ($db));
      $books[$fk_books]['creators'][] = $val;
    } else {
      $val = htmlspecialchars (FormatAuthorDateRole ($db));
      $books[$fk_books]['contributors'][] = $val;
    }
  } while ($db->NextRow ());
}

_log (" FriendlyTitles");

foreach ($books as $fk_books => $dummy) {
  $books[$fk_books]['friendlytitle'][] = htmlspecialchars (friendlytitle ($fk_books));
}

/* _log (" Titles");

$db->exec ("select * from titles");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $title = htmlspecialchars ($db->get ("title", SQLCHAR)); 
    // $title = preg_replace ("/\s*\n/", "<br />", $title);
    switch ($db->get ("title_order", SQLINT)) {
    case 1:
      $books[$fk_books]['240'][] = $title; break;
    case 2:
    case 4:
    case 5:
      $books[$fk_books]['246'][] = $title; break;
    case 3:
      $books[$fk_books]['505'][] = $title; break;
    }
  } while ($db->NextRow ());
} */

_log (" Attributes");

$db->exec ("select * from attributes");

if ($db->FirstRow ()) {
  do {
    $fk_books      = $db->get ("fk_books", SQLINT);
    $fk_attriblist = (string) $db->get ("fk_attriblist", SQLINT);
    $text = htmlspecialchars ($db->get ("text", SQLCHAR)); 
    $books[$fk_books][$fk_attriblist][] = $text;
  } while ($db->NextRow ());
}

_log (" Categories");

$db->exec ("select * from mn_books_categories, categories where fk_categories = pk");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $books[$fk_books]['categories'][] = $db->get ("category", SQLCHAR);
  } while ($db->NextRow ());
} else {
  $books[$fk_books]['categories'][] = 'eBook';
}

_log (" Languages");

$db->exec ("select * from mn_books_langs");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $books[$fk_books]['languages'][] = $db->get ("fk_langs", SQLCHAR);
  } while ($db->NextRow ());
}

_log (" Subjects");

$db->exec ("select * from mn_books_subjects, subjects where fk_subjects = pk");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $subject  = htmlspecialchars ($db->get ("subject", SQLCHAR));
    $books[$fk_books]['subjects'][] = $subject;
  } while ($db->NextRow ());
}

_log (" LoCC");

$db->exec ("select * from mn_books_loccs");
if ($db->FirstRow ()) {
  do {
    $fk_books = $db->get ("fk_books", SQLINT);
    $books[$fk_books]['loccs'][] = $db->get ("fk_loccs", SQLCHAR);
  } while ($db->NextRow ());
}

_log (" Done\n");

$fp = fopen ("php://stdout", "w");

$s = <<< EOF
<?xml version="1.0" encoding="UTF-8" ?>

<!DOCTYPE rdf:RDF [
  <!ENTITY pg  "Project Gutenberg">
  <!ENTITY lic "$base_url/license">
  <!ENTITY f   "$file_base/">
]>

<!-- 

The Project Gutenberg Catalog in RDF/XML Format

  Copyright (C) 2004-present by 

  Project Gutenberg Literary Archive Foundation
  4557 Melan Drive S.
  Fairbanks AK 99712
  U.S.A.


LICENSE TERMS


This file ("work") is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License (GPL)
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This work is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

Please become familiar with the GNU GPL before using this file.

You can get a full copy of the GNU General Public License online at:

  http://www.gnu.org/licenses/gpl.html

The GNU General Public License is explained in human language at:

  http://creativecommons.org/licenses/GPL/2.0/

If you are uncertain about the terms of the license or whether your
intended use is legitimate, please email gbnewby@pglaf.org for
clarification.

Thank you for your interest in Project Gutenberg.  For more
information about Project Gutenberg and its goals, visit
the Official Project Gutenberg Web site at 

  http://www.gutenberg.org

-->

<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
         xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
         xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
         xmlns:dc="http://purl.org/dc/elements/1.1/"
         xmlns:dcterms="http://purl.org/dc/terms/"
         xmlns:dcmitype="http://purl.org/dc/dcmitype/"
         xmlns:cc="http://web.resource.org/cc/"
         xmlns:pgterms="$base_url/rdfterms/"
         xml:base="$base_url/feeds/catalog.rdf">

<cc:Work rdf:about="">
   <cc:license  rdf:resource="http://creativecommons.org/licenses/GPL/2.0/" />
</cc:Work>

<cc:License rdf:about="http://creativecommons.org/licenses/GPL/2.0/">
   <cc:permits  rdf:resource="http://web.resource.org/cc/Reproduction" />
   <cc:permits  rdf:resource="http://web.resource.org/cc/Distribution" />
   <cc:requires rdf:resource="http://web.resource.org/cc/Notice" />
   <cc:permits  rdf:resource="http://web.resource.org/cc/DerivativeWorks" />
   <cc:requires rdf:resource="http://web.resource.org/cc/ShareAlike" />
   <cc:requires rdf:resource="http://web.resource.org/cc/SourceCode" />
</cc:License>

<rdf:Description rdf:about="">
  <dc:created><dcterms:W3CDTF><rdf:value>$now</rdf:value></dcterms:W3CDTF></dc:created>
</rdf:Description>


EOF;

fputs ($fp, $s);

// debug
// $books = array_slice ($books, 0, 500);

reset ($books);

while (list ($fk_books, $book) = each ($books)) {
  $s  = "<pgterms:etext rdf:ID=\"etext$fk_books\">\n";
  $s .= "  <dc:publisher>&pg;</dc:publisher>\n";

  $s .= lout ($book, '240',           'dc:title');
  $s .= lout ($book, '245',           'dc:title');
  $s .= lout ($book, '246',           'dc:alternative');
  $s .= lout ($book, '500',           'dc:description');
  $s .= lout ($book, '505',           'dc:tableOfContents');

  $s .= lout ($book, 'creators',      'dc:creator');
  $s .= lout ($book, 'contributors',  'dc:contributor');
  $s .= lout ($book, 'friendlytitle', 'pgterms:friendlytitle');

  $s .= qout ($book, 'languages',     'dc:language',        'dcterms:ISO639-2');
  $s .= qout ($book, 'subjects',      'dc:subject',         'dcterms:LCSH');
  $s .= qout ($book, 'loccs',         'dc:subject',         'dcterms:LCC');
  $s .= qout ($book, 'release_date',  'dc:created',         'dcterms:W3CDTF');
  $s .= qout ($book, 'downloads',     'pgterms:downloads',  'xsd:nonNegativeInteger');
  $s .= qout ($book, 'categories',    'dc:type',            'pgterms:category');

  if (isset ($book['copyrighted'])) {
    $s .= "  <dc:rights>Copyrighted work. See license inside work.</dc:rights>\n";
  } else {
    $s .= "  <dc:rights rdf:resource=\"&lic;\" />\n";
  }

  $s .= "</pgterms:etext>\n\n";
  fputs ($fp, $s);
}

$books = null;

// files

$db->exec ("select fk_books, mediatype, filetype, fk_filetypes, fk_compressions, fk_encodings, " . 
	   "edition, filename, filesize, filemtime " . 
	   "from files " . 
	   "left join filetypes on files.fk_filetypes = filetypes.pk " . 
	   "where fk_books is not null and obsoleted = 0 and diskstatus = 0 " . 
	   "order by fk_books, filename;");


if ($db->FirstRow ()) {
  do {
    $fk_books        = $db->get ("fk_books",        SQLINT);
    $filename        = $db->get ("filename",        SQLCHAR);
    $filesize        = $db->get ("filesize",        SQLINT);
    $filetype        = $db->get ("filetype",        SQLCHAR);
    $fk_filetypes    = $db->get ("fk_filetypes",    SQLCHAR);
    $filemtime       = $db->get ("filemtime",       SQLDATE);
    $mediatype       = $db->get ("mediatype",       SQLCHAR);
    $fk_encodings    = $db->get ("fk_encodings",    SQLCHAR);
    $fk_compressions = $db->get ("fk_compressions", SQLCHAR);

    if (!strncmp ($filename, "cache/", 6)) {
      $filename = "&f;$filename";
    } else {
      $filename = "&f;dirs/$filename";
    }

    $mtime = date ("Y-m-d", $filemtime);

    if (!empty ($fk_encodings) && !strncmp ($mediatype, "text/", 5)) {
      $mediatype .= "; charset=\"$fk_encodings\"";
    }
    if (empty ($mediatype)) {
      $mediatype = "application/octet-stream";
      if (!empty ($fk_filetypes)) {
	$mediatype .= "; type=\"$filetype ($fk_filetypes)\"";
      }
    }
    $compression = "";
    if ($fk_compressions == "zip") {
      $compression = "\n  <dc:format><dcterms:IMT><rdf:value>application/zip</rdf:value></dcterms:IMT></dc:format>";
    }

    $s = "
<pgterms:file rdf:about=\"$filename\">
  <dc:format><dcterms:IMT><rdf:value>$mediatype</rdf:value></dcterms:IMT></dc:format>$compression
  <dcterms:extent>$filesize</dcterms:extent>
  <dcterms:modified><dcterms:W3CDTF><rdf:value>$mtime</rdf:value></dcterms:W3CDTF></dcterms:modified>
  <dcterms:isFormatOf rdf:resource=\"#etext$fk_books\" />
</pgterms:file>
";
  fputs ($fp, $s);

  } while ($db->NextRow ());
}

fputs ($fp, "\n</rdf:RDF>\n");

fclose ($fp);

_log (" Done!\n");

?>
