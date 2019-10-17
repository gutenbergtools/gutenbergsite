---
layout: default
title: PG- HTML FAQ
permalink: /how_to/html_faq.html
---

# HTML FAQ
These guidelines might not reflect all current "best practices." Please visit [Distributed Proofreaders](https://www.pgdp.net) to view forums where best practices are actively discussed and maintained. Also, you can look at recent eBooks from Project Gutenberg, to for examples. 

<div class ="contents">
<ol>
<li><a href="#">Can I submit a HTML version of my text? </a></li>
<li><a href="#">Why should I make a HTML version? </a></li>
<li><a href="#">Can I submit a HTML version without a plain ASCII version?</a></li>
<li><a href="#">What are the PG rules for HTML texts?</a>
<ol class ="inner_1">
<li><a href="#">The only absolute rule is that the HTML should be valid according to one of the W3C HTML standards, and, if used, CSS must also be valid.</a></li>
<li><a href="#">Requirement: File names and extensions</a></li>
<li><a href="#">Requirement: Accessibility</a></li>
<li><a href="#">Requirement: No scripting</a></li>
<li><a href="#">Requirement: HTML and plain-text</a></li>
<li><a href="#">Requirement: Archive format for posting</a></li>
<li><a href="#">Recommendation: Simplicity</a></li>
<li><a href="#">Recommendation: Images</a></li>
<li><a href="#">Recommendation: Line lengths</a></li>
<li><a href="#">Recommendation: Single-file HTML</a></li>
</ol>
</li>
<li><a href="#">Can I use Javascript or other scripting languages in my HTML?</a></li>
<li><a href="#">Should I make my HTML edition all on one page, or split it into multiple linked pages?</a></li>
<li><a href="#">How can I check that I haven't made mistakes in coding my HTML?</a></li>
<li><a href="#">Can I submit a HTML or other format of somebody else's text?</a></li>
<li><a href="#">How big can the images be in a HTML file?</a></li>
<li><a href="#">The images I've scanned are too big for inclusion in HTML. What can I do about it?</a></li>
<li><a href="#">Can I include decorative images I've made or found? </a></li>
<li><a href="#">How can I make a plain text version from a HTML file? </a></li>
<li><a href="#">How can I make a HTML version from my plain text file? </a>
<ol class="inner_1">
<li><a href="#"> Add the HTML header and footer information </a></li>
<li><a href="#"> Add paragraph marks. </a></li>
<li><a href="#"> Add marks for headings. </a></li>
<li><a href="#">Line up verse, tables of contents, and other lists. </a></li>
<li><a href="#"> Add back in italics and bold. </a></li>
<li><a href="#"> Restore accents and special characters. </a></li>
<li><a href="#">Link Images into the text. </a></li>
<li><a href="#">Over to you! </a></li>
<li><a href="#">Some common problems </a></li>
</ol>
</li>
</ol>
</div>

## Can I submit a HTML version of my text?
Yes.

## Why should I make a HTML version?
Well, you can make one just because you want to, but on some texts there is special reason to.

If you want to preserve the pictures that accompany the text, making a HTML version means that you can specify where and how those images appear.

If there is particular meaningful information in the layout of the text that can't be expressed in ASCII, like special characters or complex tables or fonts, HTML may offer an open format alternative. 

## Can I submit a HTML version without a plain ASCII version?
You can submit it, but the Posting Team will then consider whether we should also make an ASCII, or perhaps ISO-8859 or Unicode version of it. We really do want our texts to be viewable by everybody, under every circumstances, and we do not want to start posting texts that are in any way inaccessible to anyone. 

See also the FAQ [G.17] ["Why is PG so set on using Plain Vanilla ASCII?"](https://dev.gutenberg.org/how_to/general_faq.html#g17-why-is-project-gutenberg-so-set-on-using-plain-vanilla-ascii)

## What are the PG rules for HTML texts?

### 1. The only absolute rule is that the HTML should be valid according to one of the W3C HTML standards, and, if used, CSS must also be valid.
You can verify that your HTML is valid at the W3C's HTML Validator at [http://validator.w3.org/](http://validator.w3.org/)

You can verify that your CSS is valid at the W3C's CSS Validator at [http://jigsaw.w3.org/css-validator/](http://jigsaw.w3.org/css-validator/)

For a more convenient and friendly, though less official, check of the correctness of your HTML, you should use Dave Raggett's Tidy program at [http://tidy.sourceforge.net](http://tidy.sourceforge.net/), which not only points out any messiness in your HTML code, but also has some neat modes to clean it up and standardize the formatting.

After that, we have some requirements and recommendations. Compliance with the requirements may be waived if there is a really good reason to make an exception in this case. 

### 2. Requirement: File names and extensions
All file (and, if present, subdirectory) names and extensions should be in lower-case throughout, and should use only the letters "a" through "z", the digits "0" through "9", the dash character "-", the underscore character "_", and the period character ".", which should be used only once in each file name, to indicate the extension, like image.jpg. Yes, we know this is not strictly necessary, but we don't want to have to correct every file that comes with "image.png" referenced in the HTML accompanied by a file IMAGE.PNG. This applies to all files linked from the main HTML file, whether subdirectories, images, other HTML files, or CSS.

All images, if present, must be in a subdirectory named /images.

While 8.3 is not a requirement for file names, file names should be kept reasonably short, and never, ever exceed 32 characters. 

### 3. Requirement: Accessibility
Where styles are used, whether with CSS or HTML, you must not impose personal preferences that may interfere with some readers' ability to read or enjoy the text. That is a guiding principle. 

The W3C Accessibility Guidelines at [http://www.w3.org/TR/WCAG10/full-checklist.html](http://www.w3.org/TR/WCAG10/full-checklist.html) provides a checklist for web pages in general, and that is partly applicable here — it is certainly a good idea to be familiar with their guidelines. However, we are dealing with a special case in making eBooks: while the W3C makes certain content recommendations, we have no control over the content itself; while the W3C recommends use of the latest technologies, this is meaningless in our context, where the text may be unchanged for decades; while the W3C is talking about web sites in general, we are making one specific type of HTML page. 

Listing all possible implications of that is not practical, but specifically, you should try to: 
1. Ensure that your text is well laid out, sensible and readable at all font sizes.
2. Ensure, if you use CSS, that your HTML is readable even when the CSS is removed.
3. Ensure that images have a meaningful "alt" attribute so that a description of the image is available for those who can't see it, and tables have a "summary" attribute.
you should avoid: 
1. Forcing absolute font sizes in point (pt); instead, you can use, for example, "em" or "%" to indicate larger or smaller text in CSS, or "", "", or "-1", "+1" in a HTML font tag.
2. Forcing absolute fonts or font-families, or generic font-families.
3. Forcing background colors other than white, or text colors other than black.
4. The use of frames, blinking text, pop-up windows, auto-redirect or auto-refresh.
5. The use of tables other than for tabular data. Many commercial web pages use tables for their entire layout, but we should use tables only where we are displaying actual tables of information.
6. Creating a hyperlink to anything outside the eBook itself, except in a Credits Line that links to the site of an image or text provider for the eBook.

As always, despite the general rules, there may be cases where, in a small part of the text, these restrictions should not apply. For example, it may be appropriate to use the generic font-family "cursive" in rendering a letter, or a different color for a small insert or a heading. 

### 4. Requirement: No scripting
We don't want our readers to be worried about malicious or just plain buggy code, so we do not post any form of scripting in a HTML file, including Javascript. 

### 5. Requirement: HTML and plain-text
Project Gutenberg does publish well-formatted, standards compliant HTML. However, we insist that a plain text version be available for all HTML documents we publish (even if images or formatting are absent), except when ASCII can't reasonably be used at all, for example with Arabic, or mathematical texts.

### 6. Requirement: Archive format for posting
If the HTML book contains more than one file (including images), create a ZIP (preferable) or TAR archive containing all of the files in the book for upload. 

### 7. Recommendation: Simplicity
Make your HTML as simple as possible. HTML is an evolving standard, and one that may be completely obsolete in the long term. Use of advanced features may just mean that your version will be obsolete or unreadable that much faster. 

### 8. Recommendation: Images
Images included with your HTML should be in a format that Web browsers or ereaders can read: GIF, JPEG or PNG. Images should be edited for high quality in a reasonably small file size. Make the best decision you can concerning the image size and placement in the text. Every image included must be linked into (referenced by) the HTML.

Images displayed as part of the HTML eBook generally should not be larger than 200,000 bytes (200kb), unless the eBook has a focus on illustrations. For example, images of fancy letters at the start of chapters, or line drawings, might have a size from 20-60kb. Color plates might need 200kb or more.

When it is desirable to have larger image files for even higher resolution, these can be linked from lower resolution images. Imagine a color plate that is displayed in the HTML, and is 150kb. Clicking on that image could go to a higher resolution image, even up to several megabytes (1,000,000s of bytes). This is a good way to let people viewing the eBook online to have a great reading experience, without huge downloads. These click-through images probably won't be useful for most ereader devices (which might view epub or mobi formats). A "transcriber's note" may be added to describe why there are larger versions of images, so that people reading the eBook can decide whether to look at them.

### 9. Recommendation: Line lengths
If it is reasonable to do so, try to wrap paragraphs of text at around the normal PG margin of 70 characters. Ideally, your HTML should be as near as possible identical to your text version except for the HTML tags and entities. People who open your HTML won't all be using browsers, people will need to make corrections, not all editors can handle very long lines, and even with editors that can handle long lines, it's easier to work with short lines. Further, it is very desirable that your text and HTML files should, as near as possible, match line-for-line to make maintenance easier — rewrapping the HTML just makes it harder to compare and fix.

### 10. Recommendation: Single-file HTML
Normally, all HTML and CSS for the book should be provided in one single file, with all images as separate files in an /images subdirectory. There may be times when it is appropriate to split the HTML into multiple files — for example, when it is too big to fit in a standard browser — and in such cases it may also be appropriate to provide the CSS as a separate file linked from each of the HTML files. 

Where you must split a HTML ebook into multiple files, the naming requirements for files listed in point 2 above apply. 

## Can I use Javascript or other scripting languages in my HTML?
No.

We don't want our readers to have to worry about any potential for malicious or just plain buggy code. 

## Should I make my HTML edition all on one page, or split it into multiple linked pages?
For a typical novel, one page or HTML file is appropriate, but when that single HTML file gets up around 2 megabytes in size, it may be worth considering a split because of the difficulty of loading it in some browsers. 

In some other cases, where the content requires different styles on different pages, or different pages need different character sets, or the page, with images, just gets too heavy, you may need to split the HTML even if the HTML itself isn't technically too big. 

## How can I check that I haven't made mistakes in coding my HTML?
There are two kinds of mistakes you can make in coding HTML: you can produce invalid HTML, or you can produce HTML that doesn't do what you want.

Checking for invalid HTML is straightforward. The W3C site <[http://validator.w3.org](http://validator.w3.org)> will formally validate your file and point out any mistakes, and this is the official standard. However, it is not always convenient to use, especially when you're in a cycle of fix-and-retest. For this, you should try the program Tidy <(http://tidy.sourceforge.net)[http://tidy.sourceforge.net]>, which runs on your computer, tells you about errors, and has other useful functions as well. Tidy is available for just about every operating system, and there are several Windows utilities that include Tidy. The links on the main Tidy page will lead you to the right version for you. Tidy is fast and friendly, compared to validation over the web, but it is not the last word. The W3C Validator may find formal errors, such as DOCTYPE mismatches with HTML tags or entitles, that Tidy may not. The best solution is to complete your HTML tests using Tidy, and then, when Tidy finds nothing further to gripe about, submit it to <[http://validator.w3.org](http://validator.w3.org)> for the official seal of approval. Please run these checks before submitting your HTML; we can generally fix it for you, but it may take us a lot of work. 

Producing HTML that actually does what you want is equally important. If you've converted the eBook from text, you may have created inconsistencies, or closed an italics tag in the wrong place, or used the wrong tag at some points. The only way to check this is by reading through the HTML in a browser. 

## Can I submit a HTML or other format of somebody else's text?
Maybe.

This question has several complications. First, you must understand that it is quite possible, even likely, that your HTML file will eventually be overwritten by better information.

The value of a HTML file, as opposed to a plain text file, lies in its ability to capture elements of the original that have been lost in the plain text. A plain text file, using extended character sets like ISO-8859 [V.76] or Unicode [V.77] and _underscores_ for italics, can capture all of the author's intent in almost all cases. Sometimes, images and other important features of the original cannot be captured in plain text alone, but can be captured in HTML, or other markup.

When Michael Hart stopped posting books, in September 2001, we had HTML formats of about 1.6% of all our eBooks. At the end of 2002, that had risen to nearly 11% of all our eBooks. By Spring 2004, it had risen further to about 28% of all our eBooks. If you have a clearable copy of an existing posted book, with extra features not included in the original plain text, we would encourage you to make a new edition, or version, or format, correcting any errors in the original, and adding any new information not included there.

If, on the other hand, you just want to make a "blind format conversion" — making your best guess at what the HTML, or other format, layout should be for a book you've never seen, based on the original producer's work — your best bet is to get in touch with the original producer, and ask whether they can supply more material for you to work with. Otherwise, you are at best just rearranging information rather than contributing something new.

A blind format conversion can be done in anything from 2 minutes [R.33] to an hour. It just doesn't make sense for us to keep posting these files when they contain nothing new, and especially when two people may want to convert the same text. It is likely that, at some time in the next couple of years, we will start on a large-scale conversion project, to add some form of markup to all of the existing text files for ease of serving, and having a mish-mash of existing markup styles to deal with at that point won't help either. 

## How big can the images be in a HTML file?
The images should be as big as necessary, and no bigger.

Sorry, but there is no clear number to give here. Web page designers sweat blood to save an extra 20K on a page; so should you. If you're an experienced HTML maker, you know this stuff; if you're not, take it as a guideline that you should generally aim to keep your images in the 40K to 60K size range, with occasional forays into 80-100K territory. That's generally big enough for a clear picture, unless you're reproducing fine artwork.

## The images I've scanned are too big for inclusion in HTML. What can I do about it?


 
