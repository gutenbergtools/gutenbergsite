<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("filter");
pageheader ($caption = "Languages $filter");

class ListLangsTable extends ListTable {
  function __construct () {
    global $filter;
    $prefix = "<a href=\"lang?filter=$filter&mode";
    $this->AddColumn ("$prefix=edit&fk_langs=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "left", "1%");
    $this->AddColumn ("$prefix=delete&fk_langs=#pk#\">Delete</a>",
		      "", "left", "1%");
    $this->AddSimpleColumn ("pk",   "Id", "left", "1%");
    $this->AddSimpleColumn ("lang", "Language");
    $this->AddSimpleColumn ("cnt", "# of books");
  }
}

$db = $config->db ();

echo ("
<p>Please enter the first few characters of the language (at least one).
Search is case-sensitive.
Use * as wildcard. (eg. *ish)
To see everything just enter *.</p>
");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
form_submit ("Search");
form_close ();

if ($filter != "") {
  $filt = preg_replace ('/\*/', '%', $filter);
  $db->exec ("select pk, lang, (select count(fk_books) from mn_books_langs where fk_langs=pk) as cnt from langs where lang like '$filt%' order by cnt, lang;");
  $table = new ListLangsTable ();
  $table->PrintTable ($db, $caption);
}

pagefooter ();

?>
