<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include ("pgcat.phh");
authenticate ();

getstr ("file");

header ("Content-Type: application/octet-stream");

readfile ($file);

?>
