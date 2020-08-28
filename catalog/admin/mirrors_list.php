<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ("mirror");

pageheader ($caption = "Mirrors");

class ListMirrorsTable extends ListTable {
  function __construct () {
    $prefix = "<a href=\"mirror?mode";
    $this->AddColumn ("$prefix=edit&fk_mirrors=#pk#\">Edit</a>",
		      "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&fk_mirrors=#pk#\">Delete</a>", "", "narrow");
    // $this->AddSimpleColumn ("continent", "Continent");
    $this->AddSimpleColumn ("nation",    "Nation");
    $this->AddSimpleColumn ("location",  "Location");
    $this->AddSimpleColumn ("provider",  "Provider");
    $this->AddSimpleColumn ("url",       "URL");
    $this->AddSimpleColumn ("note",      "Note");
  }
}

$db = $config->db ();

$db->exec ("select * from mirrors order by nation, location, provider;");
$table = new ListMirrorsTable ();
$table->PrintTable ($db, $caption);

pagefooter ();

?>
