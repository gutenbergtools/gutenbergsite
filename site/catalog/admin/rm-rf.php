<?php

ob_start("ob_gzhandler");

include ("pgcat.phh");
authenticate ();

# getstr ("file");

header ("Content-Type: text/plain");

system ('rm -rf /public/vhost/g/gutenberg/html/cache/wiki');

echo ('done');

?>
