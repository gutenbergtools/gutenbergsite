---
layout: default
title: Offline Catalogs | Project Gutenberg
permalink: /ebooks/offline_catalogs.html
---

Offline Catalogs
================

This page tells you how to find and get Project Gutenberg eBooks if:
- you don't want to use a browser to download eBooks but prefer other software like an ftp-client or wget, or
- you are on a slow or limited internet connection, or
- you'd rather have a handy book catalog to consult offline, or
- you would like to make your own listings or derivatives from this information.

## List of Sites Hosting Project Gutenberg EBooks

The Project Gutenberg collection is available from dozens of sites offering access via http/https, ftp, rsync, and a few other methods. See our listing of [mirror sites](/dirs/MIRRORS.ALL) to choose the location, access method, or speed.  Mirrors generally do not have a friendly Web-based front end, but do have the collection.  See the [mirroring how-to](/help/mirroring.html) for details.

## The GUTINDEX Listings of EBooks

Updated at least monthly.  These plain text files provide the basic information about each eBook, and are good for searching from your own system (for example, use control-F in a Web browser or word processor).  Note that these files are not recommended for automation (that is, to use as input to generate a computerized database).  Instead, use one of the catalog files mentioned below.

* [GUTINDEX.ALL](/dirs/GUTINDEX.ALL)
* [GUTINDEX.zip](/dirs/GUTINDEX.zip) (same as above zipped)

### GUTINDEX Listings by Year

If GUTINDEX.ALL is too big for you or you prefer separate annual lists, you can download GUTINDEX files by year.

<div class="search_category">
 <ul>
  <li><a href="/dirs/GUTINDEX.2019">GUTINDEX.2019</a></li>
  <li><a href="/dirs/GUTINDEX.2018">GUTINDEX.2018</a></li>
  <li><a href="/dirs/GUTINDEX.2017">GUTINDEX.2017</a></li>
  <li><a href="/dirs/GUTINDEX.2016">GUTINDEX.2016</a></li>
  <li><a href="/dirs/GUTINDEX.2015">GUTINDEX.2015</a></li>
  <li><a href="/dirs/GUTINDEX.2014">GUTINDEX.2014</a></li>
  <li><a href="/dirs/GUTINDEX.2013">GUTINDEX.2013</a></li>
  <li><a href="/dirs/GUTINDEX.2012">GUTINDEX.2012</a></li>
  <li><a href="/dirs/GUTINDEX.2011">GUTINDEX.2011</a></li>
  <li><a href="/dirs/GUTINDEX.2010">GUTINDEX.2010</a></li>
  <li><a href="/dirs/GUTINDEX.2009">GUTINDEX.2009</a></li>
  <li><a href="/dirs/GUTINDEX.2008">GUTINDEX.2008</a></li>
  <li><a href="/dirs/GUTINDEX.2007">GUTINDEX.2007</a></li>
  <li><a href="/dirs/GUTINDEX.2006">GUTINDEX.2006</a></li>
  <li><a href="/dirs/GUTINDEX.2005">GUTINDEX.2005</a></li>
  <li><a href="/dirs/GUTINDEX.2004">GUTINDEX.2004</a></li>
  <li><a href="/dirs/GUTINDEX.2003">GUTINDEX.2003</a></li>
  <li><a href="/dirs/GUTINDEX.2002">GUTINDEX.2002</a></li>
  <li><a href="/dirs/GUTINDEX.2001">GUTINDEX.2001</a></li>
  <li><a href="/dirs/GUTINDEX.2000">GUTINDEX.2000</a></li>
  <li><a href="/dirs/GUTINDEX.1999">GUTINDEX.1999</a></li>
  <li><a href="/dirs/GUTINDEX.1998">GUTINDEX.1998</a></li>
  <li><a href="/dirs/GUTINDEX.1997">GUTINDEX.1997</a></li>
  <li><a href="/dirs/GUTINDEX.1996">GUTINDEX.1996</a> (and earlier)</li>
 </ul>
</div>

## Directory/Folder Listings

You can navigate the directory/folder contents starting at [/dirs](/dirs), however this is not very user-friendly.

## The Project Gutenberg Catalog Metadata in Machine-Readable Format

### XML/RDF 

All Project Gutenberg metadata are [available digitally](/dirs/cache/feeds/) in the XML/RDF format. This is updated daily (other than the legacy format mentioned below). Please use one of these files as input to a database or other tools you may be developing, instead of [crawling or roboting](/policy/robot_access.html) the website.

Note that the exact same metadata is available as a *per-eBook* .rdf file. These are found in the cache/epub (i.e., cache/generated) directory, accessible by mirroring or by the directory/folder listings above. The large XML/RDF file is simply a concatenation of all the per-eBook metadata.

### MARC Records (MAchine Readable Cataloging)

MARC is a common metadata format utilized by library card catalog databases. Steve Thomas of the University of Adelaide provided a Perl script to generate MARC records from the XML/RDF catalog files. Find it here: [pgrdf2marc.pl](/gutenberg/pgrdf2marc.pl.txt). You will need to rename it, and make any necessary changes to run on your own system. This is unsupported software, provided without warranty or guarantee.

These instructions were provided to Project Gutenberg, and are listed here in the hopes they may be useful. 

- Download the XML/RDF file (i.e., [https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip](https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.zip).
- Unzip, untar
- Run your modified copy of the Adelaide script above, pgrdf2marc.pl, against the untarred/unzipped RDF files to generate MARC records (there may be a few RDF records that do not convert, perhaps as many as 100)

## A Local, Browsable Copy on your own Computer or Mobile Device
[Kiwix](https://wiki.kiwix.org/wiki/Content) is an application that lets you download a large collection and use it locally.  A copy of the Project Gutenberg content was made available in November 2018, and may be updated periodically.
