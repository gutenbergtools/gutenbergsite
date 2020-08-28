<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

$db = $config->db ();
getstr ("titlemask");
getint ("maxcnt", 25);

pageheader ("Batch-Edit Attributes");

$marcs = array ();

$db->exec ("select * from attriblist order by pk");
if ($db->FirstRow ()) {
  do {
    $marcs[$db->get ("pk", SQLINT)] = $db->get ("name", SQLCHAR);
  } while ($db->NextRow ());
}

function mk_options ($name, $options, $option) {
  $ret = "";
  foreach ($options as $value => $opt) {
    $selected = ($value == $option) ? " selected=\"selected\"" : "";
    $ret .= "<option value=\"$value\"$selected>$opt</option>\n";
  }
  return "<select name=\"${name}[]\">\n" . $ret . "</select>\n";
}

class TypeColumn extends dbtSimpleColumn {
  function __construct () {
    parent::__construct (null, "Type", "narrow");
  }
  function Data ($db) {
    global $marcs;
    return "<td>" . mk_options ("marcs", $marcs, $db->get ("fk_attriblist")) . "</td>";
  }
}

class TextAreaColumn extends dbtSimpleColumn {
  function __construct ($dbfield, $caption, $class = null) {
    parent::__construct ($dbfield, $caption, $class);
  }
  function Data ($db) {
    global $config;
    return "<td>" . preg_replace ("/#(\w+)#/e",
                                  "htmlspecialchars (\$db->get('\\1'))", $this->dbfield) . "</td>";
  }
}


form_open_get ();
p ("Enter <a href=\"http://www.php.net/pcre.pattern.syntax\">Perl RegExp</a>:
<input type=\"text\" name=\"titlemask\" value=\"$titlemask\" /> eg. Commedia");
p ("Max. No.: <input type=\"text\" name=\"maxcnt\" size=\"2\" value=\"$maxcnt\" />");
form_submit ("Reload");
form_close ();

$t = new ListTable ();
$t->AddColumn ("<input type=\"checkbox\" name=\"pks_update[]\" value=\"#pk#\" />", "", "narrow");
$t->AddColumn ("<input type=\"text\" size=\"2\" name=\"nonfilings[]\" value=\"#nonfiling#\"/>", "Nonfiling");
$t->AddColumnObject (new TextAreaColumn ("<textarea rows=\"4\" cols=\"80\" name=\"titles_a[]\">#text#</textarea>" . 
	       "<input type=\"hidden\" name=\"pks[]\" value=\"#pk#\" />", "Title"));
$t->AddColumnObject (new TypeColumn ());
$t->AddColumn ("<a href=\"$config->etext/#fk_books#\">#fk_books#</a>", "eBook");

/////////////////////////////////////////////////////////////////////////////////

if (!empty ($titlemask)) {
  form_open ("titles2");
  $sql = "select * from attributes where text ~ '$titlemask' order by text";
  $db->exec ($sql);
  $t->limit = $maxcnt;
  $t->PrintTable ($db, "Attributes Matching RegExp: $titlemask", "pgdbfiles");
  form_relay ("titlemask");
  form_relay ("maxcnt");
  form_submit ("Update Checked Attribute Entries");
  form_close ();
}

pagefooter ();

// Local Variables:
// mode:php
// coding:utf-8-unix 
// fill-column: 75
// End:

?>
