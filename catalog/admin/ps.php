<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include ("pgcat.phh");
authenticate ();

header ("Content-Type: text/plain");

echo ("vmstat\n\n");

system ('vmstat -s', $retval);

echo ("ps\n\n");

system ('ps -e -H -o pid,ppid,stime,tty,rss,vsz,pmem,args', $retval);

?>
