<?php

include_once ("pgcat.phh");

authenticate ();

pageheader ("Statistics on MARC field usage");

$db = $config->db ();
$db->logger = new logger ();

$marc_fields = array();
$db->Exec("select pk, name from attriblist order by pk");
do {
  $marc_fields[] = array($db->Get("pk"), $db->Get("name"));
 } while ($db->NextRow());

echo <<< EOT
<p>This is a list of all the MARC field/attribute/tag/code names currently
present in the cataloging system.  As you can see, we do not actually use
MARC attributes for Author, Language, Subject or LoCC (they are stored
& modified elsewhere), but the system does know about them.  This should 
probably be fixed. -- Jan 2008</p>
  <p>Click on the attribute name to get a list of all the uses of it in the system, 
  along with links to edit them.</p>
EOT;

echo("<table>\n".
     "<caption># of times each MARC field is used in the PG catalog.</caption>" .
     "<tr><th>MARC field</th><th># of entries</th></tr>");
for ($i = 0 ; $i < count($marc_fields); $i++) {
  $db->Exec("select count(*) as cnt from attributes where fk_attriblist = " . 
	    $marc_fields[$i][0]);
  echo("<tr><td><a href=\"attribute_list?attribute=" . $marc_fields[$i][0] . "\">" .
       $marc_fields[$i][1] . "</a></td><td>" . $db->Get("cnt") . 
       "</td></tr>\n");
 }
echo ("</table>");

pagefooter();
?>