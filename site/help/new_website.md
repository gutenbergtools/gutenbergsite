---
layout: default
title: New Website 2020 | Project Gutenberg
permalink: /help/new_website.html
---

New Website 2020
================

The Project Gutenberg website, along with some of its back-end functionality, has been undergoing major updates. As of January 2020, the new website is available for public beta testing. Input, fixes and suggestions are welcome.

You can find the development site at [dev.gutenberg.org](https://dev.gutenberg.org) (http or https). The main production site remains at [www.gutenberg.org](https://www.gutenberg.org).

## Goals

Goals for the website redesign and back-end updates include:

* General modernization of the website, including a responsive design and updated content. Deprecation or removal of outdated content. Abandonment of non-English website pages, which generally have been unmaintained for years. (Interest in non-English eBooks remains strong, and there has been no decrease in the enthusiasm for non-English eBooks.)
* Using HTML version 5 and Cascading Style Sheets for the entire experience. We will no longer require Javascript, and will only use dynamically-generated pages where they truly make sense (such as for searching). 
* Stop utilizing MediaWiki for the main pages. Instead, write page content in Markdown. Propagate the content to the website automatically, with HTML5+CSS for layout, menus, etc.
* Make the whole website content publicly available for edit suggestions. We are using github for this. 
* Make the metadata and site structure more easily mirrorable, whether in bulk or for subsets. This is partially done by using github for website content. In the future, we plan to make landing pages use static HTML5+CSS, instead of via autocat3 (below).
* In the future, we hope to make the eBooks themselves available similarly. This will facilitate reader-contributed formats, as well as errata reporting and fixes.

## Known issues
* Some pages are not yet ported. This includes the Michael Hart eulogy, and a few pages that are outdated or deemed less important. If you find a page that isn't ported, and should be, please let us know.
* Bookshelves are not implemented on the new site yet. 
* The links in the bibrec tabs for landing pages for eBooks should all work, but they go to a mixture of static and dynamic pages. Links to "also" and "locss" might not be working.
* The [autocat3](https://github.com/gutenbergtools/autocat3) program handles search, and also generates landing pages. There are probably some remaining problems with how results are displayed, or possibly with wrong links in bibrec tabs. If you find a problem, please send the exact link or search you used, so we can replicate and fix. Also note that autocat3 presents results in HTML 4, with somewhat different headers and without customization for mobile/smaller viewers. The rest of the site is in HTML5.
* CSS anomalies appear in the shared areas under the "Quick search" item (top right of most pages). CSS anomalies also make the right end of the "Some of our latest eBooks" section on the main page appear white, instead of shaded.
* Some "responsive" aspects of the site are not quite right, especially on smaller screens. We hope to fix these with improved CSS. Examples include: 3-column layout on help/FAQ page does not switch to 1-column when made narrow. Bottom-most pop-up menus (top of each page) are not reachable with short screens, and spacing between menu items isn't ideal. 
* Translated pages will *not* be ported. The www.gutenberg.org site has always been written in English, and in the past there was some capability of hosting pages translated into other languages. However, this was never adequately maintained, and has resulted in outdated and unmaintained content in non-English. Instead, those wishing a translated site can now copy the structure and English contents from the github pages, and make their own website.

## How to provide input, fixes and suggestions

### General reporting of errors

First, if you find a error, typo, etc. within an eBook you can report is using the [regular mechanisms](/help/errata.html). The eBooks themselves are exactly the same (i.e., the exact same files), whether you are looking at the development site or the main site.

If you are not sure how to report a problem you find, it's fine to just email the errata address. It will get to the right person eventually.

### Generated formats

A new version of [ebookmaker](https://github.com/gutenbergtools/ebookmaker) went into production in late December 2019. This is what creates our EPUB and MOBI (Kindle) formats. You can run it yourself on the PGLAF upload portal's [ebookmaker test page](https://ebookmaker.pglaf.org).

If you find problems with the format of the generated formats, let us know. The ebookmaker program is under continuous development, and as it is improved we are gradually re-generating all 60,000+ eBooks.

The link above goes to the github page for ebookmaker. You can submit issue reports or new code ("pull requests") there.

### Layout and design

If you have suggestions or find problems with the website pages (i.e., not the eBooks, but the various other items like the "help" and "about" pages), please report them.

Easiest might be to email to help2020@pglaf.org. Alternatively, submit an errata report as described above. Or, you could join the [gutvol-d](https://lists.pglaf.org) mailing list to bring up your suggestions.

### Typos, wording changes, etc.

The words and structure of the website are in a [github repository](https://github.com/gbnewby/gutenbergsite), and are available for submission of issues, pull requests, or examination.

You can also suggest changes or report problems as described above for layout and design.

### Compatibility, accessibility, usability

The new website utilizes HTML5 and CSS to provide a single location intended to be suitable for everyone:

* Mobile devices (smartphones etc.).
* Tablets and other touch-screen interfaces.
* Bigger or smaller screens.
* Text-to-speech and text-to-Braille screen readers.
* Suitable for persons with visual impairments, including low vision and color blindness

If you encounter something that doesn't work for you, or could be better, please let us know using one of the methods above. 

It is especially important that we can understand what you are experiencing, and what could be improved. To help with this, please provide a description of how you accessed the website, and the problems encountered. If you know of external testing sites, or standards, or software that we should look into, please let us know.

Eventually, we hope to retire much or all of the current Project Gutenberg [mobile site](http://m.gutenberg.org), because it does not have anyone maintaining it, and it lacks much of the functionality and content of the main site. 

*Most recently updated: January 12, 2020*

