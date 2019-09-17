---
layout: default
title: PG- How-To
permalink: /how_to/volunteers_faq.html
---
Volunteers FAQ
==============

Project Gutenberg welcomes contributions of eBooks from people with the interest, time, 
and skillset needed to meet our submission standards. Details of the process and the standards
are at our copyright clearance site (https://copy.pglaf.org) and upload site (https://upload.pglaf.org).

Join Distributed Proofreaders, Instead
--------------------------------------

For most people interested in producing eBooks, we recommend starting with Distributed Proofreaders (https://www.pgdp.net).
With Distributed Proofreaders, you can get involved with different portions of the production pipeline
described below. This is a much easier way to get started, and results in very high quality eBooks.

If you simply want to suggest a book for digitization, DP has online forums for this, or you can
simply send an email (contact information is on the site).

Being a Solo Producer
---------------------

If you might be interested in producing an eBook yourself, here is some guidance.

These steps are for eBooks that are in the public domain in the US, usually because the source
printed book was published, and then the term of copyright protection expired. ==Project Gutenberg
does not accept contemporary or copyrighted works. See our How-To on submitting your own work,
for information about our self-publishing portal.==

Note also that Project Gutenberg does not have a corps of volunteers who can take
your partially-completed work and turn it into a completed eBook. Instead, join Distributed
Proofreaders to be part of a larger group with many shared roles. But if there is a problem
with your ability to complete a digitization process, and you would like to
submit partial work for safekeeping for possible future completion, contact us.

Generally, and as detailed at the upload site, Project Gutenberg eBooks are submitted as 
fully valid HTML, with accompanying plain text. Two other formats are less frequently utilized:
ReStructured text (RST), and LaTeX (which is used mainly for mathematical works). Automated
conversion to derivative formats, including the MOBI (Kindle) and EPUB formats, occurs
on the Project Gutenberg website back-end.

In a nutshell, the production process typically involves the following:
- Identify a candidate printed book. Confirm it is not already in the collection,
or in process by other volunteers.
- Obtain a copyright clearance for the printed book. Usually this is based on 
scanned title page and verso page demonstrating the printed book was published
more than 95 years ago.
- Obtain scans of the book. This may be done using your own scanner, or there
might be online scans from one of the eBook projects. Scans must come from the
exact same print edition as your copyright clearance.
- Perform optical character recognition (OCR) on the scans, to make an approximate
representation of the book in plain text.
- Proofread, proofread, proofread: "Fix" the OCR output by carefully fixing any
errors it made. Remove page headers & footers. De-hyphenate. Add back italics or
other formatting. 
- Format: Generate the HTML source. Different tools are available for this, and
usually involve editing the HTML source code directly. Note that many tools produce
convoluted, non-standard, or non-valid HTML, which can be very difficult to clean 
up for Project Gutenberg.
- Check, and recheck. The upload site has various tools, including to test proper
conversion to derived formats.
- Upload your work, using the copyright clearance key generated earlier.
- Coordinate with the Project Gutenberg production volunteers (known as "whitewashers,"
after the Mark Twain book) on final formatting and presentation.
- Once the eBook is added to the Project Gutenberg collection, confirm it is
appearing correctly, and all metadata are correct.
- If possible, stay in touch into the future. If we receive errata reports that
require access to source material, or are stylistic or subjective in nature, we
might get in touch to discuss potential changes.

More about HTML
---------------

Project Gutenberg is not in the business of teaching HTML,
however nearly all Project Gutenberg's editions now have
both text and HTML files. The HTML files are not only
important in themselves but are the master files for the
auto-production of each eBook's mobile viewer files: .mobi
and .epub. Almost one third of Project Gutenberg eBooks are
now read these eBook formats.

A good starting point is to look at the HTML of a similar eBook from
the Project Gutenberg collection - or peruse a few. See how the simplicity
of structural markup is presented, perhaps by inclusion of cascading style
sheets (CSS), into a beautiful and functional ebook.

It is fascinating to learn how to produce valid HTML files and
there are many programs to help: https://www.w3schools.com/html/html_editors.asp
is one of many sources.

In Project Gutenberg HTML eBooks, you can see the HTML code in many
different tools, including Notepad, NoteTab or word
processors. The headings and footers of all our eBooks are
very similar. The body of the file has text with various
HTML tags such as ```<p>....</p>, <pre>....</pre>,
<h2>....</h2>``` to make the html display give the text
enclosed between these html tags apppear differently.

If you start with plain text, there are two very helpful programs that producers utilize: "guiguts"
at https://sourceforge.net/projects/guiguts/available
and "pg2html.exe," an early DP program. These are valuable in the
first steps of producing an html file from a properly
formatted text file.

Try to turn a very simple text file into an HTML ebook
and you are started on your way to more complex files with
the aid of the instructions in the references in
https://www.w3schools.com/html/html_editors.asp.

