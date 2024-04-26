---
layout: default
title: Robot Access to Pages | Project Gutenberg
permalink: /policy/robot_access.html
---

Information About Robot Access to our Pages
===========================================

<div class="box_shadow"><b>The Project Gutenberg website is intended for human users only.</b> Any perceived use of automated tools to access the Project Gutenberg website will result in a temporary or permanent block of your IP address. The only exceptions to this rule are below.</div>
<div class="contents">
Contents
<ol>
<li><a href="#how-to-get-all-ebook-files"> How to Get All Ebook Files</a></li>
<li><a href="#how-to-get-certain-ebook-files"> How to Get Certain Ebook Files</a></li>
<li><a href="#how-to-mirror-project-gutenberg"> How to Mirror Project Gutenberg</a></li>
<li><a href="#how-to-get-catalog-data"> How to Get Catalog Data</a></li>
</ol>
</div>
## How to Get all Ebook Files
The best way to have a local up-to-date copy of all files is to setup a private mirror: See: [the Mirroring How-To](/help/mirroring.html)

## How to Get Certain Ebook files
**wget** is free software and available for Linux, Windows, and Mac OS X at [www.gnu.org/software/wget/](http://www.gnu.org/software/wget)

This is an example of how to get files using wget: 

<pre>wget -w 2 -m -H "http://www.gutenberg.org/robot/harvest?filetypes[]=html"</pre>

Replace html with the file type you are interested in.

- html
- txt
- epub.images
- epub.noimages
- kindle.images
- kindle.noimages
- mp3

If you want only files in a given language say: 
<pre>wget -w 2 -m -H "http://www.gutenberg.org/robot/harvest?filetypes[]=html&langs[]=de"</pre>

Replace 'de' with the ISO language code you are interested in. Tip: you can learn the language code of any language in the Project Gutenberg catalog by looking at the status window of your browser while moving your cursor over the language at [this page](/ebooks/)

## How to Mirror Project Gutenberg
If you want to setup a mirror of Project Gutenberg, read the [Mirroring How-To](/help/mirroring.html)

## How to Get Catalog Data
You can extract the whole Project Gutenberg catalog data from the [Project Gutenberg catalog in machine-readable format](/ebooks/offline_catalogs.html). The catalog data are granted to the public domain.

## Files change frequently
Project Gutenberg publishes hundreds of new eBooks every month, and we also fix hundreds of books when issues like typos are reported. In addition, the 'generated' formats (under the 'cache' top-level directory) are re-built monthly and sometimes have changes due to improvements in the software that builds them.

When you save a copy of a Project Gutenberg eBook, consider periodically checking for any changes.

