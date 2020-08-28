<?php

include_once ("pgcat.phh");

authenticate ();

getstr ("filter");
pageheader ($caption = "Subjects $filter");

class ListSubjectsTable extends ListTable {
  function __construct () {
    global $filter;
    $prefix = "<a href=\"subject?filter=$filter&mode";
    $this->AddColumn ("$prefix=edit&fk_subjects=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "left", "1%");
    $this->AddColumn ("$prefix=delete&fk_subjects=#pk#\">Delete</a>",
		      "", "left", "1%");
    $this->AddSimpleColumn ("subject", "Subject");
    $this->AddSimpleColumn("pk", "Internal #");
  }
}

$db = $config->db ();

echo ("
<p>Please enter the first few characters of the subject (at least one).
Search is case-sensitive.
Use * as wildcard. (eg. *Fiction)
To see everything just enter *.</p>
");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
form_submit ("Search");
form_close ();

if ($filter != "") {
  $filt = preg_replace ('/\*/', '%', $filter);
  $db->exec ("select * from subjects where subject like '$filt%' order by subject;");
  $table = new ListSubjectsTable ();
  $table->PrintTable ($db, $caption);
}

pagefooter ();

?>
