<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getint("within_the_last");

$db = $config->db ();
$db->logger = new logger ();
if ($within_the_last) {
  pageheader("List of Books released within the last $within_the_last days lacking a Subject and/or a LoCC");
 } else {
  pageheader("List of Books lacking a Subject and/or a LoCC");
 }
class SubjLoccByEtextTable extends MoreTable {
  function __construct () {
    $this->AddColumn ("<a href=\"book?mode=edit&fk_books=#pk#\">#pk#</a>", 
		      "Etext Nr. (edit link)", "right");
    $this->AddSimpleColumn ("author", "Author");
    $this->AddColumn ("<a href=\"/etext/#pk#\">#title#</a>",
		      "Title (bibrec link)");
    $this->AddColumn ("<span style=\"background-color:#nosubj#;\">" .
		      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>",
		      "No Subj", "narrow");
    $this->AddColumn ("<span style=\"background-color:#nolocc#;\">" .
		      "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>",
		      "No LoCC", "narrow");
    $this->limit = 30;
    $this->relay = array ();
  }
}
$table = new SubjLoccByEtextTable ();
$sql="select distinct on (fk_books) fk_books as pk, text as title, author, " .
  "(case when fk_subjects is null then 'black' end) as nosubj, " .
  "(case when fk_loccs is null then 'black' end) as nolocc " .
  "from attributes left join mn_books_subjects using (fk_books) " .
  "left join mn_books_loccs using (fk_books) " .
  "join mn_books_authors using (fk_books) " .
  "join authors on authors.pk=fk_authors ";

if ($within_the_last) {
  $sql=$sql . "join books on books.pk=fk_books ";
}

// gbn: the fk_roles skips records that don't have an Author or Creator:
 $sql=$sql . "where fk_attriblist=245 and "; // .
//    "fk_roles in ('aut', 'cre') and heading=1 and ";

if ($within_the_last) {
  $sql=$sql . "books.release_date >= current_date - interval '$within_the_last days' and ";
}

$sql=$sql . "((fk_subjects is null) or (fk_loccs is null)) " .
  "order by fk_books, text, author" . 
  $table->MkOffset ();

// echo ("<p>$sql</p>");

$db->Exec($sql);
# gbn: 20091213
print "<p align=\"center\"><a href=\"http://www.gutenberg.org/catalog/admin/subj_locc_by_etext.php?within_the_last=1\">Last day only</a></p>\n";


$table->PrintTable($db, "Books lacking a Subject and/or a LoCC");

pagefooter();
