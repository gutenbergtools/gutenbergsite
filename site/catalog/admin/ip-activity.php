<?php

include_once ("pgcat.phh");

authenticate ();

pageheader ($caption = "IP Activity Monitor");

p ("My IP: {$_SERVER['REMOTE_ADDR']}");
p ("Collecting data ...");
flush ();


for ($i = 0; $i < 60; $i++) {
  $ip = mmcache_get ("pglastip");
  $ips[$ip]++;
  sleep (1);
}

foreach ($ips as $ip => $cnt) {
  p ("$ip => $cnt");
}

/*


function fixnetwork ($ip) {
  if (($pos = strpos ($ip, "/")) !== false) {
    $ip = substr ($ip, 0, $pos);
    $ip = long2ip (ip2long ($ip) + 1);
  }
  return $ip;
}

class CalcFieldHost {
  function f ($db) {
    return @gethostbyaddr (fixnetwork ($db->get ("ip", SQLCHAR)));
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
    $this->AddSimpleColumn ("date",       "Date");
    $this->AddSimpleColumn ("ip",         "IP");
    $this->AddSimpleColumn ("c_host",     "Host");
    $this->AddSimpleColumn ("hits",       "Hits");
    $this->AddSimpleColumn ("restricted", "Restricted");
    $this->AddSimpleColumn ("c_isdialup", "Dialup");
    $this->AddSimpleColumn ("c_spam",     "Spam");
    $this->AddSimpleColumn ("c_spews",    "SPEWS");
  }
}

class RobotJailTable extends ListTable {
  function __construct () {
    $this->AddSimpleColumn ("firstseen",  "First Sighted");
    $this->AddSimpleColumn ("lastseen",   "Last Seen");
    $this->AddSimpleColumn ("ip",         "IP");
    $this->AddSimpleColumn ("c_host",     "Host");
    $this->AddSimpleColumn ("hits",       "Hits");
    $this->AddSimpleColumn ("restricted", "Restricted");
    $this->AddSimpleColumn ("charge",     "Charge");
    $this->AddSimpleColumn ("c_isdialup", "Dialup");
    $this->AddSimpleColumn ("c_spam",     "Spam");
    $this->AddSimpleColumn ("c_spews",    "SPEWS");
    $this->AddSimpleColumn ("ua",         "User-Agent");
  }
}

$db = $config->db ();

$db->exec ("select * from robots.stat");
$lastcron = $db->get ("lastcron", SQLCHAR);
p ("Last Cron Run: $lastcron");

// Jailed

$db->exec ("
select * from robots.jail order by firstseen;
");

$db->calcfields ["c_host"]     = new CalcFieldHost ();
$db->calcfields ["c_isdialup"] = new CalcFieldRBL ("dul.dnsbl.sorbs.net");
$db->calcfields ["c_spam"]     = new CalcFieldRBL ("spam.dnsbl.sorbs.net");
$db->calcfields ["c_spews"]    = new CalcFieldRBL ("l2.spews.dnsbl.sorbs.net");

$table = new RobotJailTable ();
$table->PrintTable ($db, "Currently Jailed Robots");
flush ();

// Recent

$db->exec ("
select date, ip, hits, restricted from robots.hit_totals 
union
select current_date, ip, count (ip), sum (restricted) from robots.hits 
group by ip having count (ip) > 1000
order by date desc, ip;
");


$db->calcfields ["c_host"]     = new CalcFieldHost ();
$db->calcfields ["c_isdialup"] = new CalcFieldRBL ("dul.dnsbl.sorbs.net");
$db->calcfields ["c_spam"]     = new CalcFieldRBL ("spam.dnsbl.sorbs.net");
$db->calcfields ["c_spews"]    = new CalcFieldRBL ("l2.spews.dnsbl.sorbs.net");

$table = new RobotHitTable ();
$table->PrintTable ($db, "Recently Active Robots");
flush ();
*/

pagefooter ();

?>
