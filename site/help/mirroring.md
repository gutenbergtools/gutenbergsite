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
<li><a href="#connectivity">Connectivity</a></li>
<li><a href="#collections-and-metadata">Collections and Metadata</a></li>
<li><a href="#software">Software</a></li>
<li><a href="#using-rsync">Using rsync</a>
<ol class="inner_1">
<li><a href="#refreshing-the-mirror">Refreshing the Mirror</a></li>
</ol>
</li>
<li><a href="#getting-your-mirror-listed">Getting Your Mirror Listed</a></li>
</ol>
</div>

## Connectivity
Our experience has been that a static IP address and T1 (~1.5Mb symmetric) or faster permanent network connection is minimal for a public mirror. (Of course, you can build a private mirror with a DSL or cable modem, but sharing it with the world requires a somewhat higher bandwidth.)

## Collections and Metadata
We offer two distinct collections:
- the "main" collection consists of our manually curated HTML and plain text files, their zip archives, and audio files
- the "generated" collection includes EPUB and MOBI (a.k.a., Kindle) files, generated HTML, and more automatically generated files

Information about each collection size is available in the [metadata.json](//www.gutenberg.org/dirs/metadata.json) file at the base of the main collection. There are around 6 million files, over 60 languages, and dozens of different file formats. If creating a private mirror, you may opt to mirror only the zip files or to leave out the audio files, or other variations. The rsync `--exclude` option may be used for this.

The main collection changes daily, as new items are added or updated. The generated content may be regenerated in big batches resulting traffic spikes when refreshing the mirror.

Please note that the two collections have a very different directory structure. The main collection uses a hierarchy of small directories, e.g., eBook #12345 is stored under `1/2/3/4/12345/`. The generated content uses one huge 'root' directory with a subdirectory for each book. eBook #12345 is stored in `epub/12345/`. You should configure your server to not autoindex the huge 'root' directory. There is an `index.html` file, to make it less likely for remote HTTP clients to enumerate the entire directory.

There is an historical anomaly with the generated content. In the main collection, it is listed under `cache/epub`, while the catalog metadata uses `cache/generated`. If you would like to keep all of the content in one large directory tree, similar to how the main collection works, your front end Web server will need to redirect to use the same path. In other words, you will want a path from the catalog, such as `cache/generated/1001/1001.epub` to also be available as `cache/epub/1001/1001.epub`. We use a simple redirect within Apache for this (we put this in `apache.conf`, but it can be in other locations):
```
AllowOverride FileInfo
RewriteEngine on
RewriteRule ^cache/generated(/.*)?$ cache/epub$1 [L]
```

## Software
We highly recommend that you use *rsync* to create and refresh your mirror. The wget and cURL tools are not suitable, because they need to look at all files just to get the ones that were updated recently. rsync is available for all Unix-like systems (including macOS), and is part of Cygwin for Windows.

### Using rsync
The ibiblio site is the main home of Project Gutenberg, but it is not the only server. Below are examples for an alternate server, as well as for the main ibiblio site.

To rsync the main collection:
```
rsync -av --del rsync.ibiblio.org::gutenberg /var/www/gutenberg
rsync -av --del gutenberg.pglaf.org::gutenberg /var/www/gutenberg
```

The last parameter is the directory where you want the stuff placed in your drive.

To rsync the generated content:
```
rsync -av --del rsync.ibiblio.org::gutenberg-epub /var/www/gutenberg-generated
rsync -av --del gutenberg.pglaf.org::gutenberg-epub /var/www/gutenberg-generated
```

### Refreshing the Mirror
You should run a daily job to check for newly updated files and refresh your mirror. Unix/Linux employs cron for this; Windows systems could use the task scheduler. We can help you with setting up the mirroring software, or any other details, if you would like.

Put one or both of the aforementioned commands into a shell script and then call the shell script from your crontab.

Here is a full crontab example from one of our mirrors. Please do not just blindly copy it, though, since it will need adjusting for your environment (minimally, the directory path that is the destination for the files and pick another time of day to spread out the mirror load).
```
# Main collection
# Note: we use '--exclude=cache' because we rsync the generated collection into a
#       cache subdirectory in the next crontab so we don't want it deleted here.
15  4 * * * /usr/bin/rsync -avHS --timeout 600 --delete --exclude=cache gutenberg.pglaf.org::gutenberg /data/htdocs/gutenberg

# Generated collection
15 16 * * * /usr/bin/rsync -avHS --timeout 600 --delete gutenberg.pglaf.org::gutenberg-epub /data/htdocs/gutenberg/cache/epub
```

## Getting Your Mirror Listed
If you wish to create a public mirror, you may elect to host either the main collection, the generated collection, or both. Before you start you might want to view our [mirror list](//www.gutenberg.org/MIRRORS.ALL) to check whether the geographical location of your server would be a good addition to the list.

While you're welcome to present the public collection using any method you choose -- HTTP, FTP, rsync, TOR, BitTorrent, p2p, or others -- we ask you use rsync to create and update your copy from us.

If providing public rsync access to your mirror, here is a suggested `rsyncd.conf` file:
```
[gutenberg]
    comment = Project Gutenberg main collection
    path = /data/mirrors/gutenberg
    read only = yes
    open noatime = true
    refuse options = c
    exclude = /cache/***

[gutenberg-epub]
    comment = Project Gutenberg generated collection
    path = /data/mirrors/gutenberg/cache/epub
    read only = yes
    open noatime = true
    dont compress = *
    refuse options = c
```

Once you have successfully installed and tested your configuration, contact us and let us know. After a month or so to confirm stability and recency we'll add you to the mirror list and announce it in our next newsletter so people can find you.

The book directories are the only part we offer for mirror. The Project Gutenberg catalog in XML/RDF is in the root directory of the generated content, if you would like to make your own search software. We do not package the central search software or Web pages used at www.gutenberg.org for reuse, however you may see most tools on [github](https://github.com/gutenbergtools).

Thanks for your interest in helping Project Gutenberg reach more readers.
