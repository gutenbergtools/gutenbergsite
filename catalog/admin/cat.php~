<?php

ob_start("ob_gzhandler");

include ("pgcat.phh");
authenticate ();

getstr ("file");

header ("Content-Type: text/plain");

echo ("File: $file\n\n");

readfile ($file);

?>
