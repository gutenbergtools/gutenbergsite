<?php

ob_start("ob_gzhandler");

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include ("pgcat.phh");
authenticate ();

getstr ("file");

header ("Content-Type: text/plain");

echo ("File: $file\n\n");

system ("ls -al $file");

?>
