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

## How to provide input, fixes and suggestions

Please first check below in case your suggestion is already being worked on.

### General reporting of errors

First, if you find a error, typo, etc. within an eBook you can report is using the [regular mechanisms](/help/errata.html). The eBooks themselves are exactly the same (i.e., the exact same files), whether you are looking at the development site or the main site.

If you are not sure how to report a problem you find, it's fine to just email the errata address. It will get to the right person eventually.

### Generated formats

A new version of [ebookmaker](https://github.com/gutenbergtools/ebookmaker) went into production in late December 2019 and is being regularly updated. This is what creates our EPUB and MOBI (Kindle) formats. You can run it yourself on the PGLAF upload portal's [ebookmaker test page](https://ebookmaker.pglaf.org).

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

## Known issues
1. Some pages are not yet ported. This includes the Michael Hart eulogy, and a few pages that are outdated or deemed less important. If you find a page that isn't ported, and should be, please let us know.
2. Bookshelves are not implemented on the new site yet. 
3. The links in the bibrec tabs for landing pages for eBooks should all work, but they go to a mixture of static and dynamic pages. Links to "also" and "locss" might not be working.
4. The [autocat3](https://github.com/gutenbergtools/autocat3) program handles search, and also generates landing pages. There are probably some remaining problems with how results are displayed, or possibly with wrong links in bibrec tabs. If you find a problem, please send the exact link or search you used, so we can replicate and fix. Also note that autocat3 presents results in HTML 4, with somewhat different headers and without customization for mobile/smaller viewers. The rest of the site is in HTML5.
5. Some "responsive" aspects of the site are not quite right, especially on smaller screens. We hope to fix these with improved CSS. Bottom-most pop-up menus (top of each page) are not reachable with short screens, and spacing between menu items isn't ideal. 
6. Translated pages will **not** be ported. The www.gutenberg.org site has always been written in English, and in the past there was some capability of hosting pages translated into other languages. However, this was never adequately maintained, and has resulted in outdated and unmaintained content in non-English. Instead, those wishing a translated site can now copy the structure and English contents from the github pages, and make their own website.

## Issues being considered or investigated
These are mostly from reports that still need consideration, or might have some different approaches that need to be assessed:
### UI Related Issues
1. UI: The "Project Gutenberg" logo in upper left should be bigger. Printing press in the logo looks like R2D2. favicon.ico isn't as bold as it used to be. **Status: Under consideration, including during user testing.**
2. UI: Do you really need the Help and Information topic for the mainpage since you have a Help item going elsewhere in the site and this particular info isn't really key like the info about books and how to create the books. **Status: awaiting user testing.**
3. UI/Search: Advanced Search has three different button styles. This is distracting for users.**Status: Consider changing; consider asking during user evaluation.**
4. CSS: How to make pop-up menu list display fit better? First, I couldn’t figure out how to get less spacing between the pop-up menu items (there is too much space before/after, and should be automatic spacing). Second, and more importantly, on a very small screen the menu items at the bottom of the list are unreachable (i.e., shrink your screen, and you’ll see they cannot be reached). Can this be some sort of scrollable list? **Status: Investigating. Decreased min-width for less spacing between menu items.**
5. autocat3/Search: On narrow screens, landing pages are squished and the footer disappears.
6. CSS: Reordered "Help" menu text is messed u, wrapping improperly. **Status: Will fix.**
7. CSS: Problem with 'Help' menu showing overstruck text. **Status: Will fix.**
### Content issues
1. Redirect pages and updates to the 404 error are needed to help people find new pages, when using an older link (such as from MediaWiki). **Status: Will do before the main site changeover.**
2. Revise the Volunteer's FAQ (currently in "the attic" since it was outdated). **Status: The Whitewashers team is looking into this. The above links might do well in that FAQ, though the FAQ is geared towards solo producers.**
3. Content: Add these links to the DP HTML documentation somewhere. **Status: Need to decide where to put the links, and this depends on the Volunteer's FAQ mentioned just above.**
The Post-Processing FAQ --
https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Post-Processing_FAQ
Easy Epub -- https://www.pgdp.net/wiki/DP_Official_Documentation:PP_and_PPV/Easy_Epub (It's a guide to how best to handle the HTML that goes through epubmaker to lead to passable epubs/mobis)
HTML Best Practices -- https://www.pgdp.org/~jana/best-practices/ (this was written a while back but DP tries to keep it up-to-date)

### HTML, server and autocat3 Related Issues
1. HTML: The site embeds Facebook and Twitter metadata to support rendering nicely on these platforms but doesn't embed structured data for the same effect on Google https://developers.google.com/search/docs/guides/intro-structured-data. **Status: All the headers need to be investigated and updated.** Note especially that autocat3, PHP and gutenbergsite all have different headers (autocat3 actually has multiple headers, via Genshi templates), and that only gutenbergsite is HTML5. So, we need to work towards a single header base that is valid, and suitable for HTML5 and HTML4.
2. HTML/autocat3: The session ID is included in the query parameters of Kindle and ePub download links. This could expose the session ID to intermediaries (caches, CDNs, ISPs). **Status: It's not clear whether or why this is necessary, since the downloads are to static files. It might be we can disable this.**
3. HTML: Content-Security-Policy (CSP) header is not being returned. Implementing a CSP goes a long way in mitigating XSS attacks https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP). **Status: Part of the header investigation mentioned above.**
4. autocat3: JS and CSS source isn't minified leaking library names and versions https://snyk.io/vuln/search?type=npm&q=jquery. **Status: We plan to have no Javascript at all in the future. The only remaining Javascript is for switching between bibrec & download tabs on eBook landing pages such as https://dev.gutenberg.org/ebooks/11 .. we hope to instead to that in HTML5.**
5. HTTPD: The server cache (Varnish) is returned in the X-Varnish and Via headers https://www.cvedetails.com/vulnerability-list/vendor_id-12937/Varnish-cache.html. **Status: being investigated.**

### Search-related issues

Search functionality is provided by autocat3 and PHP, utilizing the back-end PostgreSQL database. This functionality is unchanged from the legacy site, though presentation/layout is different. Search improvements will be considered in the future.
1. UI/Search: Search output order seems random.**Status: Defer. Search is handled by PostgreSQL, and unchanged from the current site. We will look into a different search implementation, for the future.**
2. autocat3/Search: Advanced Search, Author: "Agatha Christie" and "Ernest Hemingway": the two searches give a very different layout. **Status: Defer. Search is handled by PostgreSQL, and unchanged from the current site. We will look into a different search implementation, for the future.**


*Most recently updated: January 24, 2020*

