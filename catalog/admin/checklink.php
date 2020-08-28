<?php

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

$cli = php_sapi_name () == "cli";
if (!$cli) {
  exit ();
}

include_once ("sqlform.phh");

set_time_limit (0);

$db = $config->db ();

$db->exec ("select * from files where fk_filetypes = 'html' and fk_compressions = 'none' order by filename");

if ($db->FirstRow ()) {
  do {
    $filename = $db->get ("filename", SQLCHAR);

    echo ("Checking $filename ...");

    $url = "http://$config->domain/dirs/$filename";
    $output = `/public/vhost/g/gutenberg/private/local/bin/checklink -q -s --broken $url`;

    if (preg_match ("/broken links/i", $output)) {
      echo (" ERRORS!\n$output\n");
      $validator = "http://validator.w3.org/checklink?uri=" . urlencode ($url) . "&amp;hide_type=all&amp;depth=&amp;check=Check";
      
      mail ("marcello@perathoner.de", "Broken links in $filename", 
            "Validator url:\n\n$validator\n\nValidator output was:\n$output",
            "From: linkchecker@gutenberg.org\r\n" .
            "Reply-To: webmaster@gutenberg.org\r\n");

    } else {
      echo (" OK\n");
    }
   
  } while ($db->NextRow ());
}

?>
