<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

getstr ("filter");
pageheader ($caption = "LoC classes $filter");

class ListLoccsTable extends ListTable {
  function __construct () {
    global $filter;
    $prefix = "<a href=\"locc?filter=$filter&mode";
    $this->AddColumn ("$prefix=edit&fk_loccs=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "left", "1%");
    $this->AddColumn ("$prefix=delete&fk_loccs=#pk#\">Delete</a>",
		      "", "left", "1%");
    $this->AddSimpleColumn ("pk",   "Id", "left", "1%");
    $this->AddSimpleColumn ("locc", "LoC Class");
  }
}

$db = $config->db ();

echo ("
<p>Please enter the first few characters of the LoC Class (at least one).
Search is case-sensitive.
Use * as wildcard. (eg. *United*)
To see everything just enter *.</p>
");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
form_submit ("Search");
form_close ();

if ($filter != "") {
  $filt = preg_replace ('/\*/', '%', $filter);
  $db->exec ("select * from loccs where locc like '$filt%' order by locc;");
  $table = new ListLoccsTable ();
  $table->PrintTable ($db, $caption);
}

pagefooter ();

?>
