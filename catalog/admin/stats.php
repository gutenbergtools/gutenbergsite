<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
$db->logger = new logger ();

class AuthorsTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"author?mode=edit&fk_authors=#pk#\">" .
		     "#author#</a>", "Author");
  }
}

pageheader("Various Statistics");

echo("<h2>Author Stats</h2>\n");

echo("<p>Note that there is still considerable error in the database of " .
     "authors, due to incorrect spliting and merging of authors with " .
     "similar or varying names.</p>\n");

echo("<ul>");
$db->Exec("select count(*) from authors");
echo("<li> Total Authors: " . $db->Get("count") . "</li>\n") ;
$db->Exec("select count(*) from authors where born_floor is null and " .
	  "born_ceil is null and died_floor is null and died_ceil is null");
echo("<li> Authors with no birth or death dates: " . $db->Get("count") . 
     "</li>\n") ;
$db->Exec("select count(*) from authors where born_floor is not null " .
	  "and born_ceil is null and died_floor is null " .
	  "and died_ceil is null;");
echo("<li> Authors with only a earliest birth year: " . $db->Get("count") . 
     "</li>\n") ;
$db->Exec("select count(*) from authors where born_floor is null " .
	  "and born_ceil is null and died_floor is not null " .
	  "and died_ceil is null;");
echo("<li> Authors with only a earliest death year: " . $db->Get("count") . 
     "</li>\n") ;
echo ("</ul>");

$table = new AuthorsTable ();
$db->Exec("select pk, author from authors where born_floor is null " .
	  "and died_floor is null and (born_ceil is not null or " .
	  "died_ceil is not null) order by author");
$table->PrintTable($db, "Authors with only latest birth or death dates");

echo("<ul>");
$db->Exec("select count(note) from authors;");
echo("<li> # of Author entries with internal notes: " . $db->Get("count") . "</li>\n") ;
echo ("</ul>");

$table = new AuthorsTable ();
$db->Exec("select pk, author from authors " .
	  "order by char_length(author) desc limit 20");
$table->PrintTable($db, "20 longest Authors names");

$table = new AuthorsTable ();
$db->Exec("select pk, author from authors " .
	  "order by char_length(author) limit 20");
$table->PrintTable($db, "20 shortest Authors names");

class AuthorsBirthDeathTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"author?mode=edit&fk_authors=#pk#\">" .
		     "#author#</a>", "Author");
    $this->AddSimpleColumn("born_floor", "Birth");
    $this->AddSimpleColumn("died_floor", "Death");
  }
}

p("As a way to see what authors we have whose works are more likely to be " .
  "in copyright, this is a list of all the authors born after the " .
  "critical year of 1923.");
$table = new AuthorsBirthDeathTable ();
$db->Exec("select pk, author, born_floor, died_floor " .
	  "from authors where born_floor>1923 order by born_floor");
$table->PrintTable($db, "Authors born after 1923");

$table = new AuthorsBirthDeathTable ();
$db->Exec("select pk, author, born_floor, died_floor from authors " .
	  "where died_floor-born_floor>100 order by author");
$table->PrintTable($db, "Authors who lived more than 100 years");

$table = new AuthorsBirthDeathTable ();
$db->Exec("select pk, author, born_floor, died_floor from authors " .
	  "where died_floor-born_floor<20 order by author");
$table->PrintTable($db, "Authors who lived less than 20 years");

$table = new AuthorsBirthDeathTable ();
$db->Exec("select pk, author, born_floor, died_floor from authors " .
	  "where died_floor<born_floor order by author");
$table->PrintTable($db, "Authors born before they died");

echo("<h3>Author URLs</h3>\n"); /* Author URLs section */

echo("<ul>");
$db->Exec("select count(authors.pk) as count from authors " .
	  "left join author_urls on authors.pk=author_urls.fk_authors " .
	  "where fk_authors is null");
echo("<li> Author entries with no URLs attached: " . $db->Get("count") . 
     "</li>\n") ;
$db->Exec("select count(*) as count from (select fk_authors " .
	  "from author_urls group by fk_authors having " .
	  "count(fk_authors)=1) as foo");
echo("<li> Author entries with a single URL: " . $db->Get("count") . 
     "</li>\n");
$db->Exec("select count(*) as count from (select fk_authors " .
	  "from author_urls group by fk_authors having " .
	  "count(fk_authors)=2) as foo");
echo("<li> Author entries with two URLs: " . $db->Get("count") . 
     "</li>\n");
echo ("</ul>");

class AuthorsWithMoreThan2URLsTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"author?mode=edit&fk_authors=#pk#\">" .
		     "#author#</a>", "Author");
    $this->AddSimpleColumn("count", "# of URLs");
  }
}
$table = new AuthorsWithMoreThan2URLsTable ();
$db->Exec("select fk_authors as pk, author, count(fk_authors) as count " .
	  "from author_urls join authors on fk_authors=authors.pk " .
	  "group by fk_authors, author having count(fk_authors)>2 " .
	  "order by count(fk_authors), author");
$table->PrintTable($db, "Authors with more than 2 URLs attached");

echo("<ul>");
$db->Exec("select count(*) from author_urls");
echo("<li> Total # of URLs: " . $db->Get("count") . "</li>\n") ;
$db->Exec("select count(*) from " .
	  "(select distinct description from author_urls) as foo");
echo("<li> # of different URL descriptions: " . $db->Get("count") . "</li>\n") ;
echo ("</ul>");
class URLDescriptionsTable extends ListTable {
  function __construct () {
    $this->AddSimpleColumn("description", "URL Description");
    $this->AddSimpleColumn("count", "# of Uses");
  }
}
$table = new URLDescriptionsTable ();
$db->Exec("select description, count(description) from author_urls group by description having count(description)>1 order by count(description) desc");
$table->PrintTable($db, "URL descriptions used multiple times");

class RepeatedURLsTable extends ListTable {
  function __construct () {
    $this->AddColumn("<a href=\"author?mode=edit&fk_authors=#fk_authors#\">" .
		     "#author#</a>", "Author");
    $this->AddSimpleColumn("url", "URL");
  }
}
$table = new RepeatedURLsTable ();
$db->Exec("select fk_authors, author, url from author_urls " .
	  "join authors on fk_authors=authors.pk " .
	  "where url in (select url from author_urls " .
	  "group by url having count(url)>1) order by url;");
$table->PrintTable($db, "URLs used multiple times");

pagefooter();

/*
echo("<ul>");
$db->Exec("");
echo("<li> : " . $db->Get("") . "</li>\n") ;
echo ("</ul>");
$table = new AuthorsTable ();
$db->Exec("");
$table->PrintTable($db, "Authors ");
*/
