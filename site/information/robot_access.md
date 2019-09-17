---
layout: default
title: PG-Robot Access to Pages
permalink: /information/robot_access.html
---

# Information About Robot Access to our Pages


Contents
1. How to Get All Ebook Files
2. How to Get Certain Ebook Files
3. How to Mirror Project Gutenberg
4. How to Get Catalog Data

## How to Get all Ebook Files
The best way to have a local up-to-date copy of all files is to setup a private mirror: See: [the Mirroring How-To]()

## How to Get Certain Ebook files
**wget** is free software and available for Linux, Windows, and Mac OS X at [www.gnu.org/software/wget/](http://www.gnu.org/software/wget)

This is an example of how to get files using wget: 

wget -w 2 -m -H "http://www.gutenberg.org/robot/harvest?filetypes[]=html"

Replace html with the file type you are interested in.

- html
- txt
- epub.images
- epub.noimages
- kindle.images
- kindle.noimages
- mp3

If you want only files in a given language say: 
wget -w 2 -m -H "http://www.gutenberg.org/robot/harvest?filetypes[]=html&langs[]=de"

Replace de with the ISO language code you are interested in. Tip: you can learn the language code of any language in the Project Gutenberg catalog by looking at the status window of your browser while moving your cursor over the language at [this page](/https://dev.gutenberg.org/ebooks/)

## How to Mirror Project Gutenberg
If you want to setup a mirror of Project Gutenberg, read the [Mirroring How-To]()

## How to Get Catalog Data
You can extract the whole Project Gutenberg catalog data from the [Project Gutenberg catalog in machine-readable format](). The catalog data is licensed under the GNU GPL. 

