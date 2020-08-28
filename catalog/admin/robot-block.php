<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();

$htaccess = "$config->documentroot/.htaccess";

function fixnetwork ($ip) {
  if (($pos = strpos ($ip, "/")) !== false) {
    $ip = substr ($ip, 0, $pos);
    $ip = long2ip (ip2long ($ip) + 1);
  }
  return $ip;
}

function hr_time_diff ($t1, $t2) {
  $diff = $t2 - $t1;
  if ($diff < 60) 
    return "";
  if ($diff < 3600) 
    return round ($diff / 60) . " m";
  if ($diff < 36000) 
    return round ($diff / 3600, 1) . " h";
  return round ($diff / 3600, 0) . " h";
}

function hr_ago ($t1) {
  $d = hr_time_diff ($t1, time ());
  return $d ? "$d ago" : "now";
}

class CalcFieldHost {
  function f ($db) {
    $ip = $db->get ("ip", SQLCHAR);
    $host = @gethostbyaddr ($ip);
    if ($host == $ip)
      return "";

    $ipcheck = @gethostbyname ($host);
    $host = preg_replace ("/[^.]+\.[^.]+$/", '<a href="http://www.\0">\0</a>', $host);
    if ($ip != $ipcheck)
      $host = "??? $host ???";

    return $host;
  }
}

class CalcFieldDuration {
  function f ($db) {
    return hr_time_diff ($db->get ("firstseen", SQLDATE), $db->get ("lastseen", SQLDATE));
  }
}

class CalcFieldLastSeen {
  function f ($db) {
    return hr_ago ($db->get ("lastseen", SQLDATE));
  }
}

class CalcFieldBlocked {
  function f ($db) {
    global $blocked;
    return in_array ($db->get ("ip", SQLCHAR), $blocked[1]) ? "B" : "";
  }
}

class CalcFieldRBL {
  function __construct ($list) {
    $this->list = $list;
  }
  function f ($db) {
    $ip = fixnetwork ($db->get ("ip", SQLCHAR));
    $reverse_ip = join (".", array_reverse (explode (".", $ip)));
    $host = gethostbyname ("$reverse_ip.$this->list");
    // return $host; // debug
    return strncmp ($host, "127.", 4) ? "" : "Yes";
  }
}

class RobotHitTable extends ListTable {
  function __construct () {
    $this->AddSimpleColumn ("c_last",    "Seen");
    $this->lastcolumn->SetTitle ("Last access.");

    $this->AddSimpleColumn ("c_dur",     "For");
    $this->lastcolumn->SetTitle ("Total duration of access.");

    $this->AddSimpleColumn ("ip",         "IP");
    $this->lastcolumn->SetTitle ("IP address.");

    $this->AddSimpleColumn ("c_blocked",  "B", "narrow");
    $this->lastcolumn->SetTitle ("'B' if blocked.");

    $this->AddSimpleColumn ("c_host",     "Host");
    $this->lastcolumn->f = create_function ('$raw', 'return $raw;');
    $this->lastcolumn->raw = 1;
    $this->lastcolumn->SetTitle ("Host name. ??? if reverse lookup failed.");

    $this->AddColumn ("<a href=\"whois?ip=#ip#\">whois</a>", "Whois", "narrow");
    $this->lastcolumn->SetTitle ("Start a whois query.");

    $this->AddSimpleColumn ("hits",       "Total",      "narrow right");
    $this->lastcolumn->SetTitle ("Total hits.");

    $this->AddSimpleColumn ("rhits",      "Restricted", "narrow right");
    $this->lastcolumn->SetTitle ("Hits in robot-restricted area. Should be zero.");

    $this->AddSimpleColumn ("hhits",      "Honeypot",   "narrow right");
    $this->lastcolumn->SetTitle ("Hits in honeypot. Should be zero.");
  }
}

$db = $config->db ();

pageheader ($caption = "Robot Activity Monitor");

$htaccess = file_get_contents ($htaccess);
preg_match_all ("/^Deny\s+From\s+([\d.]+)$/im", $htaccess, $blocked, PREG_PATTERN_ORDER);

/* 
foreach ($blocked[1] as $ip) {
  p ($ip);
} 
*/

p ("Time: " . date ("Y-m-d H:i:s"));

$db->exec ("select * from robots.ips 
order by hits + hhits * 100 desc limit 20;
");

$db->calcfields ["c_host"]     = new CalcFieldHost ();
$db->calcfields ["c_dur"]      = new CalcFieldDuration ();
$db->calcfields ["c_last"]     = new CalcFieldLastSeen ();
$db->calcfields ["c_blocked"]  = new CalcFieldBlocked ();

// $db->calcfields ["c_isdialup"] = new CalcFieldRBL ("dul.dnsbl.sorbs.net");
// $db->calcfields ["c_spews"]    = new CalcFieldRBL ("l2.spews.dnsbl.sorbs.net");

$table = new RobotHitTable ();
$table->PrintTable ($db, "Recently Active Robots");

pagefooter ();

?>
