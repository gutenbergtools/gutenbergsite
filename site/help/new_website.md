---
layout: default
title: New Website 2020 | Project Gutenberg
permalink: /help/new_website.html
---

New Website 2020
================

The Project Gutenberg website, along with some of its back-end functionality, has been undergoing major updates. The new website is available for public beta testing. Input, fixes and suggestions are welcome.

You can find the development site at [dev.gutenberg.org](https://dev.gutenberg.org) (http or https). The main production site remains at [www.gutenberg.org](https://www.gutenberg.org).

## Goals

Goals for the website redesign and back-end updates include:

* Modernize the website, including a responsive design and updated content. Deprecation or removal of outdated content. 
* Abandonment of non-English website pages, which generally have been unmaintained for years. (Interest in non-English eBooks remains strong, and there has been no decrease in the enthusiasm for non-English eBooks.)
* Utilize HTML version 5 and Cascading Style Sheets for the entire experience. We will no longer require Javascript, and will only use dynamically-generated pages where they truly make sense (such as for searching). 
* Stop utilizing MediaWiki for the main pages. Instead, write page content in Markdown. Propagate the content to the website automatically, with HTML5+CSS for layout, menus, etc.
* Make the whole website content publicly available for edit suggestions. We are using github for this. 
* Make the metadata and site structure more easily mirrorable, whether in bulk or for subsets. This is partially done by using github for website content. In the future, we plan to make landing pages use static HTML5+CSS, instead of via autocat3 (below).
* In the future, we hope to make the eBooks themselves available similarly. This will facilitate reader-contributed formats, as well as errata reporting and fixes.

## How to provide input, fixes and suggestions

Please first check below in case your suggestion is already being worked on.

### General reporting of errors

First, if you find a error, typo, etc. within an eBook you can report it using the [regular mechanisms](/help/errata.html). The eBooks themselves are exactly the same (i.e., the exact same files), whether you are looking at the development site or the main site.

If you are not sure how to report a problem you find, it's fine to just email help2020@pglaf.org. It will get to the right person.

### Layout and design

If you have suggestions or find problems with the website pages (i.e., not the eBooks, but the various other items like the "help" and "about" pages), please report them.

Easiest might be email help2020@pglaf.org. Or, you could join the [gutvol-d](https://lists.pglaf.org) mailing list to bring up your suggestions.

### Typos, wording changes, etc.

The words and structure of the website are in a [github repository](https://github.com/gbnewby/gutenbergsite), and are available for submission of issues, pull requests, or examination.

You can also suggest changes or report problems as described above for layout and design.

### Generated formats

A new version of [ebookmaker](https://github.com/gutenbergtools/ebookmaker) went into production in late December 2019. This is what creates our EPUB and MOBI (Kindle) formats. You can run it yourself on the PGLAF upload portal's [ebookmaker test page](https://ebookmaker.pglaf.org).

If you find problems with the generated formats, let us know. The ebookmaker program is under continuous development, and as it is improved we are gradually re-generating all 60,000+ eBooks (and iterating, when further improvements are made).

The link above goes to the github page for ebookmaker. You can submit issue reports or new code ("pull requests") there.

### Compatibility, accessibility, usability

The new website utilizes HTML5 and CSS to provide a single location intended to be suitable for everyone:
* Mobile devices (smartphones etc.).
* Tablets and other touch-screen interfaces.
* Bigger or smaller screens.
* Text-to-speech and text-to-Braille screen readers.
* Suitable for persons with visual impairments, including low vision and color blindness

If you encounter something that doesn't work for you, or could be better, please let us know using one of the methods above. Email help2020@pglaf.org or use one of the other reporting methods described on this page.

It is especially important that we can understand what you are experiencing, and what could be improved. To help with this, please provide a description of how you accessed the website, and the problems encountered. If you know of external testing sites, or standards, or software that we should look into, please let us know.

Eventually, we hope to retire much or all of the current Project Gutenberg [mobile site](http://m.gutenberg.org), because it does not have anyone maintaining it, and it lacks much of the functionality and content of the main site. 

## Known issues and "TO DO" items

### Content issues
1. Revise the Volunteer's FAQ (currently in "the attic" since it was outdated). **Status: The Whitewashers team is looking into this.**
2. Add these links to the DP HTML documentation, to the Volunteer's FAQ. **Status: awaiting the Volunteer's FAQ mentioned just above.**
The Post-Processing FAQ --
https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Post-Processing_FAQ
Easy Epub -- https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Easy_Epub (It's a guide to how best to handle the HTML that goes through epubmaker to lead to passable epubs/mobis)
HTML Best Practices -- https://www.pgdp.org/~jana/best-practices/ (this was written a while back but DP tries to keep it up-to-date)


### User interface and user experience issues
1. Logo improvements. Some changes to the size and layout of the logos, which generally appear on the top left of the new website's pages. **Status: being worked on.**


### Search-related issues

The [autocat3](https://github.com/gutenbergtools/autocat3) program handles search, and also generates landing pages. There are probably some remaining problems with how results are displayed, or possibly with wrong links in bibrec tabs. If you find a problem, please send the exact link or search you used, so we can replicate and fix.
1. UI/Search: Search output order seems random.**Status: Defer. Search is handled by PostgreSQL, and unchanged from the current site. We will look into a different search implementation, for the future.**

*Most recently updated: August 25, 2020*

