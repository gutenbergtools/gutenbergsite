<?php

// config section
$pagesize = 100;
$max_results = 1000;
$max_ft_results = 5000;

// gbn 20200203: Need to set this differently than the old site:
set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/private/lib/php");
include_once ("pgcat.phh");

$db = $config->db ();
// gbn 20200203: not sure where rate_limit is:
// rate_limit ();
// userobots ();

pageheader ("Search on Titles &gt; Results");
privatecache ();

$db2 = $config->db ();
$dofulltext = false;

// For debugging:
// $time_start  = getmicrotime ();
// $time_query1 = getmicrotime ();
// $time_query2 = getmicrotime ();

function getall ($db, $field, $filterfunc = null) {
  $f = array ();
  $g = array ();
  if ($db->FirstRow ()) {
    do {
      if (!$filterfunc || $filterfunc ($db)) {
	$f[] = $db->get ($field, SQLCHAR);
      } else {
	$g[] = $db->get ($field, SQLCHAR);
      }
    } while ($db->NextRow ());
  }
  return array ($f, $g);;
}

function mkurl ($fields) {
  $u = array ();
  foreach ($fields as $f) {
    if (!empty ($_REQUEST[$f])) {
      $u[] = "$f=" . urlencode ($_REQUEST[$f]);
    }
  }
  return join ("&amp;", $u);
}

class CalcFieldAuthorDateRoleLink {
  function f ($db) {
    global $config;
    $fk_authors = $db->get ("fk_authors", SQLINT);
    $author     = $db->get ("author",     SQLCHAR);
    $page = find_browse_page ($author);
    return "<a href=\"/browse/authors/$page#a$fk_authors\">" . 
      FormatAuthorDateRole ($db) . "</a>";
  }
}

class BooksTable extends ListTable {
  function BooksTable () {
    global $dofulltext, $config;
    $this->AddSimpleColumn ("fk_books", "Etext-No.", "narrow right");
    $this->AddSimpleColumn ("c_audioicon", "<img src=\"/pics/stock_volume-16.png\" width=\"16\" height=\"16\" alt=\"Audio\" title=\"Audio Book\"$config->endtag>", "narrow");
    $this->AddSimpleColumn ("c_author", "Author", "pgdbdataauthor");
    $this->AddColumn ("<a href=\"/ebooks/#fk_books#\">#c_title#</a>", "Title", "pgdbdatatitle");
    $this->AddSimpleColumn ("lang", "Language", "narrow");
    if ($dofulltext) {
      $this->AddSimpleColumn ("", "Fulltext Context", "narrow");
    }
  }

  function PrintRow ($db) {
    global $dofulltext, $fulltext, $config, $db2, $fk_files;
    // print out a row of the table (w/o <tr> tags)

    $pk = $db->get ("pk", SQLINT);

    echo ("<td>$pk</td>");

    $db2->exec ("select * from mn_books_categories where fk_books = $pk and fk_categories <= 2");
    if ($db2->FirstRow ()) {
      echo ("<td><img src=\"/pics/stock_volume-16.png\" width=\"16\" height=\"16\" alt=\"Audio\" title=\"Audio Book\"$config->endtag></td>");
    } else {
      echo ("<td>&nbsp;</td>");
    }

    $db2->exec ("select * from v_books_authors where fk_books = $pk order by heading, role, author");
    $db2->calcfields ["c_author"] = new CalcFieldAuthorDateRoleLink ();

    echo ("<td>");
    list ($a, $b) = getall ($db2, "c_author", 
			    create_function ('$db', 'return $db->get ("heading", SQLINT) == 1;'));
    echo (join ("<br$config->endtag>", $a));

    if (count ($b)) {
      echo ("<ul><li>");
      echo (join ("</li>\n<li>", $b));
      echo ("</li></ul>");
    }
    echo ("</td>");

    $db2->exec ("select text, fk_attriblist from attributes " . 
		"where fk_books = $pk order by fk_attriblist, substr (attributes.text, attributes.nonfiling + 1)");
    $db2->calcfields ["c_title"] = new CalcFieldTitle ();

    echo ("<td>");
    list ($a, $b) = getall ($db2, "c_title", 
			    create_function ('$db', 'return in_array 
                                            ($db->get ("fk_attriblist", SQLINT), array (240, 245, 246));'));
    echo ("<a href=\"/ebooks/$pk\">" . join ("<br$config->endtag>", $a)  . "</a>");
    echo ("</td>");

    $db2->exec ("select * from mn_books_langs, langs " . 
                "where fk_books = $pk and mn_books_langs.fk_langs = langs.pk order by lang");
    list ($a, $b) = getall ($db2, "lang");
    echo ("<td>" . join (" ", $a) . "</td>");

    if ($dofulltext) {
      $fks = "fk_files[]=" . join ("&amp;fk_files[]=", $fk_files[$pk]);
      $url = "fulltext-context?fulltext=" . urlencode ($fulltext) . "&amp;$fks";
      echo ("<td><a href=\"$url\">Context</a></td>\n");
    }
  }
}

getstr ("author");
getstr ("title");
getstr ("subject");
getstr ("lang");
getstr ("locc");
getint ("category");
getstr ("filetype");
getstr ("filemtime");
getint ("etextnr");
getstr ("fulltext");
getint ("pageno");

if (isset ($author)) {
  $author = str_replace ("_", " ", $author);
}
if (isset ($title)) {
  $title  = str_replace ("_", " ", $title);
}

if (isset ($filemtime)) {
  list ($year, $month, $day, $hour, $minute, $second) = sscanf ($filemtime, "%d-%d-%d %d:%d:%d");
  $filemtime = mktime ($hour, $minute, $second, $month, $day, $year);
}

// check if we can redirect to a browse page
// this we can always do if the user selects just one search item

$selections = 0;
$location = null;

if (isset ($etextnr)) {
  $selections++;
  $location = "ebooks/$etextnr";
}
if (isset ($filetype)) { 
  $selections++;
}
if (isset ($filemtime)) { 
  $selections++;
}
if (isset ($lang)) { 
  $selections++;
  $location = "browse/languages/$lang";
}
if (isset ($locc)) { 
  $selections++;
  $location = "browse/loccs/" . strtolower ($locc);
}
if (isset ($category)) {
  $selections++;
  $location = "browse/categories/$category";
}
if (isset ($author)) {
  $selections++;
//  $location = "author/$author";
}
if (isset ($title)) { 
  $selections++;
}
if (isset ($subject)) { 
  $selections++;
}
if (isset ($fulltext)) {
  $selections++;
}
if ($selections == 1) {
  // the user selected just one thing
  if (isset ($location)) {
    // and there is a static page listing just that
    http_redirect ("/$location");
    exit;
  }
}

if ($selections == 0) {
  p ("<a href=\"/ebooks\">New Search</a> &mdash; You didn't select anything!");
  pagefooter ();
  exit;
}

// user selected more than one thing

// note: we are dealing with UTF-8 encoded strings !
// strtolower etc. don't work !
// explode on ' ' works. 

$sqland   = array ();
$yousel   = array ();
$pks      = array ();
$fk_files = array ();
$pkcnt    = 0;

function merge (&$a) {
  global $pks;
  if (count ($pks)) {
    $pks = array_intersect ($pks, $a);
  } else {
    $pks = $a;
  }
  if (!count ($pks)) {
    p ("No record found. Please retry.");
    pagefooter ();
    exit ();
  }
}

function getpks () {
  global $db, $pks, $pkcnt;
  $a = array ();
  if ($db->FirstRow ()) {
    do {
      $pk = $db->get ("fk_books", SQLINT);
      if ($pk)
	$a[$pk] = "$pk";
    } while ($db->NextRow ());
  }
  $pkcnt = count ($a);
  merge ($a);
}

function yousel ($what) {
  global $yousel, $pkcnt;
  $yousel[] = "$what ($pkcnt books match)";
}

// fast queries first, so we can bail out soon if nothing found

if (isset ($etextnr)) {
  $sql_etextnr = $db->f ($etextnr, SQLINT);
  $db->exec ("select pk as fk_books from books where pk = $sql_etextnr");
  getpks ();
  yousel ("Etext-No. = $etextnr");
}
if (isset ($filetype)) { 
  $sql_filetype = $db->f ($filetype, SQLCHAR);
  $db->exec ("select fk_books from files where fk_filetypes = $sql_filetype");
  getpks ();
  yousel ("Filetype = $filetype");
}
if (isset ($filemtime)) { 
  $sql_filemtime = $db->f ($filemtime, SQLDATE);
  $db->exec ("select fk_books from files where filemtime >= $sql_filemtime");
  getpks ();
  yousel ("Book Modified Since: " . date ("Y-m-d H:i:s", $filemtime));
}
if (isset ($locc)) {
  if ($locc=="nolocc") {
    if (is_maintainer ()) {
      $db->exec ("select books.pk as fk_books from books left join mn_books_loccs on books.pk=mn_books_loccs.fk_books where fk_loccs is null");
      getpks ();
      yousel ("LoC Class = No LoCC");
    } else {
      yousel ("LoC Class = No LoCC (Only available to Catalog Editors, sorry.)");
    }
  } else {  
    $sql_locc = $db->f ($locc, SQLCHAR);
    $db->exec ("select fk_books from mn_books_loccs where fk_loccs = $sql_locc");
    getpks ();
    yousel ("LoC Class = $locc");
  }
}
if (isset ($lang)) { 
  $sql_lang = $db->f ($lang, SQLCHAR);
  $db->exec ("select lang from langs where pk = $sql_lang");
  if ($db->FirstRow ()) {
    $lang = $db->Get ("lang", SQLCHAR);
    $db->exec ("select fk_books from mn_books_langs where fk_langs = $sql_lang");
    getpks ();
    yousel ("Language = $lang");
  }
}
if (isset ($category)) {
  $sql_category = $db->f ($category, SQLINT);
  $db->exec ("select category from categories where pk = $sql_category");
  if ($db->FirstRow ()) {
    $category = $db->Get ("category", SQLCHAR);
    $db->exec ("select fk_books from mn_books_categories where fk_categories = $sql_category");
    getpks ();
    yousel ("Category = $category");
  }
}
if (isset ($author)) {
  foreach (explode (" ", $author) as $tmp) {
    $sql_author = $db->f ("%$tmp%", SQLCHAR);
    $db->exec ("select fk_books from authors inner join mn_books_authors on authors.pk = mn_books_authors.fk_authors where author ilike $sql_author or pk in (select fk_authors from aliases where alias ilike $sql_author)");
    getpks ();
    yousel ("Author = $tmp");
  }
}
if (isset ($title)) { 
  foreach (explode (" ", $title) as $tmp) {
    $sql_title = $db->f ("%$tmp%", SQLCHAR);
    $db->exec ("select fk_books from attributes where fk_attriblist in (240, 245, 246, 505) and text ilike $sql_title");
    getpks ();
    yousel ("Title = $tmp");
  }
}
if (isset ($subject)) { 
  if ($subject=="&quot;&quot;") {
    if (is_maintainer ()) {
      $db->exec ("select books.pk as fk_books from books left join mn_books_subjects on books.pk=mn_books_subjects.fk_books where fk_subjects is null");
      getpks ();
      yousel ("Subject = \"\" (No Subject)");
    } else {
      yousel ("Subject = \"\" (No Subject) " .
	      "(Only available to Catalog Editors, sorry.)");
    }
  } else {  
    foreach (explode (" ", $subject) as $tmp) {
      $sql_subject = $db->f ("%$tmp%", SQLCHAR);
      $db->exec ("select fk_books from subjects inner join mn_books_subjects on subjects.pk = mn_books_subjects.fk_subjects where subject ilike $sql_subject");
      getpks ();
      yousel ("Subject = $tmp");
    }
  }
}

if (isset ($fulltext)) {
  // get rid of &quot;
  $fulltext = html_entity_decode ($fulltext);
  $query = escapeshellarg (utf8_decode ($fulltext));

  $hd = popen ("/public/vhost/g/gutenberg/private/local/bin/swish-e " . 
	       "-f /public/vhost/g/gutenberg/private/swish-data/index.swish-e " . 
	       "-w $query", "r");

  $stopwords = "";
  $ftpks = array ();
  if ($hd) {
    while (!feof ($hd)) {
      $line = trim (fgets ($hd));
      if (strlen ($line) && $line{0} == '#') {
	if (preg_match ("/^# Number of hits: (\d+)/", $line, $matches)) {
	  continue;
	}
        if (!strncmp ($line, "# Removed stopwords: ", 21)) {
	  $stopwords = substr ($line, 21);
	  continue;
	}
        if (!strncmp ($line, "# Indexed on: ", 14)) {
	  // needs -H2 to turn on
	  $indexed_on = substr ($line, 14);
	  continue;
	}
	continue;
      }
      if (preg_match ("/^(\d+)\s+(\d+)\/(\d+)\//", $line, $matches)) {
	// line format: rank fk_books/fk_files/...
	$fk_books_tmp = $matches [2];
	$ftpks[intval ($fk_books_tmp)] = $fk_books_tmp;
        // an ebook can have more than one file
        // eg. part1.html, part2.html etc.
	$fk_files[$fk_books_tmp][] = $matches [3];
      }
    }
    pclose ($hd);
  }
  $pkcnt = count ($ftpks);
  $yousel[] = "Full Text = " . htmlspecialchars ($fulltext) . " ($pkcnt books match)" . 
    (empty ($stopwords) ? "" : 
     "<br$config->endtag>Note: following words were removed from your " . 
     "full text search: <em>$stopwords</em>.");

  merge ($ftpks);
  $dofulltext = 1;
}

$bcnt = count ($pks);
if ($bcnt > $max_results) {
  p ("More than $max_results books matched your search. Please refine your query.");
  pagefooter ();
  return;
}

p ("<a href=\"/ebooks\">New Search</a>");
if ($yousel) {
  p ("You selected:");
  echo ("<ul><li>" . implode ("</li><li>", $yousel) . "</li></ul>\n");
}

// flush (); flushes headers too :-(

// For debugging:
// $time_query1 = getmicrotime ();

$where  = "books.pk in (" . implode (", ", $pks) . ")";
$offset = $pageno * $pagesize;

// this will turn our unsorted list of books 
// into a sorted list of headings
// note: there may be more (or less) headings than books

$sql = "select books.pk from (books 
left join v_books_authors on books.pk = fk_books and heading = 1)
left join attributes on books.pk = attributes.fk_books
where attributes.fk_attriblist = 245 and 
$where order by author, substr (attributes.text, attributes.nonfiling + 1), 
books.pk offset $offset";

// echo ($sql);

$db->exec ($sql);

// For debugging:
// $time_query2 = getmicrotime ();

$hcnt = $db->CountRows ();

$s = ($bcnt > 1) ? "s" : "";
$note = ($hcnt > $bcnt) ? 
"Note: in the following table some books are listed under more than one heading." : "";

p ("$bcnt book$s found. $note");
  
$pl = "";
$pages = intval (($offset + $hcnt - 1) / $pagesize) + 1;
if ($pages > 1) {
  $url = mkurl (array ("author", "title", "subject", "lang", "category", 
                       "locc", "filetype", "filemtime", "etextnr", "fulltext"));
  $p = $pageno - 1;
  $previous = $pageno ? "<a href=\"results?$url&amp;pageno=$p\">previous</a>" : "";
  $p = $pageno + 1;
  $next = ($p < $pages) ? "<a href=\"results?$url&amp;pageno=$p\">next</a>" : "";

  $pagelinks[] = "$previous ";
  for ($i = 0; $i < $pages; $i++) {
    if ($i == $pageno) {
      $pagelinks[] = "<span class=\"red\">$i</span> ";
    } else {
      $pagelinks[] = "<a href=\"results?$url&amp;pageno=$i\">$i</a> ";
    }
  }
  $pagelinks[] = $next;
  $pl = "<p class=\"center resultpages\">" . join (" ", $pagelinks) . "</p>\n\n";
}

// For debugging:
// $time_end = getmicrotime ();
// $time = $time_end - $time_start;

echo ($pl);

$table = new BooksTable ();
$table->limit = $pagesize;
$table->PrintTable ($db, "Titles", "pgdbfiles");

echo ($pl);

// For debugging purposes:
// $time_end = getmicrotime ();
// 
// $time1 = $time_query1 - $time_start;
// $time2 = $time_query2 - $time_query1;
// $time3 = $time_end    - $time_query2;
// $time  = $time_end    - $time_start;
// p ("Processing time: $time ($time1 + $time2 + $time3) seconds");

pagefooter ();

?>
