<?php

include_once ("pgcat.phh");
nocache ();
authenticate ();

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
    return round ($diff / 60) . "\xc2\xa0min";
  if ($diff < 36000) 
    return round ($diff / 3600, 1) . "\xc2\xa0hours";
  if ($diff < 86400) 
    return round ($diff / 3600, 0) . "\xc2\xa0hours";
  return round ($diff / 86400, 1) . "\xc2\xa0days";
}

function hr_ago ($t1) {
  $d = hr_time_diff ($t1, time ());
  return $d ? "$d\xc2\xa0ago" : "now";
}

function hr_in ($t1) {
  $d = hr_time_diff (time (), $t1);
  return $d ? "in\xc2\xa0$d" : "now";
}

function hr_host ($ip) {
  global $r;
  return $r->host ($ip);
}

class CalcFieldHost {
  function f ($db) {
    $ip = $db->get ("ip", SQLCHAR);
    $host = hr_host ($ip);
    $host = preg_replace ("/[^.]+\.[^.]+$/", "\xE2\x80\x8B<a href=\"http://www.\\0\">\\0</a>", $host);
    return $host;
  }
}

class CalcFieldDuration {
  function f ($db) {
    return hr_time_diff ($db->get ("firstseen", SQLDATE), $db->get ("lastseen", SQLDATE));
  }
}

class CalcFieldRate {
  function f ($db) {
    return round (3600 * $db->get ("hits", SQLINT) / ($db->get ("lastseen", SQLDATE) - $db->get ("firstseen", SQLDATE)));
  }
}

class CalcFieldLastSeen {
  function f ($db) {
    return hr_ago ($db->get ("lastseen", SQLDATE));
  }
}

class CalcFieldBlocked {
  function f ($db) {
    $ip = htmlspecialchars ($db->get ("ip", SQLCHAR));
    $b = "<a href=\"robot-activity?block=$ip\">block</a>";
    return $db->get ("blocked", SQLBOOL) ? "blocked" : $b;
  }
}

class CalcFieldExpires {
  function f ($db) {
    return hr_in ($db->get ("expires", SQLDATE));
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
    $this->AddSimpleColumn ("c_blocked",  "Block", "narrow");
    $this->lastcolumn->raw = 1;
    $this->lastcolumn->SetTitle ("Block this IP.");

    $this->AddColumn ("<a href=\"robot-activity?delete=#ip#\">delete</a>", "Delete", "narrow");
    $this->lastcolumn->SetTitle ("Delete this robot from watch list.");

    $this->AddSimpleColumn ("c_last",    "Seen");
    $this->lastcolumn->SetTitle ("Last access.");

    $this->AddSimpleColumn ("c_dur",     "For");
    $this->lastcolumn->SetTitle ("Total duration of access.");

    $this->AddSimpleColumn ("ip",         "IP");
    $this->lastcolumn->SetTitle ("IP address.");

    $this->AddSimpleColumn ("c_host",     "Host");
    $this->lastcolumn->f = create_function ('$raw', 'return $raw;');
    $this->lastcolumn->raw = 1;
    $this->lastcolumn->SetTitle ("Host name. ??? if reverse lookup failed.");

    $this->AddColumn ("<a href=\"whois?ip=#ip#\">whois</a>", "Whois", "narrow");
    $this->lastcolumn->SetTitle ("Start a whois query.");

    $this->AddSimpleColumn ("c_rate",     "Rate",       "narrow right");
    $this->lastcolumn->SetTitle ("Total hit rate / hour.");

    $this->AddSimpleColumn ("hits",       "Total",      "narrow right");
    $this->lastcolumn->SetTitle ("Total hits.");

    $this->AddSimpleColumn ("rhits",      "Res.", "narrow right");
    $this->lastcolumn->SetTitle ("Hits in robot-restricted area. Should be zero.");

    $this->AddSimpleColumn ("hhits",      "Hp",   "narrow right");
    $this->lastcolumn->SetTitle ("Hits in honeypot. Should be zero.");

    $this->AddSimpleColumn ("ua",         "User-Agent");
    $this->lastcolumn->SetTitle ("User Agent");

  }
  function startrow ($db) {
    $blocked = $db->get ("blocked", SQLBOOL);
    $style = $blocked ? " style=\"color: gray;\"" : "";
    echo ("  <tr$style>");
  }
}

class RobotBlockedTable extends ListTable {
  function __construct () {
    $this->AddColumn ("<a href=\"robot-activity?unblock=#ip#\">unblock</a>", "Unblock", "narrow");
    $this->lastcolumn->SetTitle ("Unblock this IP.");

    $this->AddSimpleColumn ("ip",         "IP");
    $this->lastcolumn->SetTitle ("IP address.");

    $this->AddSimpleColumn ("c_host",     "Host");
    $this->lastcolumn->f = create_function ('$raw', 'return $raw;');
    $this->lastcolumn->raw = 1;
    $this->lastcolumn->SetTitle ("Host name. ??? if reverse lookup failed.");

    $this->AddColumn ("<a href=\"whois?ip=#ip#\">whois</a>", "Whois", "narrow");
    $this->lastcolumn->SetTitle ("Start a whois query.");

    $this->AddSimpleColumn ("c_expires",   "Expires");
    $this->lastcolumn->SetTitle ("Block expires.");

  }
}

$db = $config->db ();
$r = new robots ();

getstr ("block");
getstr ("unblock");
getstr ("delete");

if ($block) {
  $ip = long2ip (ip2long ($block));
  $r->block ($ip);
  $host = hr_host ($ip);
  $msg = "Robot $host ($ip) blocked";
  // redirect else we would block again on page refresh
  header ("Location: robot-activity?msg=$msg");
  return;
}

if ($unblock) {
  $ip = long2ip (ip2long ($unblock));
  $r->unblock ($ip);
  $host = hr_host ($ip);
  $msg = "Robot $host ($ip) unblocked";
  header ("Location: robot-activity?msg=$msg");
  return;
}

if ($delete) {
  $ip = long2ip (ip2long ($delete));
  $r->delete ($ip);
  $host = hr_host ($ip);
  $msg = "Robot $host ($ip) deleted";
  header ("Location: robot-activity?msg=$msg");
  return;
}

pageheader ($caption = "Robot Activity Monitor");

getstr ("msg");
getstr ("errormsg");

if (!empty ($msg))      msg ($msg);
if (!empty ($errormsg)) error_msg ($msg);

p ("Time: " . date ("Y-m-d H:i:s"));

$db->exec ("select robots.ips.*, robots.blocks.expires > timestamp 'now' as blocked from robots.ips 
left join robots.blocks on robots.ips.ip = robots.blocks.ip
where 
  (robots.blocks.expires > timestamp 'now')
  or ((hits > 1000) and (lastseen - firstseen) / hits < interval '2 seconds')
  or ((rhits > 100) and (lastseen - firstseen) / (rhits + 1) < interval '20 seconds')
  or  (hhits >  10)
order by not (robots.blocks.expires > timestamp 'now'), ((lastseen - firstseen) / hits) limit 100;
");

$db->calcfields ["c_host"]     = new CalcFieldHost ();
$db->calcfields ["c_dur"]      = new CalcFieldDuration ();
$db->calcfields ["c_last"]     = new CalcFieldLastSeen ();
$db->calcfields ["c_blocked"]  = new CalcFieldBlocked ();
$db->calcfields ["c_rate"]     = new CalcFieldRate ();

// $db->calcfields ["c_isdialup"] = new CalcFieldRBL ("dul.dnsbl.sorbs.net");
// $db->calcfields ["c_spews"]    = new CalcFieldRBL ("l2.spews.dnsbl.sorbs.net");

$table = new RobotHitTable ();
$table->PrintTable ($db, "Recently Active Robots");

$db->exec ("select * from robots.blocks where expires > timestamp 'now' order by ip;");

$db->calcfields ["c_host"]     = new CalcFieldHost ();
$db->calcfields ["c_expires"]  = new CalcFieldExpires ();

$table = new RobotBlockedTable ();
$table->PrintTable ($db, "Blocked Robots");

pagefooter ();

?>
