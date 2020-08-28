<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

authenticate ();
getstr ("ip");

$ip = long2ip (ip2long ($ip));
pageheader ($caption = "Whois $ip");

echo ("<pre>\n");

echo `whois $ip`;

echo ("</pre>\n");

pagefooter ();

?>
