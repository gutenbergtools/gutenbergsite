---
layout: default
title: PG- HTML FAQ
permalink: /how_to/html_faq.html
---

# HTML FAQ
These guidelines might not reflect all current "best practices." Please visit [Distributed Proofreaders](https://www.pgdp.net) to view forums where best practices are actively discussed and maintained. Also, you can look at recent eBooks from Project Gutenberg, to for examples. 

<div class ="contents">
<ol>
<li><a href="#can-i-submit-a-html-version-of-my-text">Can I submit a HTML version of my text? </a></li>
<li><a href="#why-should-i-make-a-html-version">Why should I make a HTML version? </a></li>
<li><a href="#can-i-submit-a-html-version-without-a-plain-ascii-version">Can I submit a HTML version without a plain ASCII version?</a></li>
<li><a href="#what-are-the-pg-rules-for-html-texts">What are the PG rules for HTML texts?</a>
<ol class ="inner_1">
<li><a href="#1-the-only-absolute-rule-is-that-the-html-should-be-valid-according-to-one-of-the-w3c-html-standards-and-if-used-css-must-also-be-valid">The only absolute rule is that the HTML should be valid according to one of the W3C HTML standards, and, if used, CSS must also be valid.</a></li>
<li><a href="#2-requirement-file-names-and-extensions">Requirement: File names and extensions</a></li>
<li><a href="#3-requirement-accessibility">Requirement: Accessibility</a></li>
<li><a href="#4-requirement-no-scripting">Requirement: No scripting</a></li>
<li><a href="#5-requirement-html-and-plain-text">Requirement: HTML and plain-text</a></li>
<li><a href="#6-requirement-archive-format-for-posting">Requirement: Archive format for posting</a></li>
<li><a href="#7-recommendation-simplicity">Recommendation: Simplicity</a></li>
<li><a href="#8-recommendation-images">Recommendation: Images</a></li>
<li><a href="#9-recommendation-line-lengths">Recommendation: Line lengths</a></li>
<li><a href="#10-recommendation-single-file-html">Recommendation: Single-file HTML</a></li>
</ol>
</li>
<li><a href="#can-i-use-javascript-or-other-scripting-languages-in-my-html">Can I use Javascript or other scripting languages in my HTML?</a></li>
<li><a href="#should-i-make-my-html-edition-all-on-one-page-or-split-it-into-multiple-linked-pages">Should I make my HTML edition all on one page, or split it into multiple linked pages?</a></li>
<li><a href="#how-can-i-check-that-i-havent-made-mistakes-in-coding-my-html">How can I check that I haven't made mistakes in coding my HTML?</a></li>
<li><a href="#can-i-submit-a-html-or-other-format-of-somebody-elses-text">Can I submit a HTML or other format of somebody else's text?</a></li>
<li><a href="#how-big-can-the-images-be-in-a-html-file">How big can the images be in a HTML file?</a></li>
<li><a href="#the-images-ive-scanned-are-too-big-for-inclusion-in-html-what-can-i-do-about-it">The images I've scanned are too big for inclusion in HTML. What can I do about it?</a></li>
<li><a href="#can-i-include-decorative-images-ive-made-or-found">Can I include decorative images I've made or found? </a></li>
<li><a href="#how-can-i-make-a-plain-text-version-from-a-html-file">How can I make a plain text version from a HTML file? </a></li>
<li><a href="#how-can-i-make-a-html-version-from-my-plain-text-file">How can I make a HTML version from my plain text file? </a>
<ol class="inner_1">
<li><a href="#step-1-add-the-html-header-and-footer-information"> Add the HTML header and footer information </a></li>
<li><a href="#step-2-add-paragraph-marks"> Add paragraph marks. </a></li>
<li><a href="#step-3-add-marks-for-headings"> Add marks for headings. </a></li>
<li><a href="#step-4-line-up-verse-tables-of-contents-and-other-lists">Line up verse, tables of contents, and other lists. </a></li>
<li><a href="#step-5-add-back-in-italics-and-bold"> Add back in italics and bold. </a></li>
<li><a href="#step-6-restore-accents-and-special-characters"> Restore accents and special characters. </a></li>
<li><a href="#step-7-link-images-into-the-text">Link Images into the text. </a></li>
<li><a href="#step-8-over-to-you">Over to you! </a></li>
<li><a href="#step-9-some-common-problems">Some common problems </a></li>
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
s is a common problem, where images from the book occupy a full or half page. Your images should be of an appropriate size for downloading, and 2 megabytes of high-quality scan per image is not really an appropriate size for most PG texts!

You should reduce the size, and maybe the quality, of the original scan for simple viewing purposes. There is lots of image-manipulation software to do this. For Windows, you might look at the freeware Irfanview, and for both *nix and Windows there is ImageMagick [P.1]. Look for the words "resize" and "resample" in the Help.

Apart from simple converters, which do enough for this purpose, you can also manipulate the images in full imaging creation and editing packages like Paint Shop Pro, Adobe Photoshop and The Gimp [P.1].

Different image encoding methods can make a huge difference to the filesize. Any of the packages mentioned above can encode images as GIF, JPEG or PNG, and, particularly for black and white line drawings, these can encode to very different sizes. So, for example, a 60K JPEG may save as a 30K GIF, because the GIF encoding works better for that particular image. Try your images out, and see what works.

In general, in 2004, images are best saved as either JPEG (.jpg) or PNG (.png). Anything that worked well as a GIF will probably work as well, or better, as a PNG, so the main choice is between PNG and JPEG.

JPEG tends to work out better — that is, considering quality of image vs. filesize — for images resembling a photograph, with a shaded (i.e. not pure white or pure black) background, while PNG is preferred for clear black line-drawings on a white background. The reason is that JPEG's "lossy compression" can save a lot of filesize by removing individual little black and white pixels in the shading, which the human eye won't particularly notice, much like most human ears don't notice frequencies lost in digital recording.

If your image is suitable for the JPEG treatment at all, it is very likely that you can get a very good .jpg file at about 50K of filesize.

Since most people will be viewing these images in a browser on a screen with a resolution below or around 1000 pixels wide, you should mostly make your images not much wider than 600 pixels. If you have a 2000- or 3000-pixel-wide image derived from an original scan, you need to look at resizing it.

When manipulating images, always work from your original. Don't convert your original to a JPEG, and then shrink that and convert it to a PNG. Depending on the format, images may lose definition as they are converted (search for "lossy compression" in your favorite search engine to find out more about this), and they certainly lose definition as they are resized, and you end up with the "imperfect copy of an imperfect copy of an . . ." effect. When you're experimenting, take your original, resize and Save As PNG, then go back to your original, resize and Save As JPG, and so on.

You can also use an image optimizer. These are specialist software programs that try to make image files smaller without sacrificing resolution or detail. 

## Can I include decorative images I've made or found?
No.

Please include only the images you got from the book. If you want to make an edition of the book for your own web site, you can of course use whatever you like there, but for PG purposes, we want the book, the whole book, and nothing but the book.

## How can I make a plain text version from a HTML file?
You can edit out the HTML by hand, of course, but there are several easier ways to convert.

You can view the HTML in a browser, Select All text, and just Copy and Paste into your editor. This is easiest, but doesn't handle formatting like tables very well.

You can use the Lynx [P.1] browser to convert your text with the command 
<pre>lynx -dump myfile.html > myfile.txt</pre>

Bruce Guthrie's HTMSTRIP for MS-DOS [P.1] is very configurable. 
<[http://www.w3.org/Tools/html2things.html](http://www.w3.org/Tools/html2things.html)> has a list of other HTML to plain text converters. 

## How can I make a HTML version from my plain text file?
This is not a course in HTML, but, for most books, you don't really need a course in HTML. Making a HTML format of most books is very easy, and doesn't take long, once you have mastered basic HTML. Let's assume you have your completed PG plain text file ready, and walk through the steps commonly needed to make a HTML version. We'll do this by successive approximation, doing the major things first, and then dealing more and more with the detail.

There are lots of specialized HTML editors out there, but you don't actually need any of them. The same editor that you used to create your text will also create your HTML. HTML is just text, with two types of special instructions added: tags and entities.

A tag is an instruction to the browser, usually to display something with specific rules. Tags are shown within angled brackets: for example,

is the instruction to start a new paragraph. An entity is a named special character that might not be available in your character set. Entities are shown starting with an ampersand "&" and ending with a semi-colon ";" : for example, &mdash; is the representation of an em-dash. I'm marking up a made-up short text as I write these steps, loosely based on the sample page from question [V.121]. You can see the changes made at each stage by looking at the files 

| |[View Source](/wiki_images/1-HTML_FAQ_Example_0.txt)|(text before starting)|
|htmstep1.htm|[View Source](/wiki_images/30-HTML_FAQ_Example_1.txt)|(after adding the HTML header and footer)|
|htmstep2.htm|[View Source](/wiki_images/89-HTML_FAQ_Example_2.txt)|(after adding paragraph marks)|
|htmstep3.htm|[View Source](/wiki_images/38-HTML_FAQ_Example_3.txt)|(after marking main headings)|
|htmstep4.htm|[View Source](/wiki_images/84-HTML_FAQ_Example_4.txt)|(after adding special line breaks and indents)|
|htmstep5.htm|[View Source](/wiki_images/98-HTML_FAQ_Example_5.txt)|(after adding italics and bold)|
|htmstep6.htm|[View Source](/wiki_images/76-HTML_FAQ_Example_6.txt)|(after adding accents and non-ASCII characters)|
|htmstep7.htm|[View Source](/wiki_images/10-HTML_FAQ_Example_7.txt)|(after adding an image)|
|htmstep8.htm|[View Source](/wiki_images/71-HTML_FAQ_Example_8.txt)|(showing some extra techniques)|

Before you start, make sure that you can see these files both in your browser and in your editor. In your editor, you should see the HTML codes; in your browser, you should see the text as it is intended to be viewed.

Note for people who already know HTML: yes, this example omits lots of possible ways to do things, and lots of refinements. You already know how to do what you want to do — skip onwards, and give the beginners room to learn in peace! :-) 

### Step 1. Add the HTML header and footer information
Add the following lines at the top of your text file: 
<pre>
&lt;DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"&gt;
&lt;html&gt;
&lt;head&gt;
&lt;meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"&gt;
&lt;title&gt;The Project Gutenberg eBook of My Book, by A. N. Author&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
</pre>

Let's explain these one by one: 
<pre>&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"&gt;</pre>
says that your file is HTML 4.01 Transitional, which is the latest version, allowing the widest range of tags and entities. 
<pre>&lt;html&gt;</pre>
denotes the start of the HTML 
<pre&lt;head&gt;</pre>
denotes the start of the HTML header information. 
<pre&lt;meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"&gt;</pre>
says that the characters are text, using ISO-8859-1 encoding. If you need to use a different character set, you should change ISO-8859-1 to whatever you intend to use. ISO-8859-1 is good for lots of PG books in English that use French or German words.
<pre>&lt;title&gt;The Project Gutenberg eBook of My Book, by A. N. Author &lt;/title&gt;</pre>
You should obviously change this to the actual title and author you're producing. The 
<pre>&lt;/head&gt;</pre>
denotes the end of the HTML header information and 
<pre>&lt;body&gt;</pre>
denotes the start of the actual text itself - the body of the book.

At the very end of the file, you should append these two lines 
<pre>&lt;body&gt;
&lt;/html&gt;
</pre>

these denote the end of the body of the book, and the end of the HTML.

At this point, you actually have a valid HTML file! OK, if you view it with a browser, it doesn't look anything like the way it's supposed to, but it is HTML. Save it with a name like MYFILE1.HTM or STEP1.HTM and get a copy of Tidy for your DOS, Unix, Mac or Windows system from <http://tidy.sourceforge.net>. Run Tidy on your file, telling it just to look for errors (tidy -e if running from a command-line; if you're using a GUI version, there should be a menu option or tickbox for showing errors only). Tidy should tell you that there are no errors. Yay!

If it does say that there are errors, deal with them now, before you continue. Make sure, at each step, that you have cleaned up any errors; it's a lot easier now than later. Also, when you've finished each step, save your file with a number in its name, so that if you run into problems later and get confused, you can, at worst, drop back to the correct version at the end of the previous step.

The most likely error you might have at this point relates to the characters "<", ">", or "&". These are the characters used by HTML to indicate tags and entities. If these characters are used in the text of your file, (and ampersand is likely to be), you should replace them with entities, so that HTML will know that they are to be displayed as characters, not interpreted as commands.

Replace 
<pre>
&  with  &amp;
<  with  &lt;
>  with  &gt;
</pre>

There is an example of this in the file htmstep1.htm

### Step 2. Add paragraph marks.
For novels and general prose, paragraphs are the main logical and display unit. Paragraphs are marked in HTML with the sign &lt;p&gt;  at the start, and &lt;/p&gt; at the end. You don't actually need the &lt;/p&gt; at the end, but adding these is a good habit to get into. You do, very much, need the &lt;p&gt; at the start. 

The line-lengths within a &lt;p&gt; &lt;/p&gt; pair are irrelevant; the browser in which the text is viewed will ignore extra spaces and line-ends, and will wrap text to fit the screen. This is bad for poetry and tables, but we will discuss those later. For this step, all you need to know is that you can leave your text exactly as it is, and just add the paragraph marks. 

Put a &lt;p&gt; at the start of the line before the first letter of every paragraph, and a &lt;/p&gt; just after the last letter or punctuation of every paragraph. If you can do macros in your editor, this will just take a minute; otherwise, it may be rather boring, but at least it is simple. For this step, put the paragraph marks around everything that has a blank line after it, even poetry or chapter titles. We'll come back and change that later. 

Now save your text as something like MYFILE2.HTM or STEP2.HTM. Again, run Tidy to check for errors, and fix them before continuing. 

If you now look at the file htmstep2.htm in your browser, you will see that it is starting to take shape. Look at it in your editor, and you will see the paragraph marks. 

### Step 3. Add marks for headings.
We want to indicate to the reader that certain lines are for chapter or other headings. HTML provides the tags &lt;h1&gt;,&lt;h2&gt;, and so on for this. &lt;h1&gt; is for the biggest heading, and usually, you will reserve this for the title, and use &lt;h2&gt; for chapter headings. If you find these too big, you could choose &lt;h2&gt; for main headings, and &lt;h3&gt; for chapters. Whenever you use one of these header tags, you must close it with its equivalent end tag. So a chapter heading might look like:
<pre> &lt;h2&gt;Chapter XI  &lt;/h2&gt;</pre>

Since there won't be many headers, and most headers are only on one line, this is usually not hard. Look at the file htmstep3.htm to see how our sample is improving, and if you're working along with me, don't forget to save your file under a new name and check it.

In our example, we have marked some lines with paragraph marks where we now want to put headings, so we will change those &lt;p&gt;s,&lt;h2&gt;s, since we don't need or want to mark a line as both. 

### Step 4. Line up verse, tables of contents, and other lists.
The HTML tag &lt;br&gt;  tells the browser to force a line break without starting a new paragraph. We use this when we don't want text all wrapped together, but not separated with blank lines either, for example in verse and tables of contents. 

In our sample, we add the &lt;br&gt;  tag to the end of each line in the table of contents and the end of each line of the verse. If we were working on a whole book of poetry, the same principle would apply, but we'd be using the &lt;br&gt; tag a lot more. 

Where we want to indent a line of poetry, we can use   at the start of the line. Normally, however many spaces you leave between words, HTML condenses them to one space, so normal indentation doesn't work. But the "non-breaking space" entity will cause the browser to show one space for each character, so that you can indent as much as you need.

The file htmstep4.htm shows the effect: this is now an entirely readable HTML text! 

### Step 5. Add back in italics and bold.
The HTML tag &lt;i&gt; tells the browser to start displaying italics, and the &lt;/i&gt; tells it to stop. Similarly, the &lt;b&gt;  tag tells it to display bold, and &lt;/b&gt; marks the end of the bold text. See htmstep5.htm for the changes. 

### Step 6. Restore accents and special characters.
Since we declared our HTML file to use ISO-8859-1 back at the start, we can use any of the common accented characters for Western European languages, but we may also use HTML entities. For example, for the "a circumflex" in "flaneur", we can use either the ISO-8859 character directly, or the HTML entity name â or number â. 

There is a trade-off between characters and entities: entities do not limit you to any particular character set, but characters are directly readable when looking at the HTML source.

Within entitles, there is also a trade-off between entity names and numbers: older browsers may not recognize some of the entity names, but the entities do make the text work in multiple character sets. Which you choose is entirely up to you, but it's best to be consistent; if you like entities, use them everywhere. Entities can be represented by their names — for example, — — or by their number, derived from their ISO-10646 (see Unicode) number — for example, —.

There are other special character entities you may choose, to replace the ASCII equivalents in the main text. Here are some of the common ones:

We've already seen 

<pre>
&amp;    &#38;   ampersand     replaces    "&"
&lt;     &#60;   less than     replaces    "<"
&gt;     &#62;   greater than  replaces    ">"
&nbsp;   &#160;  space         replaces a space when you want to indent
</pre>
and these are also very useful for many PG texts: 
<pre>
&mdash;  &#8212; em-dash       replaces    "--"
&deg;    &#176;  degree        replaces    "deg." or "degrees"
&pound;  &#163;  British pound replaces    "L" or "l" or "pounds"
</pre>

There are many others.<[https://www.w3.org/TR/html4/sgml/entities.html](https://www.w3.org/TR/html4/sgml/entities.html)>  has a fuller list. Please note that you don't have to use these entities in your HTML; if you're happy with the text reading "500 pounds", there is no need to make that £500.

I've made a couple of entity changes in htmstep6.htm.

### Step 7. Link Images into the text.
First, you need to have your image ready. You should already have resized your image to the size you want it to be viewed at. You should also have saved it as a GIF, JPG, or PNG image, since those are the formats most supported by current browsers.

If your image is named front.gif, and it is a picture of the frontispiece of the book, you should add the line

<pre>&lt;img src="front.gif" alt="Frontispiece"&gt;</pre>
to your HTML at the place where you want it displayed.

The "alt" text gives a label to the image, and is displayed if the image can't be shown, or in the case of a browser for visually impaired people.

You don't have to add images with your HTML file, unless you want to. In many older books, there are no images at all to be added.

My final HTML text is now in htmstep7.htm. You need to have the image front.gif in the same directory in order to see it. When your HTML text is posted, the images will be zipped with it, so that future readers can see them. 

### Step 8. Over to you!
This is enough to make a reasonable HTML format of most PG texts, but it doesn't begin to cover everything that can be done in HTML. If you've gone this far, I recommend the W3C's tutorials: 
<[http://www.w3.org/MarkUp/Guide/](http://www.w3.org/MarkUp/Guide/)>
and 
<[http://www.w3.org/MarkUp/Guide/Advanced.html](http://www.w3.org/MarkUp/Guide/Advanced.html)> 
which cover the ground we've just crossed, and go a bit further.

Here are a few more things you might want to know, but don't go nuts adding tags just because you can! Use them only when you really need them. The file htmstep8.htm shows some of these techniques. Personally, I think that this is a bit overdone, and I prefer the effect of htmstep7, with left-aligned chapter headings, but that's a matter of taste.

Once you're used to the basic HTML needed for most PG eBooks, you'll probably be able to convert one in under an hour.

How do I force more space between specific paragraphs? 

Use an extra &lt;br&gt; tag.

How do I make text, or image, or headings centered? 

Put the &lt;center&gt; and &lt;/center&gt; tags around what you want centered, like: &lt;center&gt;,&lt;h2&gt;Chapter 12&lt;/h2&gt;&lt;/center&gt;

How do I lay out tabular information?

The simplest way to do it is with the  &lt;pre&gt; and &lt;/pre&gt; tags. These will cause whatever is within them to be displayed as plain text, just as it was in the original, so that spaces separate the entries just as they did in the text version. You can also use this for poetry, though you usually won't need to. It's not entirely satisfactory, but it will work. 

Making a full HTML table requires you to use the &lt;table&gt;, &lt;tr&gt; (table row), and &lt;td&gt; (table detail) tags, among others, and a full exposition of tables is beyond the scope of this FAQ.

Briefly, you start a table with the &lt;table&gt; tag.  

<pre>
&lt;table&gt;
&lt;/table&gt;
</pre>

For each row you want in the table, you open and close a table row &lt;tr&gt; tag, like:
<pre>
&lt;table&gt;
  &lt;tr&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
  &lt;/tr&gt;
&lt;/table&gt;
</pre>

and then for each cell within a row, you specify a <td> tag and the contents of that cell: 
<pre>
&lt;table&gt;
  &lt;tr&gt;
  &lt;td&gt;This is the Top Left cell&lt;/td&gt;
  &lt;td&gt;This is the Top Right cell&lt;/td&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
  &lt;td&gt;This is the Bottom Left cell&lt;/td&gt;
  &lt;td&gt;This is the Bottom Right cell&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;
</pre>

This only scratches the surface of tables. However, there are many guides available on the Web, and they're easy to find, once you know which tags you're looking for. A brief discussion of tables is provided by the W3C as part of the HTML 4.01 spec at <[https://www.w3.org/TR/html4/struct/tables.html#h-11.5](https://www.w3.org/TR/html4/struct/tables.html#h-11.5)> and he tutorial at <[https://www.w3.org/MarkUp/Guide/Advanced.html](https://www.w3.org/MarkUp/Guide/Advanced.html)> also shows how to make HTML tables. 

### Step 9. Some common problems

When you're just starting to code HTML, it may seem that errors are coming at you from all sides. Tidy may spew out a stream of complaints that you don't recognize or understand. If it's any consolation, this is normal!

Just take the error list one line at a time, starting at the top. Often, one actual mistake, like not closing a tag, may cause many errors, since an unclosed tag can cause many subsequent tags to be reported as errors.

Common errors include: 
1. Simple typos in tags, like <h2Chapter 3 &lt;/h2&gt; instead of &lt;h2&gt;Chapter 3&lt;/h2&gt;
2. Unclosed tags, like forgetting to add the </h2> in the sample above, or forgetting the slash in the closing tag so that you type &lt;i&gt;italics&lt;i&gt; instead of &lt;i&gt;italics </i>.
3. Not nesting tags correctly. Get used to thinking of tags as brackets; the first one opened should be the last one closed. For example, you should type:
<pre>
&lt;center&gt;&lt;p&gt;This is centered.&lt;/p&gt;&lt;/center&gt;
</pre>
instead of
<pre>
&lt;p&gt;&lt;center&gt;This is centered.&lt;/center&gt;&lt;/p&gt;
</pre>
One option for making a HTML version is to use GutenMark <[http://www.sandroid.org/GutenMark/](http://www.sandroid.org/GutenMark/)> to create the basic HTML straight from your text, and then edit the resulting HTML to add the features you want. If you're having a lot of problems with your main conversion, this is worth a try. 

