<!DOCTYPE html>
<html class="client-nojs" lang="en" dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:og="http://opengraphprotocol.org/schema/" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
<meta charset="UTF-8"/>
<title>Project Gutenberg</title>
<link rel="stylesheet" href="/gutenberg/style.css?1.1">
<link rel="stylesheet" href="/gutenberg/collapsible.css?1.1">
<link rel="stylesheet" href="/gutenberg/nav.css?v=1.1">
<meta name="viewport" content="width=device-width, initial-scale=1">


<meta name="keywords" content="books, ebooks, free, kindle, android, iphone, ipad"/>
<meta name="google-site-verification" content="wucOEvSnj5kP3Ts_36OfP64laakK-1mVTg-ptrGC9io"/>
<meta name="alexaVerifyID" content="4WNaCljsE-A82vP_ih2H_UqXZvM"/>
<link rel="copyright" href="http://www.gnu.org/copyleft/fdl.html"/>
<link rel="shortcut icon" href="/gutenberg/fav1/favicon.ico?v=1.1"/>

<meta property="og:title"        content="Project Gutenberg" />
<meta property="og:type"         content="website" />
<meta property="og:url"          content="http://www.gutenberg.org/" />
<meta property="og:description"  content="Project Gutenberg offers free ebooks to download." />
<meta property="fb:admins"       content="615269807" />
<meta property="fb:app_id"       content="115319388529183" />
<meta property="og:site_name"    content="Project Gutenberg" />
<meta property="og:image"        content="http://www.gutenberg.org/pics/logo-144x144.png" />


</head>

<body>
  <div class="container">
    <nav role="navigation">
      <a href="/index.html" class="no-hover">
        <img class="logo" src="/gutenberg/new-pg-logo.png" alt="Project Gutenberg" draggable="false">
      </a>
      <label for="show-menu" class="show-menu"><img src="/gutenberg/menu-icon.png" class="menu"></label>
      <input type="checkbox" id="show-menu" role="button">
      <!--<a href="#" class="show-menu"></a>-->

      <ul id="menu">
       <li><a href="/ebooks/index.php">Find a Book</a></li>
        <li><a href="#">How to Help</a></li>
        <li><a href="#">Help</a>
          <ul class="hidden">
            <li><a href="/help/mobile.html">Mobile How-To</a></li>
            <li><a href="#">Sub-2</a></li>
            <li><a href="#">Sub-3</a></li>
          </ul>
        </li>
        <li><a href="#">About</a>
          <ul class="hidden">
            <li><a href="/about/history.html">About Us</a></li>
            <li><a href="/policy/privacy_policy.html">Privacy Policy</a></li>
            <li><a href="/about/contact_information.html">Contact Us</a></li>
          </ul>
        </li>
        <li><a href="/donate/donate.html">Donate</a></li>
      </ul>
	<div class="searchbox">	
      <form method="get" action="/ebooks/search/"
      accept-charset="utf-8" enctype="multipart/form-data">
          <input type="text" value="" id="menu-book-search" name="query" class="searchInput" title="" alt="undefined string" tabindex="20" size="20" maxlength="80"
          placeholder="Search for Books"/>
          <input type="submit" name="submit_search" value="Search" style="vertical-align:middle;">
      </form>
	</div>

      <div class="donate">
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="new">
          <p>Project Gutenberg appreciates your donation! Learn <a href="/donate/donate.html">Why Donate?</a> Click here to:</p>
          <input type="hidden" name="cmd" value="_s-xclick" />
          <input type="hidden" name="hosted_button_id" value="XKAL6BZL3YPSN" />
          <input class="donbtn" type="image" src="/gutenberg/en_US.gif"
           name="submit" alt="PayPal-The safer, easier way to pay online!" />
        </form>
      </div>

    </nav>



<div class="page_content">
<?php

include_once ("pgcat.phh");
global $db;
$db = $config->db ();

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

?>
   <div class="search_category"><ul>
	<li><a href="/ebooks/search/?sort_order=downloads">Popular</a></li>
   	<li><a href="/ebooks/search/?sort_order=release_date">Latest Categories</a></li>
   	<li><a href="/ebooks/search/?sort_order=random">Random</a></li>
   </ul>
</div>
    <a class="button" href="#popup1">Help</a>	
<div id="popup1" class="overlay">
     <div class="popup">
           <a class="close" href="#">&times;</a>
             <div class="content">








<p>Enter your search terms separated by spaces,
then press &lt;Enter&gt;.
Avoid punctuation except as indicated below:</p>

<table border=3px>
  <tr>
    <th>Suffixes</th>
    <th>.</th>
    <td>exact match</td>
  </tr>
  <tr>
    <th rowspan="7">Prefixes</th>
    <th>a.</th>
    <td>author</td>
  </tr>
  <tr>
    <th>t.</th>
    <td>title</td>
  </tr>
  <tr>
    <th>s.</th>
    <td>subject</td>
  </tr>
  <tr>
    <th>l.</th>
    <td>language</td>
  </tr>
  <tr>
    <th>#</th>
    <td>ebook no.</td>
  </tr>
  <tr>
    <th>n.</th>
    <td>ebook no.</td>
  </tr>
  <tr>
    <th>cat.</th>
    <td>category</td>
  </tr>
<tr>
    <th rowspan="3" style="width: 8em">
      Operators
      <small>Always put spaces around these.</small>
    </th>
    <th>|</th>
    <td>or</td>
  </tr>
  <tr>
    <th>!</th>
    <td>not</td>
  </tr>
  <tr>
    <th>( )</th>
    <td>grouping</td>
  </tr>
</table>

<table border=3px>
  <tr>
    <th>this query</th>
    <th>finds</th>
  </tr>
  <tr>
    <td>shakespeare hamlet</td>
    <td>"Hamlet" by Shakespeare</td>
  </tr>
  <tr>
    <td>qui.</td>
    <td>"qui", not "Quixote"</td>
  </tr>
  <tr>
    <td>love stories</td>
    <td>love stories</td>
  </tr>
  <tr>
    <td>a.shakespeare</td>
    <td>by Shakespeare</td>
  </tr>
  <tr>
    <td>s.shakespeare</td>
    <td>about Shakespeare</td>
  </tr>
<tr>
    <td>#74</td>
    <td>ebook no. 74</td>
  </tr>
  <tr>
    <td>juvenile l.german</td>
    <td>juvenile lit in German</td>
  </tr>
  <tr>
    <td>verne ( l.fr | l.it )</td>
    <td>by Verne in French or Italian</td>
  </tr>
  <tr>
    <td>love stories ! austen</td>
    <td>love stories not by Austen</td>
  </tr>
  <tr>
    <td>jane austen cat.audio</td>
    <td>audio books by Jane Austen</td>
  </tr>
</table>
        
                </div>
                 </div>
  </div>

    <form method="get" action="/ebooks/search/"
    accept-charset="utf-8" enctype="multipart/form-data">
      <div class="search">
      <p><label for="book-search" class="lbl-toggle">Basic Search</label>
        <input type="text" value="" id="book-search" name="query" class="searchInput" title="" alt="undefined string" tabindex="20" size="20" maxlength="80"
        placeholder="Search for Books"/>
        <input type="submit" name="submit_search" value="Search" style="vertical-align:middle;">
      </p>

    </div>
    </form>
  <div id="popup2" class="overlay">
     <div class="popup">
           <a class="close" href="#">&times;</a>
             <div class="content">
                 <ul>
	<?php
  		if (is_maintainer ()) {
  			echo("<li>Search for items without Subjects (No Subject) by entering " .
  			"two double quotes into the Subject field, like this: \"\"</li>");
		}
	?>
	<li>Advanced Search is case insensitive.</li>

	<li>Fill in as many fields you like.</li>

	<li>Enter one or more space separated words in each field.
	Avoid punctuation characters.</li>

	<li>The result will match all of the words you entered in all
	of the fields. Eg. Author: <i>Jules Verne</i>, Title: <i>20</i>,
	Language: <i>French</i> will get <i>20.000 Leagues Under The Sea</i>
	in French.</li>

	<li>Select Language: <i>English</i> only if you explicitly want to
	exclude works in languages other than English.
	Eg. Author: <i>Molière</i> Language: <i>English</i>
	will get all the works of Molière translated into English.</li>

	</ul>

                  </div>
                 </div>
  </div>
  <div id="popup3" class="overlay">
     <div class="popup">
           <a class="close" href="#">&times;</a>
             <div class="content">

                  </div>
                 </div>
  </div>

  <div id="popup4" class="overlay">
     <div class="popup">
           <a class="close" href="#">&times;</a>
             <div class="content">

                  </div>
                 </div>
  </div>
  <div id="popup5" class="overlay">
     <div class="popup">
           <a class="close" href="#">&times;</a>
             <div class="content">

                  </div>
                 </div>
  </div>



  <div class="box">
     <a class="button" href="#popup2">Help</a>
	<?
	form_open("results");
	?>
     <input id="collapsible1" class="toggle" type="checkbox">
     <label for="collapsible1" class="lbl-toggle">Advanced Search</label>
     <div class="collapsible-content">
       <div class="content-inner">

         <p>
          <label for="author">Author:</label>
          <input type="text" name="author" id="author"/>
        </p>

        <p>
          <label for="title">Title:</label>
          <input type="text" name="title" id="title"/>
        </p>

        <p>
          <label for="subject">Subject:</label>
          <input type="text" name="subject" id="subject"/>
        </p>

        <p>
          <label for="language">Language:</label>
	 <select id="lang" name="lang"
            title="Language (Book Count)">
	<?php
	echo ("      <option selected value=\"\">Any</option>\n");
	$db->Exec ("select pk, lang, cnt from langs join (select fk_langs, count (fk_langs) as cnt from mn_books_langs group by fk_langs) as sums on pk = fk_langs order by lang;");
	if ($db->FirstRow ()) {
  	do {
    		$pk   = $db->Get ("pk");
    		$lang = $db->Get ("lang");
    		$cnt  = $db->Get ("cnt");
    		echo ("      <option value=\"$pk\">$lang ($cnt)</option>\n");
  	} while ($db->NextRow ());
	}
	?>
    </select>

        </p>
        <p>
          <label for="category" accesskey="c">Category:</label>
          <select id="category" name="category"
            title="Category (Book Count)">
	<?php
	echo ("      <option selected value=\"\">Any</option>\n");
	$db->Exec ("select pk, category, cnt from categories join (select fk_categories, count (*) as cnt from mn_books_categories group by fk_categories) as sums on pk = fk_categories order by pk;");
	if ($db->FirstRow ()) {
  	do {
    		$pk       = $db->Get ("pk");
    		$category = $db->Get ("category");
    		$cnt      = $db->Get ("cnt");
    		echo ("      <option value=\"$pk\">$category ($cnt)</option>\n");
  	} while ($db->NextRow ());
	}
	?>

	 </select>
      </p>
      <p>
        <label for="locc" accesskey="o">LoCC:</label>
        <select id="locc" name="locc"
            title="Please choose a Library of Congress Class.">
	<?php
	echo ("      <option selected value=\"\">Any</option>\n");
	if (is_maintainer ()) {
  		echo ("      <option value=\"nolocc\">No LoCC</option>\n");
	 }
	$db->Exec ("select pk, locc, cnt from loccs join (select fk_loccs, count (*) as cnt from mn_books_loccs group by fk_loccs) as sums on pk = fk_loccs order by pk;");
	if ($db->FirstRow ()) {
  	do {
    	$pk   = $db->Get ("pk");
    	$locc = $db->Get ("locc");
    	$cnt  = $db->Get ("cnt");
    	echo ("      <option value=\"$pk\">$pk $locc ($cnt)</option>\n");
  	} while ($db->NextRow ());
	}
	?>
    </select>
      </p>
      <p>
        <label for="filetype" accesskey="f">Filetype:</label>
        <select id="filetype" name="filetype"
            title="Please choose a file type.">
	<?php
	echo ("      <option selected value=\"\">Any</option>\n");
	$db->Exec ("select pk, filetype from filetypes order by sortorder, filetype;");
	if ($db->FirstRow ()) {
  		do {
    			$pk       = $db->Get ("pk");
    			$filetype = $db->Get ("filetype");
    			echo ("      <option value=\"$pk\">$filetype ($pk)</option>\n");
  		} while ($db->NextRow ());
	}
	?>

    </select>
      </p>
      <p>
        <input type="submit" id="submit"  name="submit_search" value="Search">
      </p>
	<?php
	form_close();
	?>
    </div>
  </div>
</div>
  <a class="button" href="#popup3">Help</a>
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Full Text Search</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <form method="get" action="https//search.yahoo.com/search">
      <img src="/pics/yahoologo.png" style="vertical-align:middle;" alt="Yahoo! logo">
      <input type="hidden" name="fr" value="cap-PG">
      <input type="hidden" name="vs" id="ysvs1" value="gutenberg.org">
      <input type="text"   name="p" size="29" placeholder="Search Yahoo!">
      <input type="submit" value="Yahoo! Search">

      </form>

      <form method="get" action="https://www.google.com/search">
        <img src="/gutenberg/google_search.png?v=1.1" style="vertical-align:middle;" alt="Google logo">
        <input type="text" name="q" size="31" maxlength="255" value="" placeholder="Search Google">
        <input type="hidden" name="domains" value="gutenberg.org"/>
        <input type="hidden" name="sitesearch" value="gutenberg.org"/>
        <input type="submit" name="btnG" value="Google Search"/>

      </form>
  <form method="get" id="search" action="https://duckduckgo.com/">
    <img src="/gutenberg/duck.png?v=1.1" style="vertical-align:middle;" alt="DuckDuckGo logo">
    <input type="hidden" name="sites" value="http://www.gutenberg.org"/>
    <input type="hidden" name="k8" value="#444444"/>
    <input type="hidden" name="k9" value="#D51920"/>
    <input type="hidden" name="kt" value="h"/>
    <input type="text" name="q" maxlength="255" placeholder="Search DuckDuckGo"/>
    <input type="submit" value="DuckDuckGo Search"/>
  </form>

    </div>
  </div>
  <a class="button" href="#popup4">Help</a>
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Browse By Language</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
        <label for="more_than_50" accesskey="f">Languages with more than 50 books:</label>
        <select id="more_than_50" name="more_than_50" onchange="location=this.value">
          <option selected value="">Choose a Language</option>
	<?php
	$lang_thres=50;
	$db->Exec("Select pk, lang, cnt from langs join (select fk_langs, count(fk_langs) as cnt from mn_books_langs group by fk_langs having count(fk_langs) >$lang_thres) as sums on pk =fk_langs order by lang;");
	if($db->FirstRow()){
		do{
			$pk = strtolower($db->Get("pk", SQLCHAR));
			$lang=$db->Get("lang",SQLCHAR);
			$cnt = $db->Get("cnt", SQLINT);
			echo (" <option value = \"/$dir_langs/$pk\" title=\"$lang ($cnt)\">$lang ($cnt)</option>\n");
		}while ($db->NextRow());
	}
	?>
        </select>
      </p>
      <p>
        <label for="upto_50" accesskey="f">Languages with upto 50 books:</label>
        <select id="upto_50" name="upto_50" onchange="location=this.value">
          <option selected value="">Choose a Language</option>
	<?php
	$db->Exec("Select pk, lang, cnt from langs join (select fk_langs, count(fk_langs) as cnt from mn_books_langs group by fk_langs having count(fk_langs) <=$lang_thres) as sums on pk =fk_langs order by lang;");
	if($db->FirstRow()){
		do{
			$pk = strtolower($db->Get("pk", SQLCHAR));
			$lang=$db->Get("lang",SQLCHAR);
			$cnt = $db->Get("cnt", SQLINT);
			echo (" <option value = \"/$dir_langs/$pk\" title=\"$lang ($cnt)\">$lang ($cnt)</option>\n");
		}while ($db->NextRow());
	}
	?>
        </select>
      </p>

    </div>
  </div>
  <a class="button" href="#popup5">Help</a>
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Other Categories</label>
  <div class="collapsible-content">
    <div class="content-inner">
      <p>
        <label for="category" accesskey="c">Category:</label>
        <select id="category" name="category"
        title="Please choose a Project Gutenberg Category." style="width: 30em" onchange="location=this.value">

	<?php
	echo("<option selected value=\"\">Choose a Category </option>\n");
	$db->Exec("Select pk,category,cnt from categories join (select fk_categories,count(*) as cnt from mn_books_categories group by fk_categories) as sums on pk = fk_categories order by pk;");
	if($db->FirstRow()){
		do{
			$pk       = $db->Get("pk", SQLINT);
			$category = $db->Get("category", SQLCHAR);
			$cnt      = $db->Get("cnt", SQLINT);
			echo (" <option value = \"/$dir_categories/$pk\" title=\"$category ($cnt)\">$category ($cnt)</option>\n");
		}while ($db->NextRow());
	}
		?>
 	 </select>
      </p>
      <p>
        <label>Recent:</label>
        <a href="/browse/recent/last1"> Last 24 hours</a>,
        <a href="/browse/recent/last7"> Last 7 days </a>,
        <a href="/browse/recent/last30"> Last 30 days </a>
      </p>
    </div>
  </div>
</div>


  <div class="footer">
    
    <a href="http://www.ibiblio.org/index.html" title="Project Gutenberg is hosted by ibiblio">
     <img src="/gutenberg/ibiblio-logo.png" alt="HTML tutorial">
    </a>
    <ul>
   	 <li>
          <a href="/policy/privacy_policy.html" title="Gutenberg:Privacy policy">Privacy policy</a>
        </li>
        <li>
          <a href="/about/index.html" title="Gutenberg:About">About Gutenberg</a>
        </li>
        <li>
          <a href="/policy/terms_of_use.html">Terms of Use</a>
        </li>
        <li>
          <a href="/about/contact_information.html">Contact Information</a>
        </li>

    </ul>


  </div> <!-- footer ending-->
</div>
