<?php

ob_start("ob_gzhandler");

include ("pgcat.phh");
authenticate ();

getstr ("file");

header ("Content-Type: text/plain");

echo ("Tail: $file\n\n");

system ('tail -n 200 ' . escapeshellarg ($file), $retval);

?>
