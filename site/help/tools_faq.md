---
layout: default
title: PG-Tools FAQ
permalink: /how_to/tools_faq.html
---

# Tools FAQ
This page is no longer actively maintained. Some content may be inaccurate or outdated, including external links. Please visit [Distributed Proofreaders](/how_to/http://www.pgdp.net) to view forums where best practices are actively discussed and maintained. 

<div class="contents">
<ol>
<li><a href="#what-useful-programs-are-available-for-project-gutenberg-work">What useful programs are available for Project Gutenberg work?></a>
<ol class="inner_1">
<li><a href="#ocr">OCR</a></li>
<li><a href="#editing">Editing</a></li>
<li><a href="#checking-and-proofing">Checking and proofing</a></li>
<li><a href="#working-with-html">Working with HTML</a></li>
<li><a href="#working-with-images">Working with images.</a></li>
</ol>
</li>
<li><a href="#">What programs could I write to help with PG work?></a></li>
</ol>
</div>

## What useful programs are available for Project Gutenberg work?
These suggestions came largely from a poll of volunteers in June, 2002. The programs listed are a summary of the programs we actually use. There are many other programs out there that can do the same jobs, so don't limit your search just to these. 

### OCR 
These are the three main commercial packages that volunteers bought specifically for the purpose. In a few cases, people had got older versions of these bundled with their scanners. 

|Abbyy|[http://www.abbyy.com](http://www.abbyy.com)|
|OmniPage|[http://www.omnipage.com](http://www.omnipage.com)|
|TextBridge|[http://www.textbridge.com](http://www.textbridge.com)|

These are Free Software packages. Some people who responded to the survey had tried them, but nobody had actually used them to produce a text. 

|Clara OCR|[http://www.claraocr.org/](http://www.claraocr.org)|
|Gocr|[http://jocr.sourceforge.net](http://jocr.sourceforge.net)|

This one is interesting--you can just submit your image through a web page, and the service will return OCRed text. However, the process of submission, waiting for your text, and then cutting and pasting into your document is slow. 

|DocMorph -- a free, web-based OCR|[http://docmorph.nlm.nih.gov/docmorph/](http://docmorph.nlm.nih.gov/docmorph/)|

Other volunteers use various OCR software that came bundled with their scanner. 

### Editing
The main answers, given by more than one person, were: 

|AbiWord|[http://www.abiword.org](http://www.abiword.org)|
|emacs| | 	
|Microsoft Word| | 
|vi| | 	
|Windows WordPad| |
|Word Perfect| | 	

Other editors mentioned included:

|Crisp for Windows|[http://www.crisp.demon.co.uk/](http://www.crisp.demon.co.uk)|
|Editpad for Windows|[http://www.editpadpro.com/](http://www.editpadpro.com)|
|Editplus for Windows|[http://editplus.com/](http://editplus.com)|
|Foxpro 2.6 for DOS||
|Metapad|[http://www.liquidninja.com/metapad/](http://www.liquidninja.com/metapad/)|
|Windows Notepad|

Programs recommended by Apple Macintosh users included: 

|AppleWorks| 	
|BBEdit Lite|[http://www.barebones.com/products/bbedit_lite.html](http://www.barebones.com/products/bbedit_lite.html)|
|Microsoft Word| 	
|Nisus Writer|[http://www.nisus.com/](http://www.nisus.com/)|
|Text-Edit Plus|[http://hometown.aol.com/tombb](http://hometown.aol.com/tombb)|
|TextSpresso|[http://www.taylor-design.com/textspresso/](http://www.taylor-design.com/textspresso/)|
|Add/Strip|[ftp://mirrors.aol.com/pub/info-mac/_Text_Processing/](ftp://mirrors.aol.com/pub/info-mac/_Text_Processing/)|

### Checking and proofing
For spelling, most people just use the spellchecker built into their editor or word-processor. The *nix users running emacs or vi tended to use variants of the standard Unix spell command, such as ispell or aspell. Mac users have the free spelling checker Excalibur, available from <[http://www.eg.bucknell.edu/~excalibr/excalibur.html](http://www.eg.bucknell.edu/~excalibr/excalibur.html)>

Gutcheck <[http://gutcheck.sourceforge.net](http://gutcheck.sourceforge.net)> was used for format checking, and a few people had written some checking procedures of their own.

### Working with HTML
In the survey, most volunteers preferred to handcraft their HTML using their normal editor. Those using a word processor edited the HTML as text, rather than composing a word processor file and then Saving As HTML. There was remarkable unanimity on this.

Specific HTML editors that were mentioned for occasional use were: 
|Mozilla Composer|[http://www.mozilla.org](http://www.mozilla.org)|
|HTMLKit|[http://www.chami.com/html-kit/](http://www.chami.com/html-kit)|
|HTMLPad|[http://www.intermania.com/htmlpad/](http://www.intermania.com/htmlpad/)|

However, not all HTML work is about editing, and the following packages were honorably mentioned for other functions. Especially important is Tidy, which is pretty much necessary for all but the most experienced people for quick HTML checking. <http://tidy.sourceforge.net> has the original, and links to versions of Tidy for Windows (Tidy-GUI) and just about all other platforms.

GutenMark:
Converts Project Gutenberg texts to HTML and TeX.
<[http://www.sandroid.org/GutenMark/](http://www.sandroid.org/GutenMark/)>

HTMSTRIP by Bruce Guthrie:
MS-DOS. Converts HTML to text
<[http://users.erols.com/waynesof/bruce.htm](http://users.erols.com/waynesof/bruce.htm)>

Lynx (lynx --dump):
Converts HTML to text
<[http://lynx.browser.org/](http://lynx.browser.org/)>

Dave Raggett's HTML Tidy:
Checks HTML for correctness, reformats and fixes
<[http://tidy.sourceforge.net](http://tidy.sourceforge.net)>

W3C html2txt (web-based):
Converts HTML to plain text.
<[http://cgi.w3.org/cgi-bin/html2txt](http://cgi.w3.org/cgi-bin/html2txt)>

W3C Validator (web-based):
The Last Word on the correctness of HTML.
<[http://validator.w3.org](http://validator.w3.org)>

wget:
A very neat utility for getting web pages
<[http://www.gnu.org/software/wget/](http://www.gnu.org/software/wget/)>

### Working with images
There are two main applications of images in PG--images to be used within texts, like illustrations in HTML, and the management of page images for scanning. These packages are used by volunteers variously for both of those purposes. Their typical use within PG is indicated. "Advanced image processing" packages will permit you to edit and restore damaged images, but for PG work, we mostly just need to manage, convert, resize and crop them.

ACDSEE for Windows
For image reviewing
<[http://www.acdsystems.com](http://www.acdsystems.com)>

Adobe Photoshop
For advanced image processing
<[http://www.adobe.com/products/photoshop/main.html](http://www.adobe.com/products/photoshop/main.html)>

ImageMagick for *nix, Mac and Windows
Resizing and format conversion
<[http://www.imagemagick.org/](http://www.imagemagick.org/)>

Irfanview for Windows
Image viewing, conversion, cropping and resizing
<[http://www.irfanview.com](http://www.irfanview.com)>

The Gimp
For advanced image processing
<[http://www.gimp.org/](http://www.gimp.org/)>

Picture Publisher
For advanced image processing

VuePrint Pro
For viewing images
<[http://www.hamrick.com/](http://www.hamrick.com/)>

## What programs could I write to help with PG work?
Look at the programs listed above. Can you write a better version of any of them? Improving OCR and editors constitutes a major challenge, unless you're a world-class expert, but checking and reformatting texts is an area not addressed by large scale programs, and you might contribute there.

At the risk of sounding facetious, the very best thing you can do is figure out ways that more programming can help Project Gutenberg!

A lot of programmers work on PG books, and anything easy has probably already been done. The challenge for programmers who want to write something that will help to produce etexts is not in writing the code; it's in identifying ways that programs can help.

Whatever you do, don't just hang around waiting for someone to ask you to write something, because that's not going to happen. Think up a project, ask volunteers if they would use it, and dig in! Better still, produce a few etexts yourself, using the existing tools, and get a feel for the kinds of problems that new software could help with.

You can join gutvol-p, our mailing list for programmers, to discuss this with other programmers. 
