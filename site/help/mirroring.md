---
layout: default
title: Mirroring How To | Project Gutenberg
permalink: /help/mirroring.html
---

Mirroring How-To
================

<div class="box_shadow">Project Gutenberg welcomes sites to mirror (copy) our collection. This can bring the collection closer to people in your region. This How-To describes how to set up a mirror.</div>

<div class="contents">
<ol>
<li><a href="#Connectivity">Connectivity</a></li>
<li><a href="#Software">Software</a></li>
<li><a href="#Using_Rsync">Using Rsync</a>
<ol class="inner_1"> 
<li><a href="#Full_example">Full example</a></li>
</ol>
</li>
<li><a href="#Getting_Your_Mirror_Listed">Getting Your Mirror Listed</a></li>
</ol>
</div>

## Connectivity
Our experience has been that a static IP address and T1 (~1.5Mb symmetric) or faster permanent network connection is minimal for a public mirror. (Of course, you can build a private mirror with a DSL or cable modem, but sharing it with the world requires a somewhat higher bandwidth.)

See files "du-sk" and "ls-R" in the top-level directory for the current collection size and number of files. New eBooks are added almost every day, so it's desirable to mirror nightly. There are around 2 million files, over 60 languages, and dozens of different file formats. You may opt to mirror only the zip files or to leave out the audio files, or other variations. The rsync "--exclude" option may be used for this. 

## Software
We recommend that you use *rsync*. The wget and cURL tools are not suitable, because they need to look at all files just to get the ones that were updated recently. Rsync is available for all Unix-like systems (including MacOS), and is part of Cygwin for Windows.

We offer two distinct rsync modules: 
- the "main" collection, which consist of our manually curated HTML and plain text files, their zip archives and audio files and
- the automatically generated content, including EPUB and MOBI (a.k.a., Kindle) files, generated HTML, and more automatically generated files.
The main collection changes daily, as new items are added or updated. The generated content may be regenerated in big batches, causing rsync traffic spikes. 

## Using Rsync
The ibiblio site is the main home of Project Gutenberg, but it is not the fastest server. Below are examples for an alternate server which is faster, as well as for the main ibiblio site.

To rsync the main collection: 
<pre>
 rsync -av --del ftp.ibiblio.org::gutenberg /var/www/gutenberg
 rsync -av --del aleph.gutenberg.org::gutenberg /var/www/gutenberg
</pre>

The last parameter is the directory where you want the stuff placed in your drive.

To rsync the generated content: 
<pre>
 rsync -av --del ftp@ftp.ibiblio.org::gutenberg-epub /var/www/gutenberg-generated
 rsync -av --del aleph.gutenberg.org::gutenberg-epub /var/www/gutenberg-generated
</pre>

Please note that the two modules have a very different directory structure. The main collection uses a hierarchy of small directories, e.g., eBook #12345 is stored under 1/2/3/4/12345/. The generated content uses one huge 'root' directory with a subdirectory for each book. eBook #12345 is stored in epub/12345/. You should configure your server to not autoindex the huge 'root' directory. There is an 'index.html' file, to make it less likely for remote HTTP clients to enumerate the entire directory.

You should run a daily job to check for newly updated files. Unix/Linux employs cron for this; Windows systems could use the task scheduler. We can help you with setting up the mirroring software, or any other details, if you would like.

Put one or both of the aforementioned commands into a shell script and then call the shell script from your crontab.

Here is a sample cron entry for a daily job, sending normal output to /dev/null (error output will be sent via email):

<pre>
 0 2 * * * /path/to/shell_script > /dev/null
</pre>

### Full example
Here is a full crontab example from one of our mirrors. Please do not just blindly copy it, though, since it will need adjusting for your environment (minimally, the directory path that is the destination for the files). 
<pre>
 15 4 * * * /usr/bin/rsync -avHS --timeout 600 --delete --exclude 'cache/' aleph.gutenberg.org::gutenberg /data/htdocs/gutenberg > /dev/null ;
 /usr/bin/rsync -avHS --timeout 600 --delete --exclude '\*/mbt-\*' aleph.gutenberg.org::gutenberg-epub /data/htdocs/gutenberg/cache/epub
</pre>

There is an historical anomaly with the generated content. In the main collection, it is listed under "cache/epub," while the catalog metadata uses "cache/generated". If you would like to keep all of the content in one large directory tree, similar to how the main collection works, your front end Web server will need to redirect, to use the same path. In other words, you will want a path from the catalog, such as "cache/generated/1001/1001.epub" to also be available as "cache/epub/1001/1001.epub." We use a simple redirect within Apache for this (we put this in apache.conf, but it can be in other locations):
<pre>
 AllowOverride FileInfo
 RewriteEngine on
 RewriteRule ^cache/generated(/.*)?$ cache/epub$1 [L]
</pre>

## Getting Your Mirror Listed
Once you have successfully installed and tested your configuration, we'll add your site to the list of mirrors, so people can find you. Email *help2021 @ pglaf.org* and we'll announce it in our next newsletters. After a month or so (to confirm stability) we'll add you to the mirror list and to the mirror selection page of each eBook. 

Before you start you might want to view our [mirror list](//www.gutenberg.org/MIRRORS.ALL) to check whether the geographical location of your server would be a good addition to the list.

The book directories are the only part we offer for mirror. The Project Gutenberg catalog in XML/RDF is in the root directory of the generated content, if you would like to make your own search software. We do not distribute the central search software or Web pages used at www.gutenberg.org, however. Also, note that we only currently link to mirrors for the main collection, not the generated content.

You may distribute our books by any means you choose: HTTP, FTP, rsync, TOR, BitTorrent, p2p or others.

Thanks for your interest in helping Project Gutenberg reach more readers. 

