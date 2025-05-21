<h1>Testing php</h1>

<p>Phpinfo output:</p>
<?php

 set_include_path(get_include_path() . PATH_SEPARATOR .  "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

 authenticate ();
 
 phpinfo();
?>

<p>Output ends.</p>


