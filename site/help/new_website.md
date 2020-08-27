---
layout: default
title: New Website 2020 | Project Gutenberg
permalink: /help/new_website.html
---

New Website 2020
================

On August 26 2020, the Project Gutenberg website underwent some major changes. These changes had been previewed since early 2020, and visitors to the old site were invited to try the new site, including giving input via a brief survey.

The old site is no longer available. If you found yourself on this page unexpectedly, it is because an old page was redirected here.

Please use the navigation menus at the top of the page to find what you were looking for. All of the functionality, and most of the content, from the old site is still here - but in a different location.

Below, find a description of the motivation behind the changes. Also find a description of known issues, and the items that were not brought to the new website (and how to find archived copies).

THANK YOU for your patience as we continue to update the website to fix remaining problems, and maintain all the functionality and content that visitors expect. If you encounter an issue not described below, or have a suggestion, please email help2020@pglaf.org (details below on other ways of reporting issues).


## Known issues and "TO DO" items

### Functionality issues
1. Roboting not working properly. URLs such as http://www.gutenberg.org/robot/harvest?filetypes[]=txt sometimes work, and sometimes generate a 500 server error. This might be a missing package on one of the back end servers. Status: Checking with sysadmins.
2. "Authors" match in search yields 404. For example, from this page: https://www.gutenberg.org/ebooks/search/?query=a.roosevelt&submit_search=Go%21 the "Authors" link (top left) should list all Roosevelts, but instead give a 404 at https://www.gutenberg.org/ebooks/authors/search/?query=a.roosevelt . Status: This is a template error in autocat3, being investigated.
3. "Titles" have the same issue as #4. Same status. 
4. Bookshelf editing is not currently available. Bookshelves only have older entries. Most bookshelves had not been updated recently anyway, and we hope to add bookshelf editing capabilities soon. Status: Under development.

### Content issues
1. Revise the Volunteer's FAQ (currently in "the attic" since it was outdated). **Status: The Whitewashers team is looking into this.**
2. Add these links to the DP HTML documentation, to the Volunteer's FAQ. **Status: awaiting the Volunteer's FAQ mentioned just above.**
The Post-Processing FAQ --
https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Post-Processing_FAQ
Easy Epub -- https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Easy_Epub (It's a guide to how best to handle the HTML that goes through epubmaker to lead to passable epubs/mobis)
HTML Best Practices -- https://www.pgdp.org/~jana/best-practices/ (this was written a while back but DP tries to keep it up-to-date)

### User interface and user experience issues
1. Selecting text is challenging on landing pages. For example, on this page: https://www.gutenberg.org/ebooks/13930 it is hard to select the title text ("African and European Addresses by Theodore Roosevelt") to copy-and-paste. Instead, the book image and "Download this eBook" are selected. Status: not yet determined.
2. At https://www.gutenberg.org/, the 'box of latest books' contains 10 books, but only shows 9, so I get a scroll bar. When I scroll to reveal the 10th book, the covers all shift left, but the titles below don't move. (And in fact, the 10th title is hanging off the right edge of the box.) Status: CSS issue, same as #2 under "Functionality issues."


### Search-related issues

1. UI/Search: Search output order seems random. Status: Defer. Search is handled by PostgreSQL, and unchanged from the old site.

### Items that will not be fixed
1. Wiki "user" pages. These have not been maintained, and are no longer part of the site. Archived pages are likely available at the Wayback machine, https://wayback.archive.org -- first enter the URL (such as https://www.gutenberg.org or a more specific link), then select the date of the archive snapshot to view the removed page.
2. Translated pages. These have not been maintained, and are no longer part of the site. The Wayback machine, again, should have archived copies.
3. Mobile site (http://m.gutenberg.org) was retired, since the new website is responsive for smaller screens and has all the same functionality. This retirement was originally planned to happen later, but the site was unmaintained and had some issues that forced early retirement.


# New Website Overview

The Project Gutenberg website, along with some of its back-end functionality, has undergone major updates in 2019 and 2020. On August 26 2020, the legacy site was retired and the new site went into service - this followed over six months of public "beta" testing, when members of the public were invited to visit the new site and give input (including a brief anonymous survey).

Input, fixes and suggestions are welcome. The website is still undergoing development, and the basic look-and-feel (menus, colors, fonts, etc.) has been updated with the new design.


## Goals

Goals for the website redesign and back-end updates include:

* Modernize the website, including a responsive design and updated content. Deprecation or removal of outdated content. 
* Abandonment of non-English website pages, which generally have been unmaintained for years. (Interest in non-English eBooks remains strong, and there has been no decrease in the enthusiasm for non-English eBooks.)
* Utilize HTML version 5 and Cascading Style Sheets for the entire experience. The site no longer requires Javascript, and uses dynamically-generated pages only for eBook landing pages and search results. 
* Discontinue the mobile site (previously at http://m.gutenberg.org), which was unmaintained and utilized older-style PHP that was vulnerable to mis-use.
* Stop utilizing MediaWiki for the main pages. Instead, write page content in Markdown. Propagate the content to the website automatically, with HTML5+CSS for layout, menus, etc.
* Make the whole website content publicly available for edit suggestions. We are using github for this. 
* Make the metadata and site structure more easily mirrorable, whether in bulk or for subsets. This is partially done by using github for website content. In the future, we plan to make landing pages use static HTML5+CSS, instead of via autocat3 (below).
* In the future, we hope to make the eBooks themselves available similarly (via github). This will facilitate reader-contributed formats, as well as new methods for errata reporting and fixes.

## How to provide input, fixes and suggestions

Please first check below in case your suggestion is already being worked on.

### General reporting of errors

First, if you find a error, typo, etc. within an eBook you can report it using the [regular mechanisms](/help/errata.html). The eBooks themselves are exactly the same on this new site as on the old (i.e., the exact same files).

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

*Most recently updated: August 27, 2020*

