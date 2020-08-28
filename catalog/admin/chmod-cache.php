<?php
echo ('<p>start ...</p>');
flush ();

/*
for ($i = 0; $i < 31000; $i++) {
  chmod ("/public/vhost/g/gutenberg/html/cache/bibrec/$i", 0777);
  if (($i % 100) == 0) {
    echo ("<p>$i</p>");
    flush ();
  }
} 
*/

echo (`chmod -R 777 /public/vhost/g/gutenberg/html/cache/wiki/*`);

echo ('<p>done</p>');

?>
