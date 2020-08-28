<?php

include_once ("pgcat.phh");

authenticate ("createuser");

getstr ("filter");
pageheader ($caption = "Users $filter");

class ListUsersTable extends ListTable {
  function __construct () {
    global $filter;
    $prefix = "<a href=\"user?filter=$filter&amp;mode";
    $this->AddColumn ("$prefix=edit&amp;fk_users=#pk#\">Edit</a>", "$prefix=add\">Add</a>", "narrow");
    $this->AddColumn ("$prefix=delete&amp;fk_users=#pk#\">Delete</a>", "", "narrow");
    $this->AddColumn ("<a href=\"password?admin=1&amp;filter=$filter&amp;fk_users=#pk#\">Password</a>", "", "narrow");
    $this->AddSimpleColumn ("pk",       "Id",      "narrow");
    $this->AddSimpleColumn ("user",     "User");
    $this->AddSimpleColumn ("login",    "Login");
    $this->AddSimpleColumn ("password", "Password");
  }
}

$db = $config->db ();

echo ("
<p>Please enter the first few characters of the user name (at least one).
Search is case-sensitive.
Use * as wildcard. (eg. Marcello*)
To see everything just enter *.</p>
");

form_open ();
echo ("  <input type=\"text\" name=\"filter\" value=\"$filter\"/>\n");
form_submit ("Search");
form_close ();

if ($filter != "") {
  $filt = preg_replace ('/\*/', '%', $filter);
  $db->exec ("select * from users where user like '$filt%' order by user;");
  $table = new ListUsersTable ();
  $table->PrintTable ($db, $caption);
}

pagefooter ();

?>
