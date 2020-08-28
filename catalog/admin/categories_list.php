<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("filter");
pageheader ($caption = "Categories $filter");

class ListCategoriesTable extends ListTable {
  function __construct () {
    global $filter;
    $prefix = "<a href=\"category?filter=$filter&mode";
    $this->AddColumn ("$prefix=edit&fk_categories=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "left", "1%");
    $this->AddColumn ("$prefix=delete&fk_categories=#pk#\">Delete</a>",
		      "", "left", "1%");
    $this->AddSimpleColumn ("category", "Category");
  }
}

$db = $config->db ();

p ("Please enter the first few characters of the category (at least one).
Search is case-sensitive.
Use * as wildcard. (eg. *human)
To see everything just enter *.");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>&nbsp;\n");
form_submit ("Search");
form_close ();

if ($filter != "") {
  $filt = preg_replace ('/\*/', '%', $filter);
  $db->exec ("select * from categories where category ilike '$filt%' order by category;");
  $table = new ListCategoriesTable ();
  $table->PrintTable ($db, $caption);
}

pagefooter ();

?>
