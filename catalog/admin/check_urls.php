<?php

$cli = php_sapi_name () == "cli";
if (!$cli) exit ();

set_include_path(get_include_path() . PATH_SEPARATOR . "/public/vhost/g/gutenberg/dev/private/lib/php");
include_once ("pgcat.phh");

$db = $config->db ();

$cnt = 0;

$db->exec ("select author, url from authors, author_urls where authors.pk = author_urls.fk_authors order by url");

if ($db->FirstRow ()) {
  do {
    $url    = $db->get ("url",    SQLCHAR);
    $author = $db->get ("author", SQLCHAR);

    sleep (1);

    if (!preg_match ("!^http://(.*?)(/.*)$!", $url, $matches)) {
      echo ("$author\nNot a http url: $url\n");
      $cnt++;
      continue;
    }

    $host = $matches[1];
    $path = $matches[2];

    $sock = @fsockopen ($host, 80, $errno, $errstr, 120);
    if (!$sock) {
      echo ("$author\nHost $host unreachable! $errstr ($errno)\n");
      $cnt++;
      continue;
    }
    
    $request = "HEAD $path HTTP/1.0\r\nHost: $host\r\n\r\n";
  
    // echo ($request);

    fwrite ($sock, $request);
    
    $headers = "";
    while ($str = trim (fgets ($sock, 4096)))
      $headers .= "$str\n";

    fclose ($sock);

    if (!preg_match ("!^HTTP/\d\.\d\s+(\d+)!", $headers, $matches)) {
      echo ("$author\nGot bogus response from $host!\n\n($headers)\n\n");
      $cnt++;
      continue;
    }

    $code = intval ($matches[1]);

    if ($code == 200) {
      continue;
    } 
    if ($code >= 300 && $code < 400) {
      echo ("$author\n$url Redirected $code");
      if (preg_match ("!^Location:\s+(.*)$!im", $headers, $matches)) {
        $location = $matches[1];
        echo (" to $location");
      }
      echo ("\n");
      continue;
    }

    echo ("$author\n$url Error $code!\n");
    $cnt++;

  } while ($db->NextRow ());
}

if ($cnt) {
  echo ("$cnt urls failed!!\n");
  return 1;
}

return 0;

?>
