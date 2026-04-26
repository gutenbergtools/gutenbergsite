---
layout: default
title: Accessibility at Project Gutenberg
permalink: /a11y/
---

# Accessibility at Project Gutenberg

Both Project Gutenberg and Distributed Proofreaders have long worked to make our ebooks accessible to users with reading disabilities. Our accessibility roadmap was launched over 15 years ago, when Distributed Proofreaders published  [these guidelines](https://www.pgdp.net/wiki/Accessibility_Recipes)

In 2023 we completed a two-year-long effort to convert all the books in our collection to HTML5 and EPUB3. These formats allow for accessibility metadata, as found today in all our EPUB3 files. In 2025 year we rolled out a refined website design with many attributes to improve accessibility and enable people to enjoy our books using screen readers or refreshable braille displays. We recently tested the website with [WAVE](https://wave.webaim.org/) and addressed all the errors it reported.

This year, in response to requests from schools and libraries subject to the American Disabilities Act Title II, we began an effort to document our accessibility attributes and shortcomings in the standard form used by commercial publishers - the voluntary accessibility attributes template, or VPAT. These are necessarily works in progress, and we invite feedback and suggestions for improvement from any institution or concerned with accessibility.

We will maintain four separate VPATs covering:

- Our website, excluding the ebook files it makes available.
- Our plain text files (some of which date back to 1971!)
- Our generated HTML files - these are regenerated every month.
- Our EPUB3 files - these are generated from the HTML files and include accessibility metadata.


## The Project Gutenberg Website

The website aims to comply with WCAG 2.2 AA. Here's the [website VPAT](pg-vpat-website.html) It's very likely that much can be improved, and we welcome suggestions on how to do that. It's relatively simple, and hardly uses any javascript, which makes testing a lot easier. We'd especially welcome comments about issues on mobile devices and on assistive technology - it's impossible to test everything. Our accessibility contact is in the website footer.


## Plain Text Files

... coming soon.

## HTML files

... coming soon.

## EPUB3 files

In a collection of over 75,000 books produced by hundreds of different volunteers, many books will succeed in AAA criteria, while some will fail for A criteria. Here's the [EPUB3 VPAT](pg-vpat-epub3.html) While Project Gutenberg endeavors to update its entire collection to modern accessibility standards, it is not realistic to expect 100% compliance for the foreseeable future. Many books are compliant today; others are more problematic. In addition, EPUB3 files can be read on many different reading systems, including systems that have deficient support for EPUB3 or for current accessibility standards.

## Ongoing Accessibility Projects

Accessibility work is never done.

### AltPoet

The AltPoet Project aims to address the inconsistent use of alt-text in the Gutenberg corpus. In 2024 we took a census of the images in our books and found that our collection has more than 400,000 images without the appropriate “alt-text” needed to make the books more accessible.

Currently at [https://altpoet.ebookfoundation.org/](altpoet.ebookfoundation.org), Altpoet is a tool that allows volunteers ("alt-poets") to view images and alt-text in context, create new alt-text, edit alt-text created by AI services, and identify images that are decorative in nature, and thus need appropriate mark-up.


Creating alt text requires some training and a different set of skills from the proofreading and HTML formatting work that Distributed Proofreaders and Project Gutenberg have done so well at. I’m hoping that people who care about accessibility and have a knack for describing things will try out AltPoet. It's currently close to being completed, but it's ready to try out so we can refine the user interface.

If you have any interest in helping with this project, I invite you to email me at eric@pglaf.org. Put the word “AltPoet” in the email subject line. 

### Auditing and Certification

We will be training volunteers to carefully check our released books to identify accessibility issues that can be mitigated, or when a book is already accessible, add an accessibility indication to our metadata database. These indications will be searchable, and incorporated into the EPUB3 accessibility metadata.