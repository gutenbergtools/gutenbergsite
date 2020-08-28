<?php

// todo: 
// subject pages

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

$lang_thres = 50;
setlocale (LC_ALL, 'en_US.utf8');

$config->page_encoding = "UTF-8";

function _navbar ($what, $dir) {
  global $config;
  $nav = "  <p>$what:\n";
  foreach ($config->browse_pages as $caption => $regexp) {
    $href = strtolower ($caption);
    $nav .= "    <a href=\"/$dir/$href\">$caption</a>&nbsp;\n";
  }
  $nav .= "  </p>\n";
  return $nav;
}

function _navbarrecent ($what, $dir) {
  global $spans;
  $nav .= "  <p>$what:\n";
  foreach ($spans as $href => $caption) {
    $nav .= "    <a href=\"/$dir/last$href\">$caption</a>&nbsp;\n";
  }
  $nav .= "  </p>\n";
  return $nav;
}

function _navbarlangs ($what, $where, $dir) {
  global $db;
  $nav = "  <p>$what:\n";
  $db->Exec ("select pk, lang, cnt from langs join (select fk_langs, count (fk_langs) as cnt from mn_books_langs group by fk_langs having count (fk_langs) $where) as sums on pk = fk_langs order by lang;");
  if ($db->FirstRow ()) {
    do {
      $pk   = strtolower ($db->Get ("pk",   SQLCHAR));
      $lang = $db->Get ("lang", SQLCHAR);
      $cnt  = $db->Get ("cnt",  SQLINT);
      $nav .= "    <a href=\"/$dir/$pk\" title=\"$lang ($cnt)\">$lang</a>&nbsp;\n";
    } while ($db->NextRow ());
  }
  $nav .= "  </p>\n";
  return $nav;
}
    
function _navbarloccs ($what, $dir) {
  global $db;
  $nav = "  <p>$what:\n";
  $db->Exec ("select pk, locc, cnt from loccs join (select fk_loccs, count (fk_loccs) as cnt from mn_books_loccs group by fk_loccs) as sums on pk = fk_loccs order by fk_loccs;");
  if ($db->FirstRow ()) {
    do {
      $pk   = strtolower ($db->Get ("pk",   SQLCHAR));
      $pku  = strtoupper ($pk);
      $locc = $db->Get ("locc", SQLCHAR);
      $cnt  = $db->Get ("cnt",  SQLINT);
      $nav .= "    <a href=\"/$dir/$pk\" title=\"$locc ($cnt)\">$pku</a>&nbsp;\n";
    } while ($db->NextRow ());
  }
  $nav .= "  </p>\n";
  return $nav;
}
    
function _navbarcategories ($what, $dir) {
  global $db;
  $nav = "  <p>$what:\n";
  $db->Exec ("select pk, category, cnt from categories join (select fk_categories, count (fk_categories) as cnt from mn_books_categories group by fk_categories) as sums on pk = fk_categories order by category;");
  if ($db->FirstRow ()) {
    do {
      $pk       = $db->Get ("pk",       SQLINT);
      $category = $db->Get ("category", SQLCHAR);
      $cnt      = $db->Get ("cnt",      SQLINT);
      $nav .= "    <a href=\"/$dir/$pk\" title=\"$category ($cnt)\">$category</a>&nbsp;\n";
    } while ($db->NextRow ());
  }
  $nav .= "  </p>\n";
  return $nav;
}
    
function navbar () {
  global $dir_authors, $dir_titles, $dir_langs, $dir_loccs, $dir_categories, $dir_recent, $lang_thres;
  $nav  = "<div class=\"pgdbnavbar\">\n";
  $nav .= _navbar       ("Authors",   $dir_authors);
  $nav .= _navbar       ("Titles",    $dir_titles);
  $nav .= _navbarlangs  ("Languages with more than $lang_thres books", "> $lang_thres", $dir_langs);
  $nav .= _navbarlangs  ("Languages with up to $lang_thres books", "<= $lang_thres", $dir_langs);
  //  $nav .= _navbarloccs  ("LoC Class", $dir_loccs);
  $nav .= _navbarcategories ("Special Categories", $dir_categories);
  $nav .= _navbarrecent     ("Recent",     $dir_recent);
  $nav .= "</div>\n\n"; 
  return $nav;
}
    
function pagefooterfile ($file) {
  global $page;
  $page->footer ();

  $output = ob_get_contents ();
  ob_clean ();

  $hd = fopen ($file, "w");
  if ($hd) {
    fwrite ($hd, $output);
    fclose ($hd);
  }

  $hd = gzopen ("$file.gzip", "w9");
  if ($hd) {
    gzwrite ($hd, $output);
    gzclose ($hd);
  }
}

function LoadTitles () {
  global $db, $authors;

  foreach ($authors as $fk_authors => $dummy) {
    $authors[$fk_authors]['titles'] = array ();
    //    echo ("$fk_authors\n");
  }
  if ($db->FirstRow ()) {
    do {
      $o = array ();
      $fk_authors    = $db->get ("fk_authors", SQLINT);
      if (empty ($fk_authors))
        $fk_authors = 0;
      // echo ("fk_authors: $fk_authors\n");
      $o['title']    = str_replace ("\n", "<br$config->endtag>", 
                                    strip_marc_subfields (htmlspecialchars ($db->get ("title", SQLCHAR))));
      $o['lang']     = $db->get ("lang",     SQLCHAR);
      $o['etext']    = $db->get ("fk_books", SQLINT);
      $o['is_audio'] = $db->get ("is_audio", SQLBOOL);
      $o['role']     = $db->get ("role",     SQLCHAR);
      array_push ($authors[$fk_authors]['titles'], $o);
    } while ($db->NextRow ());
  }
}

function pklist ($aa) {
  // make a list of all authors with titles
  $pklist = array ();
  foreach ($aa as $fk_authors => $o) {
    if (count ($o['titles'])) {
      $pklist[] = $fk_authors;
    }
  }
  return $pklist;
}

function FormatAliases ($pklist, $mode = 0, $regex = "") {
  global $db, $lines, $authors;

  if (count ($pklist) == 0)
    return;

  $list = join (",", $pklist);
  $db->exec ("select fk_authors, alias from aliases " . 
             "where aliases.alias_heading = 1 and fk_authors in ($list)");

  if ($db->FirstRow ()) {
    do {
      $fk_authors = $db->get ("fk_authors", SQLINT);
      $alias      = $db->get ("alias", SQLCHAR);
      $author     = $authors[$fk_authors]['author'];
      if ($mode == 1) {
        if (!preg_match ("/$regex/i", $alias)) 
          continue;
        // the by-author pages need a different url
        $href       = find_browse_page ($author) . "#a$fk_authors";
      } else {
        $href       = "#a$fk_authors";
      }
      $html_alias  = htmlspecialchars ($alias);
      $html_author = htmlspecialchars ($author);
      $lines[$alias] = "<h2>$html_alias</h2>\n<p>See: <a href=\"$href\">$html_author</a></p>\n\n";
      // echo ("$alias\n");
    } while ($db->NextRow ());
  }
}

function FormatAuthors ($mode = 0) {
  global $db, $lines, $dir_etext, $authors;

  foreach ($authors as $fk_authors => $o) {
    if (count ($o['titles'])) {
      $html_author = htmlspecialchars ($o['author']);
      if ($mode == 1 || $fk_authors == 0) {
        $line = "<h2><a name=\"a$fk_authors\">$html_author</a> <a href=\"#a$fk_authors\" title=\"Link to this author\">¶</a></h2>\n";
      } else {
        $href = "/browse/authors/" . find_browse_page ($o['author']) . "#a$fk_authors";
        $line = "<h2><a name=\"a$fk_authors\"></a><a href=\"$href\">$html_author</a></h2>\n";
      }
      $line .=  "<ul>\n";

      if ($mode == 1) {
        // by-author page
        if (isset ($o['aliases'])) {
          foreach ($o['aliases'] as $alias) {
            $line .= "  <li class=\"pgdbalias\">$alias</li>\n";
          } 
        }
      
        if (isset ($o['urls'])) {
          foreach ($o['urls'] as $description => $url) {
            $line .= "  <li class=\"pgdbxlink\"><a href=\"$url\">$description</a></li>\n";
          } 
        }
      }
      
      // output list of titles
      foreach ($o['titles'] as $t) {
        $role = (empty ($t['role']) || $t['role'] == "Creator") ? "" : " (as {$t['role']})";
        $cls = $t['is_audio'] ? " class=\"pgdbaudio\"" : " class=\"pgdbetext\"";
        $line .= "  <li$cls><a href=\"/$dir_etext/{$t['etext']}\">{$t['title']}</a> ({$t['lang']})$role</li>\n";
      }
      $line .= "</ul>\n\n";
      $lines[$o['author']] = $line;
      // echo ("{$o['author']}\n");
    }
  }
}

$dir            = "browse";
$dir_authors    = "$dir/authors";
$dir_titles     = "$dir/titles";
$dir_langs      = "$dir/languages";
$dir_loccs      = "$dir/loccs";
$dir_subjects   = "$dir/subjects";
$dir_categories = "$dir/categories";
$dir_recent     = "$dir/recent";
$dir_feeds      = "cache/epub/feeds";
$dir_etext      = "ebooks";
$base_url       = "http://$config->domain";

@mkdir ("$config->documentroot/$dir",            0755);
@mkdir ("$config->documentroot/$dir_authors",    0755);
@mkdir ("$config->documentroot/$dir_titles",     0755);
@mkdir ("$config->documentroot/$dir_langs",      0755);
@mkdir ("$config->documentroot/$dir_loccs",      0755);
@mkdir ("$config->documentroot/$dir_subjects",   0755);
@mkdir ("$config->documentroot/$dir_categories", 0755);
@mkdir ("$config->documentroot/$dir_recent",     0755);
@mkdir ("$config->documentroot/$dir_feeds",      0755);

$spans[1]  = 'last 24 hours';
$spans[7]  = 'last 7 days';
$spans[30] = 'last 30 days';

$db  = $config->db ();
$db2 = $config->db ();
$authors = array ();

////////////////////////////////////////////////////////////////////////
// load authors

$authors[0]['author'] = "No Author Listed";

$db->exec ("select * from authors");
if ($db->FirstRow ()) {
  do {
    $fk_authors = $db->get ("pk", SQLINT);
    $authors[$fk_authors]['author'] = FormatAuthorDate ($db);
  } while ($db->NextRow ());
}

$db->exec ("select * from aliases where alias_heading = 1 order by alias");
if ($db->FirstRow ()) {
  do {
    $fk_authors = $db->get ("fk_authors", SQLINT);
    $alias      = htmlspecialchars ($db->get ("alias",      SQLCHAR));
    $authors[$fk_authors]['aliases'][] = $alias;
  } while ($db->NextRow ());
}

$db->exec ("select * from author_urls order by description");
if ($db->FirstRow ()) {
  do {
    $fk_authors = $db->get ("fk_authors", SQLINT);
    $description = htmlspecialchars ($db->get ("description", SQLCHAR));
    $url         = htmlspecialchars ($db->get ("url",         SQLCHAR));
    $authors[$fk_authors]['urls'][$description] = $url;
  } while ($db->NextRow ());
}

// echo ("$config->documentroot/$dir/navbar.html\n");
if ($hd = fopen ("$config->documentroot/$dir/navbar.html", "w")) {
  fputs ($hd, navbar ());
  fclose ($hd);
}

////////////////////////////////////////////////////////////////////////////////

$db->exec ("create temporary table tmp_books as select * from v_books");

////////////////////////////////////////////////////////////////////////////////
// by-author

// Postgres 7.3.3 at ibiblio doesn't dig multicolumn functional indexes
$db->exec ("create index tmp_ix_books_authors on tmp_books (lower (author))");

foreach ($config->browse_pages as $caption => $regexp) {

  // titles for each author
  $db->exec ("select * from tmp_books where author ~* '^$regexp' " . 
             "order by author, filing, lang");
  LoadTitles ();

  $lines = array ();
  FormatAuthors (1);

  $pklist = array ();
  $db->exec ("select fk_authors from aliases where alias ~* '^$regexp'");
  if ($db->FirstRow ()) {
    do {
      $pklist[] = $db->get ("fk_authors", SQLINT);
    } while ($db->NextRow ());
  }
  FormatAliases ($pklist, 1, "^$regexp");
  uksort ($lines, 'strcoll');

  $fn = strtolower ($caption);

  pageheader ("Browse By Author: $caption");
  echo (navbar ());
  echo ("<div class=\"pgdbbyauthor\">\n\n");

  foreach ($lines as $line) {
    echo ($line);
  }

  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_authors/$fn.html.utf8");
}

////////////////////////////////////////////////////////////////////////////////
// by-lang

$db->exec ("create index tmp_ix_books_langs on tmp_books (lang)");

$db->exec ("select pk, lang from langs where pk in (select fk_langs from mn_books_langs)");

if ($db->FirstRow ()) {
  do {
    $langs[$db->get ("lang", SQLCHAR)] = $db->get ("pk", SQLCHAR);
  } while ($db->NextRow ());
}

foreach ($langs as $lang => $id) {
  $caption = $lang;
  $fn = $id;

  if ($id == 'en') {
    pageheader ("Browse By Language: $caption");
    echo (navbar ());
    echo ("<p>There are too many english books to list them in one page. " . 
          "Please use the Browse-By-Author pages instead.</p>\n\n");
    pagefooterfile ("$config->documentroot/$dir_langs/$fn.html.utf8");
    continue;
  }

  $db->exec ("select * from tmp_books where fk_books in 
(select fk_books from mn_books_langs where fk_langs = '$id' 
and tmp_books.fk_books = mn_books_langs.fk_books) 
order by lang, author, filing");

  LoadTitles ();

  $lines = array ();
  FormatAuthors ();
  FormatAliases (pklist ($authors));
  uksort ($lines, 'strcoll');

  pageheader ("Browse By Language: $caption");
  echo (navbar ());
  echo ("<div class=\"pgdbbylanguage\">\n\n");

  foreach ($lines as $line) {
    echo ($line);
  }

  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_langs/$fn.html.utf8");
}

////////////////////////////////////////////////////////////////////////////////
// by-locc

$db->exec ("select pk, locc from loccs where pk in (select fk_loccs from mn_books_loccs)");

if ($db->FirstRow ()) {
  do {
    $loccs[$db->get ("locc", SQLCHAR)] = $db->get ("pk", SQLCHAR);
  } while ($db->NextRow ());
}

foreach ($loccs as $locc => $fk_loccs) {
  $caption = $locc;
  $fn = strtolower ($fk_loccs);

  // titles for each author
  // $db->exec ("select * from tmp_books where fk_loccs = '$fk_loccs' " . 
  //           "order by fk_loccs, author, filing");
  $db->exec ("select * from tmp_books where fk_books in 
(select fk_books from mn_books_loccs where fk_loccs = '$fk_loccs'
and tmp_books.fk_books = mn_books_loccs.fk_books) 
order by author, filing");

  LoadTitles ();

  $lines = array ();
  FormatAuthors ();
  FormatAliases (pklist ($authors));
  uksort ($lines, 'strcoll');

  pageheader ("Browse By Library of Congress Class: $caption");
  echo (navbar ());
  echo ("<div class=\"pgdbbylocc\">\n\n");

  foreach ($lines as $line) {
    echo ($line);
  }

  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_loccs/$fn.html.utf8");
}

////////////////////////////////////////////////////////////////////////////////
// by-category

$db->exec ("select pk, category from categories");

if ($db->FirstRow ()) {
  do {
    $categories[$db->get ("category", SQLCHAR)] = $db->get ("pk", SQLINT);
  } while ($db->NextRow ());
}

foreach ($categories as $category => $id) {
  $caption = $category;
  $fn = $id;

  if ($id == 0) {
    pageheader ("Browse By Category: $caption");
    echo (navbar ());
    echo ("<p>There are too many books in this category too list them in one page. " . 
          "Please use the Browse-By-Author pages instead.</p>\n\n");
    pagefooterfile ("$config->documentroot/$dir_langs/$fn.html.utf8");
    continue;
  }

  $db->exec ("select * from tmp_books where fk_books in 
(select fk_books from mn_books_categories where fk_categories = $id 
and tmp_books.fk_books = mn_books_categories.fk_books) 
order by author, filing");
  LoadTitles ();

  $lines = array ();
  FormatAuthors ();
  FormatAliases (pklist ($authors));
  uksort ($lines, 'strcoll');

  pageheader ("Browse By Category: $caption");
  echo (navbar ());
  echo ("<div class=\"pgdbbycategory\">\n\n");

  foreach ($lines as $line) {
    echo ($line);
  }

  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_categories/$fn.html.utf8");
}

////////////////////////////////////////////////////////////////////////////////
// by-title

$db->exec ("create index tmp_ix_books_titles on tmp_books (lower (filing))");

foreach ($config->browse_pages as $caption => $regexp) {
  $fn = strtolower ($caption);
  pageheader ("Browse By Title: $caption");
  echo (navbar ());
  echo ("<div class=\"pgdbbytitle\">\n\n");

    // titles
  $db->exec ("select * from tmp_books where lower (filing) ~ '^$regexp' order by lower (filing), author, lang");

  if ($db->FirstRow ()) {
    do {
      $etext      = $db->get ("fk_books", SQLINT);
      $fk_authors = $db->get ("fk_authors", SQLINT);
      $title      = str_replace ("\n", "<br$config->endtag>", $db->get ("title", SQLCHAR));
      $author     = $db->get ("author",   SQLCHAR);
      $lang       = $db->get ("lang",     SQLCHAR);
      $is_audio   = $db->get ("is_audio", SQLBOOL);
      // echo ("$title\n");
      $icon = $is_audio ? " <img class=\"pgdbflag\" src=\"/pics/stock_volume-16.png\" alt=\"Audio Book\" title=\"Audio Book\"$config->endtag>" : "";
      echo ("<h2><a href=\"/$dir_etext/$etext\">$title</a> ($lang)$icon</h2>\n");
      $href = "/$dir_authors/" . find_browse_page ($author) . "#a$fk_authors";
      echo ("<p>by <a href=\"$href\">$author</a></p>\n\n");
    } while ($db->NextRow ());
  }

  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_titles/$fn.html.utf8");
}

////////////////////////////////////////////////////////////////////////////////
// recent books

$db->exec ("create index tmp_ix_books_fk_books on tmp_books (fk_books)");
$rssbuffer = "";
$books_output = array ();

// clear titles
foreach ($authors as $fk_authors => $dummy) {
  $authors[$fk_authors]['titles'] = array ();
}

foreach ($spans as $span => $caption) {

  $recents = array ();
  $cutoff  = date ("Y-m-d", time () - $span * 86400);

  $db->exec ("select distinct fk_books from files " . 
	     "where fk_books is not null and diskstatus = 0 and filename !~ '^cache' and filemtime >= '$cutoff 00:00:00'");
  if ($db->FirstRow ()) {
    do {
      $recents[] = $db->get ("fk_books", SQLINT);
    } while ($db->NextRow ());
  }

  $lines = array ();

  if (count ($recents)) {
    $recent = join (", ", $recents);

    // titles for each author
    $db->exec ("select * from tmp_books where fk_books in ($recent) order by author, filing, lang");
    LoadTitles ();

    FormatAuthors ();
    FormatAliases (pklist ($authors));
    uksort ($lines, 'strcoll');
  }

  $config->htmlheaderlinks[] = "<link rel=\"alternate\" type=\"application/rss+xml\" title=\"RSS-Feed of Project Gutenberg Recently Posted or Updated EBooks\" href=\"http://www.gutenberg.org/$dir_feeds/today.rss\">";
  pageheader ("Books Posted or Updated Since: $cutoff");
  echo (navbar ());
  echo ("<div class=\"pgdbrecent\">\n\n");

  if (!count ($recents)) {
    echo ("<p>No books posted.</p>\n\n");
  }
  foreach ($lines as $line) {
    echo ($line);
  }
  if ($span == 1) {
    // build rss
    foreach ($authors as $author => $o) {
      if (count ($o['titles'])) {
        // output list of titles
        foreach ($o['titles'] as $t) {
          // avoid duplicates in rss
          if (!isset ($books_output[$t['etext']])) {
            $books_output[$t['etext']] = 1;
            $friendlytitle = htmlspecialchars (friendlytitle ($t['etext'], 100));
            $rssbuffer .= "    <item>\n";
            $rssbuffer .= "      <title>$friendlytitle</title>\n";
            $rssbuffer .= "      <link>$base_url/$dir_etext/{$t['etext']}</link>\n";
            $rssbuffer .= "      <description>Language: {$t['lang']}</description>\n";
            $rssbuffer .= "    </item>\n\n";
          }
        }
      }
    }
  }
  echo ("</div>\n\n");
  pagefooterfile ("$config->documentroot/$dir_recent/last$span.html.utf8");

  $config->htmlheaderlinks = array ();
}

// write rss feed
if ($hd = fopen ($file = "$config->documentroot/$dir_feeds/today.rss", "w")) {
  $pubdate = date ("r");

  fputs ($hd, <<<EOF
<?xml version="1.0" encoding="utf-8" ?>
<rss version="0.91">
  <channel>
    <title>Project Gutenberg Recently Posted or Updated EBooks</title>
    <link>$base_url</link>
    <description>
       EBooks posted or updated today on Project Gutenberg.
       This feed is regenerated every night.
    </description>
    <language>en-us</language>
    <webMaster>webmaster@gutenberg.org (Marcello Perathoner)</webMaster>
    <pubDate>$pubdate</pubDate>
    <lastBuildDate>$pubdate</lastBuildDate>

EOF
);

  fputs ($hd, $rssbuffer);
  fputs ($hd, "  </channel>\n</rss>\n");
  fclose ($hd);
}

?>
