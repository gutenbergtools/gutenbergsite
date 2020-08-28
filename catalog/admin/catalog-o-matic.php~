<?php

include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

include_once ("sqlform.phh");

echo ("after sqlform ...\n"); flush ();

$db = $config->db ();

echo ("after db () ...\n"); flush ();

$db->logger = new logger ();

echo ("Initializing ...\n"); flush ();

$db->Exec ("select pk, lang from langs");
if ($db->FirstRow ()) {
  do {
    $languages[$db->Get ("lang", SQLCHAR)] = $db->Get ("pk", SQLCHAR);
  } while ($db->NextRow ());
}

$db->exec ("select pk, filetype from filetypes");
if ($db->FirstRow ()) {
  do {
    $filetypes[$db->Get ("pk", SQLCHAR)] = $db->Get ("filetype", SQLCHAR);
  } while ($db->NextRow ());
}

$db->exec ("select pk, compression from compressions");
if ($db->FirstRow ()) {
  do {
    $compressions[$db->Get ("pk", SQLCHAR)] = $db->Get ("compression", SQLCHAR);
  } while ($db->NextRow ());
}

$db->exec ("select pk from encodings");
if ($db->FirstRow ()) {
  do {
    $encodings[$db->Get ("pk", SQLCHAR)] = 1;
  } while ($db->NextRow ());
}

$db->exec ("select pk, role from roles");
if ($db->FirstRow ()) {
  do {
    $roles[$db->Get ("role", SQLCHAR)] = $db->get ("pk", SQLCHAR);
  } while ($db->NextRow ());
}

$importfilename = $argv[1];
if (empty ($importfilename))
     $importfilename = $config->catalogupdatelog;

echo ("Processing $importfilename ...\n"); flush ();

$old_etext_number = -1;

function guess_filetype ($filename) {
  // guesses filetype, encoding from filename only
  // 
  // needs following hashes: 
  // usually loaded from the same tables in the database
  // $filetypes:    'txt'   => 'Plain text'
  // $encodings:    'us-ascii'
  global $filetypes, $encodings;

  $extension_aliases = array (
    'htm'     => 'html',
    'tif'     => 'tiff',
    'jpeg'    => 'jpg',
    'midi'    => 'mid'
    );

  $ft = $enc = null;
  $base = $ext = "";
  $base_after_hyphen = "";

  if (preg_match ("/^(.*)\.(.*)$/", $filename, $matches)) {
    $base = strtolower ($matches[1]);
    $ext  = strtolower ($matches[2]);
  }

  $post10k = preg_match ("/^\d{5}(-|$)/", $base);
  if (preg_match ("/-(.*)$/", $base, $matches))
    $base_after_hyphen = $matches[1];

  // guess filetype from file extension
  if (isset ($extension_aliases[$ext])) {
    $ext = $extension_aliases[$ext];
  }
  if (isset ($filetypes[$ext])) {
    $ft = $ext;
  } 

  if (preg_match ("/[-_]index\.html?$/i", $filename)) {
    $ft = "index";
  }
  if (preg_match ("/readme\.txt$/i", $filename)) {
    $ft = "readme";
  }
  if (preg_match ("/license\.txt$/i", $filename)) {
    $ft = "license";
  }
  if (preg_match ("/page-images/i", $filename)) {
    $ft = "pageimages";
  }

  // guess encoding from file name
  if ($ext == "txt") {
    if ($post10k) {
      switch ($base_after_hyphen) {
      case ""  : $enc = "us-ascii";   break;
      case "8" : $enc = "iso-8859-1"; break;
      case "0" : $enc = "utf-8";      break;
      case "5" : $enc = "big5";       break;
      }
    } else {
      $enc = "us-ascii";
      if (preg_match ("/^8\w.+\d\da?$/", $base))
	$enc = "iso-8859-1";
      if (preg_match ("/^8\w.+\d\du$/", $base))
	$enc = "utf-8";
    }
  }

  return array ($ft, $enc);
}

function fix_encoding ($encoding) {
  global $encodings;

  $encoding_aliases = array (
    'ascii'       => 'us-ascii',
    'usascii'     => 'us-ascii',
    'iso88591'    => 'iso-8859-1',
    'latin1'      => 'iso-8859-1',
    'iso88592'    => 'iso-8859-2',
    'latin2'      => 'iso-8859-2',
    'iso88593'    => 'iso-8859-3',
    'latin3'      => 'iso-8859-3',
    'iso88594'    => 'iso-8859-4',
    'latin4'      => 'iso-8859-4',
    'iso88595'    => 'iso-8859-5',
    'cyrillic'    => 'iso-8859-5',
    'iso88596'    => 'iso-8859-6',
    'arabic'      => 'iso-8859-6',
    'iso88597'    => 'iso-8859-7',
    'greek'       => 'iso-8859-7',
    'iso88598'    => 'iso-8859-8',
    'hebrew'      => 'iso-8859-8',
    'iso88599'    => 'iso-8859-9',
    'latin5'      => 'iso-8859-9',
    'iso885910'   => 'iso-8859-10',
    'latin6'      => 'iso-8859-10',
    'iso885913'   => 'iso-8859-13',
    'iso885914'   => 'iso-8859-14',
    'latin8'      => 'iso-8859-14',
    'iso885915'   => 'iso-8859-15',
    'latin9'      => 'iso-8859-15',
    'iso885916'   => 'iso-8859-16',
    'latin10'     => 'iso-8859-16',
    'utf7'        => 'utf-7',
    'utf8'        => 'utf-8',
    'win1250'     => 'windows-1250',
    'win1251'     => 'windows-1251',
    'win1252'     => 'windows-1252',
    'win1253'     => 'windows-1253',
    'koi8r'       => 'koi8-r'
  );
  
  $pat[] = "/[- _=<]/";          $rep[] = "";
  $pat[] = "/^unicode/";         $rep[] = "";
  $pat[] = "/^windowscodepage/"; $rep[] = "win";
  $pat[] = "/^windows/";         $rep[] = "win";
  $pat[] = "/^codepage/";        $rep[] = "win";
  $pat[] = "/^cp/";              $rep[] = "win";
  $pat[] = "/^isolatin/";        $rep[] = "latin";

  $encoding = strtolower ($encoding);
  $encoding = preg_replace ($pat, $rep, $encoding);

  if (isset ($encodings[$encoding])) {
    return $encoding;
  }
  if (isset ($encoding_aliases[$encoding])) {
    return $encoding_aliases[$encoding];
  }

  if (strpos ($encoding, "iso88591")) {
    $encoding = "iso-8859-1";
  } elseif (strpos ($encoding, "utf8")) {
    $encoding = "utf-8";
  } else {
    $encoding = null;
    // print ("#$nr: unknown encoding $enc\n");
  }
  return $encoding;
}

function encode_language ($l) {
  global $languages;
  $l = ucfirst ($l);

  if (isset ($languages[$l])) {
    return $languages[$l];
  }
  return null;
}

function decode_author ($whole) {
  global $roles;

  $parts = preg_split ("/ *, */", $whole);
  $names = array ();
  $name = "";
  $born = null;
  $died = null;
  $role = "aut";

  foreach ($parts as $part) {
    if (empty ($part))
      continue;
    if (preg_match ("/^(\d+\??)-(\d*\??)$/", $part, $matches)) {
      $born = "$matches[1]";
      $died = "$matches[2]";
      continue;
    }
    if (preg_match ("/^-(\d+)$/", $part, $matches)) {
      $died = "$matches[1]";
      continue;
    }
    if (isset ($roles[$part])) {
      $role = $roles[$part];
      continue;
    }
    array_push ($names, $part);
  }

  return array (join (", ", $names), $born, $died, $role);
}

function insert_author ($author, $born, $died) {
  global $db;
  if (empty ($author))
    return null;

  $sql_author      = $db->f ($author, SQLCHAR);
  $sql_born        = $db->f ($born, SQLINT);
  $sql_died        = $db->f ($died, SQLINT);
  $sql_author_like = $db->f ("$author%", SQLCHAR);

  $pk = 0;
  $db->exec ("select pk from authors where author ilike $sql_author_like order by pk");
  if ($db->FirstRow ()) {
    $pk = $db->Get ("pk", SQLINT);
  } else {
    // try aliases
    $db->exec ("select fk_authors from aliases where alias ilike $sql_author_like order by fk_authors");
    if ($db->FirstRow ()) {
      $pk = $db->Get ("fk_authors", SQLINT);
    }
  }
  if ($pk == 0) {
    $db->exec ("insert into authors (author, born_floor, died_floor, born_ceil, died_ceil) " . 
	       "values ($sql_author, $sql_born, $sql_died, $sql_born, $sql_died)");
    $db->exec ("select pk from authors where author = $sql_author");
    $pk = $db->Get ("pk", SQLINT);
    echo ("Added author '$author' to database. !!!!\n");
  }
  return $pk;
}

function insert_title ($etext_number, $title, $marc = 245) {
  global $db, $titles;
  if (empty ($title))
    return;

  $nonfilings = array ('The ', 'A ', 'An ', 
		       'Der ', 'Die ', 'Das ', 'Eine ', 'Ein ', 
		       'La ', 'Le ', 'Les ', 'L\'',
		       'El ');
  $nonfiling = 0;

  foreach ($nonfilings as $key => $value) {
    if (preg_match ("/^$value/", $title)) {
      $nonfiling = strlen ($value);
    }
  }

  $title = preg_replace ("/--/", "\xE2\x80\x94", $title);
  $title = preg_replace ("/ *_ */", "\n", $title);
  $sql_title        = $db->f ($title, SQLCHAR);
  $sql_etext_number = $db->f ($etext_number, SQLINT);
  $sql_marc         = $db->f ($marc, SQLINT);
  $sql_nonfiling    = $db->f ($nonfiling, SQLINT);

  $db->exec ("select pk from attributes where fk_books = $sql_etext_number and text = $sql_title");
  if (!$db->FirstRow ()) {
    $db->exec ("insert into attributes (fk_books, text, nonfiling, fk_attriblist) " . 
	       "values ($sql_etext_number, $sql_title, $sql_nonfiling, $sql_marc)");

    echo ("Added title '$title' to book $etext_number\n");
  }
}

function capture ($tok, $e) {
  $matches = array ();
  if (preg_match ("/^$tok: (.*)$/im", $e, $matches))
    return $matches[1];
  return null;
}

function process_section ($e) {
  global $db, $filetypes, $compressions, $encodings, $roles, $old_etext_number;
  $etext_number = $pk_author = null;
  $cnt_authors = $updatemode = 0;
  $got_title = 0;

  // try to read etext_number from inputfile
  $etext_number = capture ("Etext-Nr", $e);
  if (empty ($etext_number)) {
    // no etext_number ?
    // try to compute etext_number from directory
    $directory = capture ("directory", $e);
    if (preg_match ("/^(?:\d\/)+(\d{2,5})/", $directory, $matches)) {
      $etext_number = intval ($matches[1]);
      // double-check this
      $dir = etext2dir ($etext_number);
      if (strncmp ("$directory/", $dir, strlen ($dir)))
	$etext_number = null;
    } elseif (preg_match ("/^([1-9])$/", $directory, $matches)) {
      $etext_number = intval ($matches[1]);
    }
  }

  if ($etext_number != $old_etext_number) {
    echo ("----------\n\n");
    $old_etext_number = $etext_number;
  }

  // insert file into files table
  if ($filename = capture ("filename", $e)) {
    $matches = array ();

    $directory     = capture ("directory", $e);
    $mtime         = capture ("mtime", $e);
    $size          = capture ("size", $e);
    $edition       = capture ("edition", $e);
    $filetype      = capture ("filetype", $e);
    $obsoleted     = capture ("obsoleted", $e);
    $encoding      = fix_encoding (capture ("encoding", $e));
    $zipmember     = capture ("Zipmemberfilename", $e);

    /*
    $md5hash       = @pack ("H*", capture ("md5.hex", $e));
    $sha1hash      = @pack ("H*", capture ("sha1.hex", $e));
    $kzhash        = @pack ("H*", capture ("kzhash.hex", $e));
    $ed2khash      = @pack ("H*", capture ("ed2khash.hex", $e));
    $tigertreehash = @pack ("H*", capture ("tigertree.hex", $e));
    */

    $md5hash       = capture ("md5.hex", $e);
    $sha1hash      = capture ("sha1.hex", $e);
    $kzhash        = capture ("kzhash.hex", $e);
    $ed2khash      = capture ("ed2khash.hex", $e);
    $tigertreehash = capture ("tigertree.hex", $e);

    // filetype and encoding
    list ($fk_filetypes, $fk_encodings) = 
      guess_filetype (empty ($zipmember) ? $filename : $zipmember);

    // the encoding is better taken from the file, if present
    if (isset ($encodings[$encoding])) {
      $fk_encodings = $encoding;
    }

    // the filetype is better taken from the file, if present (not used for now)
    // if (!empty ($filetype) && isset ($filetypes[$filetype])) {
    //   $fk_filetypes = $filetype;
    // }

    // compression
    $fk_compressions = 'none';
    if (preg_match ("/^(.*)\.(.*)$/", $filename, $matches)) {
      if (isset ($compressions[strtolower ($matches[2])])) {
	$fk_compressions = strtolower ($matches[2]);
      }
    }
    
    // obsoleted
    if (preg_match ("/\/old(\/|$)/", $directory)) {
      $obsoleted = 1;
    }

    $diskstatus = 0;

    // hide image files
    if (strpos ($directory, "/$etext_number-")) {
      if (in_array ($fk_filetypes, array ("jpg", "png", "gif", "svg", "css", "xsl")))
	$diskstatus = 1;
      if (preg_match ("/\/images(\/|$)/", $directory))
        $diskstatus = 1;
      if (preg_match ("/-h\/files(\/|$)/", $directory))
        $diskstatus = 1;
    }

    $sql_diskstatus      = $db->f ($diskstatus,            SQLINT);
    $sql_fk_filetypes    = $db->f ($fk_filetypes,          SQLCHAR);
    $sql_fk_compressions = $db->f ($fk_compressions,       SQLCHAR);
    $sql_fk_encodings    = $db->f ($fk_encodings,          SQLCHAR);
    $sql_mtime           = $db->f ($mtime,                 SQLDATE);
    $sql_size            = $db->f ($size,                  SQLINT);
    $sql_edition         = $db->f ($edition,               SQLINT);
    $sql_obsoleted       = $db->f ($obsoleted,             SQLINT);
    $sql_etext_number    = $db->f ($etext_number,          SQLINT);
    $sql_filename        = $db->f ("$directory/$filename", SQLCHAR);
    $sql_md5hash         = $db->f ($md5hash,               SQLBYTE);
    $sql_sha1hash        = $db->f ($sha1hash,              SQLBYTE);
    $sql_kzhash          = $db->f ($kzhash,                SQLBYTE);
    $sql_ed2khash        = $db->f ($ed2khash,              SQLBYTE);
    $sql_tigertreehash   = $db->f ($tigertreehash,         SQLBYTE);

    $fields = 
      (empty ($etext_number)    ? "" : "fk_books = $sql_etext_number, ") . 
      (empty ($fk_filetypes)    ? "" : "fk_filetypes = $sql_fk_filetypes, ") .
      (empty ($fk_encodings)    ? "" : "fk_encodings = $sql_fk_encodings, ") .
      (empty ($fk_compressions) ? "" : "fk_compressions = $sql_fk_compressions, ") .
      (empty ($md5hash)         ? "" : "md5hash = $sql_md5hash, ") .
      (empty ($sha1hash)        ? "" : "sha1hash = $sql_sha1hash, ") .
      (empty ($kzhash)          ? "" : "kzhash = $sql_kzhash, ") .
      (empty ($ed2khash)        ? "" : "ed2khash = $sql_ed2khash, ") .
      (empty ($tigertreehash)   ? "" : "tigertreehash = $sql_tigertreehash, ") .
      (empty ($edition)         ? "" : "edition = $sql_edition, ") .
      (empty ($obsoleted)       ? "" : "obsoleted = $sql_obsoleted, ") .
      (empty ($size)            ? "" : "filesize = $sql_size, ") .
      (empty ($mtime)           ? "" : "filemtime = $sql_mtime, ") . 
      "diskstatus = $sql_diskstatus";

    // $fields = rtrim ($fields, ", ");

    $db->BeginTrans ();

    $db->exec ("select pk from files where filename = $sql_filename");
    $newfile = !$db->FirstRow ();

    if ($newfile) {
      $db->exec ("insert into files (filename, diskstatus) values ($sql_filename, 0);");
    } 

    $db->exec ("update files set $fields where filename = $sql_filename");
      
    $db->Commit ();

    echo (($newfile ? "Added" : "Updated") . " file $directory/$filename " . 
       "($sql_etext_number $sql_fk_filetypes $sql_fk_compressions $sql_fk_encodings $sql_diskstatus $sql_obsoleted)\n");
  }

  // maybe insert book into books table
  if (!empty ($etext_number)) {
    $db->BeginTrans ();

    $sql_etext_number = $db->f ($etext_number, SQLINT);
    $db->exec ("select * from books where pk = $sql_etext_number");

    if ($db->FirstRow ()) {
      $updatemode = $db->get ("updatemode", SQLINT); // 0 = auto, 1 = manual
    } else {
      $db->exec ("insert into books (pk) values ($sql_etext_number)");
      echo ("Inserted book $etext_number into database\n");
    }

    if ($updatemode == 0) {
      if ($fk_encodings != "utf-8") {
        iconv_set_encoding ("internal_encoding", "UTF-8");
        $converted = iconv (strtoupper ($fk_encodings), "UTF-8", $e);
        if ($converted !== FALSE) {
          $e = $converted;
        }
      }
      $lines = preg_split ("/\n/", $e);
      foreach ($lines as $line) {
	if (empty ($line)) continue;
	if (!preg_match ("/^(.*?):\s+(.*)$/", $line, $matches))
	  continue;
	list ($dummy, $key, $value) = $matches; // preg_split ("/:\s+/", $line); //FIXME
	if (empty ($value)) continue;

	if (isset ($roles[$key])) {
	  list ($author, $born, $died, $role) = decode_author ($value);
	  $pk_author = insert_author ($author, $born, $died);
	  if ($key != "Author") {
	    $role = $roles[$key];
	  }
	  if ($pk_author) {
	    $sql_fk_authors = $db->f ($pk_author, SQLINT);
	    $sql_fk_roles   = $db->f ($role, SQLCHAR);
	    $db->exec ("select * from mn_books_authors " . 
		       "where fk_books = $sql_etext_number and fk_authors = $sql_fk_authors " . 
		       "and fk_roles = $sql_fk_roles");
	    if (!$db->FirstRow ()) {
	      $db->exec ("insert into mn_books_authors (fk_books, fk_authors, fk_roles) " . 
			 "values ($sql_etext_number, $sql_fk_authors, $sql_fk_roles)");
	      echo ("Added author '$author' role $role to book $etext_number\n");
	    }
	  }
	  $cnt_authors++;
	  continue;
	}
	if ($key == "Title") {
	  insert_title ($etext_number, $value, 245);
          $got_title = 1;
	  continue;
	}
	if ($key == "Alternate Title") {
	  insert_title ($etext_number, $value, 246);
	  continue;
	}
	if ($key == "Contents") {
	  insert_title ($etext_number, $value, 505);
	  continue;
	}
	if ($key == "Language") {
	  $lang = encode_language ($value);
	  if (!empty ($lang)) {
	    $sql_lang = $db->f ($lang, SQLCHAR);
	    $db->exec ("select * from mn_books_langs " . 
		       "where fk_books = $sql_etext_number and fk_langs = $sql_lang");
	    if (!$db->FirstRow ()) {
	      $db->exec ("insert into mn_books_langs (fk_books, fk_langs) " . 
			 "values ($sql_etext_number, $sql_lang)");
	    }
	  }
	  continue;
	}
	if ($key == "Locc") {
	  $sql_locc = $db->f (strtoupper ($value), SQLCHAR);
	  $db->exec ("select * from mn_books_loccs " . 
		     "where fk_books = $sql_etext_number and fk_loccs = $sql_locc");
	  if (!$db->FirstRow ()) {
	    $db->exec ("insert into mn_books_loccs (fk_books, fk_loccs) " . 
		       "values ($sql_etext_number, $sql_locc)");
	  }
	  continue;
	}
	if ($key == "Subject") {
	  $sql_subject = $db->f ($value, SQLCHAR);
	  $db->exec ("select pk from subjects where subject = $sql_subject");
	  if (!$db->FirstRow ()) {
	    $db->exec ("insert into subjects (subject) values ($sql_subject)");
	    $db->exec ("select pk from subjects where subject = $sql_subject");
	  }
	  $pk_subjects = $db->Get ("pk", SQLINT);
	  $sql_fk_subjects = $db->f ($pk_subjects, SQLINT);

	  $db->exec ("select * from mn_books_subjects " . 
		     "where fk_books = $sql_etext_number and fk_subjects = $sql_fk_subjects");
	  if (!$db->FirstRow ()) {
	    $db->exec ("insert into mn_books_subjects (fk_books, fk_subjects) " . 
		       "values ($sql_etext_number, $sql_fk_subjects)");
	  }
	  continue;
	}
	if ($key == "Note") {
	  $sql_note = $db->f ($value, SQLCHAR);
	  $db->exec ("select * from attributes " . 
		     "where fk_books = $sql_etext_number and text = $sql_note");
	  if (!$db->FirstRow ()) {
	    $db->exec ("insert into attributes (fk_books, fk_attriblist, text) values ($sql_etext_number, 500, $sql_note)");
	  }
	  continue;
	}
	if ($key == "Copyright") {
	  $sql_copyrighted = $db->f ($value, SQLINT);
	  $db->exec ("update books set copyrighted = $sql_copyrighted where pk = $sql_etext_number");
	  continue;
	}
	if ($key == "Category") {
	  $sql_category = $db->f ($value, SQLCHAR);
	  $db->exec ("select pk from categories where category = $sql_category");
	  if ($db->FirstRow ()) {
	    $fk_categories = $db->get ("pk", SQLINT);
	    $sql_fk_categories = $db->f ($fk_categories, SQLINT);

	    $db->exec ("select * from mn_books_categories " . 
		       "where fk_books = $sql_etext_number and fk_categories = $sql_fk_categories");
	    if (!$db->FirstRow ()) {
	      $db->exec ("insert into mn_books_categories (fk_books, fk_categories) " . 
			 "values ($sql_etext_number, $fk_categories)");
	    }
	  }
	  continue;
	}
	if ($key == "Release-Date") {
	  if (strpos ($value, ',') === false) {
	    $vale = "1 $value";
	  }
	  $release_date = strtotime ("$value");
	  $sql_release_date = $db->f ($release_date, SQLDATE);
	  $db->exec ("update books set release_date = $sql_release_date where pk = $sql_etext_number"); 
	  continue;
	}
      }

      // hack! makefiles.pl sorts filenames so that 8-bit ones come first
      // this way we prefer titles etc. from 8-bit files over html and 7-bit files
      if ($got_title) {
        $db->exec ("update books set updatemode = 1 where pk = $sql_etext_number");
      }

      $db->Commit ();
    }
  }
}

register_shutdown_function ('rollback_transaction');
set_time_limit (0);

$buffer = "";
if ($hd = fopen ($importfilename, "r")) {
  while (!feof ($hd)) {
    $line = fgets ($hd);
    if (preg_match ("/^---*[\r\n]*$/", $line)) {
      process_section ($buffer);
      $buffer = "";
      echo ("\n"); flush ();
    } else {
      $buffer .= $line;
    }
  }
  process_section ($buffer);
  fclose ($hd);
}

?>
