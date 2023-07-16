---
layout: default
title: File Formats | Project Gutenberg
permalink: /help/file_formats.html
---

File Formats Utilized by Project Gutenberg
==========================================

<div class="contents">Contents
<ol>
<li><a href="#what-formats-does-project-gutenberg-publish">What formats does Project Gutenberg publish?</a></li>
<li><a href="#what-is-and-how-do-i-make-or-use">What is, and how do I make or use:</a>
<ol class="inner_1">
<li><a href="#ascii-character-set">ASCII (Character Set)</a></li>
<li><a href="#big-5-character-set">Big-5 (Character Set)</a></li>
<li><a href="#codepage-437-850-1252-etc-character-sets">Codepage 437, 850, 1252, etc. (Character Sets)</a></li>
<li><a href="#dvi">DVI</a></li>
<li><a href="#epub">EPUB</a></li>
<li><a href="#htmlhtm-format">HTML/HTM (Format)</a></li>
<li><a href="#iso-8859iso-latin-character-sets">ISO-8859/ISO-Latin (Character Sets)</a></li>
<li><a href="#kf8">KF8</a></li>
<li><a href="#lit-format-for-pda-based-ebooks">LIT (Format for PDA-based eBooks)</a></li>
<li><a href="#macroman-character-set">MacRoman (Character Set)</a></li>
<li><a href="#midmidi-format-for-music">MID/MIDI (Format for music)</a></li>
<li><a href="#mobi">MOBI</a></li>
<li><a href="#mp3-format-for-any-audio-file">MP3 (Format for any audio file)</a></li>
<li><a href="#mpegmpg-format-for-moving-pictures">MPEG/MPG (Format for moving pictures)</a></li>
<li><a href="#mus-format-for-sheet-music">MUS (Format for sheet music)</a></li>
<li><a href="#pdb-format-for-pda-based-ebooks">PDB (Format for PDA-based eBooks)</a></li>
<li><a href="#pdf-format-for-ebooks">PDF (Format for eBooks)</a></li>
<li><a href="#prc-format-for-pda-based-ebooks">PRC (Format for PDA-based eBooks)</a></li>
<li><a href="#ps-format-for-text-and-graphics">PS (Format for text and graphics)</a></li>
<li><a href="#rtf-format-for-text">RTF (Format for text)</a></li>
<li><a href="#txt">TXT</a></li>
<li><a href="#tex-format-for-typesetting-and-math">TeX (Format for typesetting and math)</a></li>
<li><a href="#unicodeutf-8-utf-16-utf-32-character-set">Unicode/UTF-8, UTF-16, UTF-32 (Character Set)</a></li>
<li><a href="#xml-format-for--well-just-about-anything-">XML (Format for &#8230; well, just about anything&#160;:-)</a></li>
</ol>
</li>
</ol>
</div>

## What formats does Project Gutenberg publish?
In principle, there's no format that we won't publish, but, in practice, we prefer formats that are open and editable.  Almost every Project Gutenberg eBook since 2004 is released as plain text and HTML, as master formats.  Other formats, such as epub and mobi, are generated automatically. A small number of items use LaTeX as the master format, especially when mathematical notation is needed.  LaTeX is used to generate PDF.  

An open format is one whose structure is publicly defined and documented, and not burdened with patent or trade secret or copy-protection (a.k.a. "DRM") restrictions. Anyone can write a reader or creator for an open format, and in 500 years' time, anyone interested will still be able to write a program to display the file. Closed formats, by contrast, will almost certainly be unreadable in just a few decades, when the companies now promoting them disappear, or lose interest, or decide to stop supporting them because they want to sell a replacement. In our notes below, you can see this has happened numerous times throughout the history of Project Gutenberg (1971-present).

Being able to edit an eBook's files is also important. We make corrections to our editions constantly, and it is important to us that we should be able to update our files easily. If adding one word to a sentence involves a complete re-marking of the whole text and a complete rebuild of the file, we have to ask ourselves whether this format is really necessary for this text. Further, the people who re-use our texts should also be allowed to copy and reformat them freely, and non-editable formats restrict their ability to do this in various ways.

## What is, and how do I make or use:
[Note: Character sets and formats are both listed here. Character sets refer to the characters you can use; formats describe how those characters are put together. For non-text formats such as music files, there is no exact equivalent to a character set.]

### ASCII (Character Set)
**ASCII was the historical master format for plain text.** ASCII (American Standard Code for Information Interchange) is a set of common characters, including just about everything that you can type in on an English-language keyboard. It includes the letters A-Z, a-z, space, numbers, punctuation and some basic symbols. Every character in this document is an ASCII character, and each character is identified with a number from 0 through 127 internally in the computer.

You can view or edit ASCII text using just about every text editor or viewer in the world.

### Big-5 (Character Set)
Big-5 is a set of 13,494 traditional Chinese characters. You will need to use an editor or viewer that supports the character set.

### Codepage 437, 850, 1252, etc. (Character Sets)
These codepages are Microsoft-specific character sets which allow the display of accented characters and other symbols. To view a text that uses one of these, you will have to use a Microsoft application that supports them. Many of the fonts supplied with Word for Windows will display and edit CP-1252 correctly. For Codepages 437 and 850, you may have to open a Command Prompt and use a DOS editor like EDIT. A search form [www.microsoft.com](https://www.microsoft.com) should bring up information about the codepage you're interested in, or you can read the excellent overview at [aspell.net/charsets/codepages.html](http://aspell.net/charsets/codepages.html). For Unix users, iconv and recode provide translation facilities from one character set to another, and support many or all of the MS codepages.

### DVI
DVI stands for DeVice Independent, and is commonly used to store text and instructions for displaying it involving complex mathematical symbols and expressions, though it can be used for any content. Given a DVI file, you need a viewer to render it on the specific device you're using. Specifically, DVI is used as the standard output format for TeX, discussed below.

### EPUB
**This is the format compatible with almost all eBook readers (ereaders), smartphones and tablets**. The EPUB format is very similar to HTML, but has additional components that enable added functionality on the many types of devices that can use EPUB. This is now the recommended format for all ereader devices. See [the tablets and ereaders help page](/help/mobile.html) for additional detail.

### HTML/HTM (Format)
**This is the most frequently used master format**. HyperText Markup Language defines the standard format of web pages. You should be able to view these with any web browser, and edit them with any text editor or a specialized HTML editor. [www.w3.org](https://www.w3.org) is the definitive reference.

### ISO-8859/ISO-Latin (Character Sets)
ISO-8859 is a series of character sets used to represent the accented characters most commonly used in European languages. There's ISO-8859-1, ISO-8859-2, and so on. ISO-Latin is just another name for the same thing. You can read the overview at [aspell.net/charsets/codepages.html](http://aspell.net/charsets/codepages.html).

### KF8
This is a new format for Amazon Kindle ereaders. Generally, Kindle with up-to-date software can handle KF8 and EPUB equally well.

### LIT (Format for PDA-based eBooks)
This is a proprietary, closed format for files that can be displayed only by the Microsoft Reader. Search [www.microsoft.com](https://www.microsoft.com) for more information. It is not possible to edit or correct files in this format; it is not possible to export files from this format; they have to be made in another format and converted.

### MacRoman (Character Set)
MacRoman is an 8-bit Apple Mac-specific character set which allows the display of accented characters and other symbols. To view a text that uses MacRoman, you will have to use an application that supports it, and there are few outside the Apple fold. However, iconv and recode are programs that convert between many character sets, and MacRoman is supported by both.

### MID/MIDI (Format for music)
Musical Instrument Digital Interface is a music description language, encompassing not only file formats but definitions of interfaces. A MIDI file contains instructions for sending messages to a musical instrument to recreate the sounds. [www.midi.org](https://www.midi.org/) has much more on this.

### MOBI
This was the major format for Amazon's Kindle ereaders, but was replaced in late 2022 by EPUB and KF8. You probably only need MOBI if you are using an older Kindle that has not had its software updated.

### MP3 (Format for any audio file)
MPEG-1, Level 3, was defined by the Moving Pictures Expert Group as a means for encoding sounds. Many, many MP3 players exist for all platforms, and can be found easily with a Net search. The official home page of the MPEG is [www.mpegstandards.org](https://www.mpegstandards.org/) and copies of the specification can be purchased from the ISO at [www.iso.org](https://www.iso.org).

### MPEG/MPG (Format for moving pictures)
The Moving Pictures Expert Group have released a series of formats for encoding video and audio. MPEG (pronounced EM-peg) formats are published and widely used. The official home page of the MPEG is [www.mpegstandards.org](https://www.mpegstandards.org/) and copies of the specification can be purchased from the ISO at [www.iso.org](https://www.iso.org).

### MUS (Format for sheet music)
MUS from Coda Music (see this [archived website](https://web.archive.org/web/20070225021311/https://www.codamusic.com/)) is or was a proprietary, closed format for editing and replaying sheet music. However, we do post music files in this format because of its many features. We hope to be able to post these also in more open standards at some point in the future, but at the moment, there is no open format with similar capabilities.

### PDB (Format for PDA-based eBooks)
The Palm Data Base format can actually be used for purposes other than eBooks, and there are many possible variants of formats for Palm-based readers all using the extension PDB on PCs, and they're not all entirely compatible. Some of them are proprietary, and it may not be possible to edit them directly, or export files from these formats; they have to be made in another format and converted. Some can be converted back to text. The most common, though, are variants of the "Palm-DOC" format, which is an open format and can be edited on the Palm itself.

### PDF (Format for eBooks)
Portable Document Format is a format for storing texts, containing any fonts or graphics. It is copyrighted by Adobe, [www.adobe.com](https://www.adobe.com) but is well and publicly documented. It is sometimes referred to as a kind of compiled Postscript (see PS below). It is viewable using the Adobe Acrobat Reader and many other applications, including some free applications. It is not easy to edit files in this format.

### PRC (Format for PDA-based eBooks)
This is a proprietary format for files that can be displayed only by the MobiPocket Reader. See this [archived website](https://web.archive.org/web/20130116044910/http://www.mobipocket.com/en/HomePage/default.asp?Language=EN) for more information. It is not possible to edit or correct files in this format; it is not possible to export files from this format; they have to be made in another format and converted.

### PS (Format for text and graphics)
Postscript is technically a programming language, not just a format. It has conditional statements, procedures and program flow control. However, it is commonly referred to as a format. Adobe [www.adobe.com](https://www.adobe.com) holds copyright on the Postscript specifications (there have been three "levels" published) but Postscript is well and publicly documented and has wide support, not only in printing, but in screen display as well. Apart from Adobe's official version, you can also render Postscript files with Ghostscript, a Free Software package. Postscript can be edited directly, but any complex editing may present difficulties.

### RTF (Format for text)
Rich Text Format was originally a Microsoft specification, but it is an open format that is used by many word processors to exchange text and format information in an application-independent way. Nearly all current word processors will read and edit an RTF file, and, like HTML, it can also be edited as plain text.

### TXT
TXT is a generic extension used for any plain text file, regardless of the character set. Thus, while most of our .TXT files contain ASCII, some contain ISO-8859 or Big-5 or Unicode.

### TeX (Format for typesetting and math)
TeX (pronounced "tech"--the "X" is actually the Greek letter chi) is a public domain format created by Donald Knuth for typesetting, though it can also be used for normal printing and viewing. It is the standard way to handle math texts and other documents containing a lot of technical symbols, since it has really good support for them. TeX consists mostly of the plain text, with instructions for how it is to be displayed. This is compiled into DVI format (see above) which can be rendered onto any device, like a printer or screen, by a program that is aware of the device's capabilities. Most commonly, TeX is compiled into PDF formats for viewing. The Comprehensive TeX Archive Network [www.ctan.org](https://www.ctan.org/) is the best place to start looking for TeX-related programs for your platform.

### Unicode/UTF-8, UTF-16, UTF-32 (Character Set)
**UTF-8 is now the master format for plain text.** Unicode is intended to be a single character set that can handle all of the characters in all of the languages that ever were, or ever will be. It accords with the ISO-10646 standard for the characters, but, in addition, imposes rules of implementation. UTF-8, UTF-16, UTF-32 and their variants are ways of implementing Unicode using different rules for transforming abstract code points into bytes. Unicode is steadily gaining ground, with at least some support in every major operating system, but we're nowhere near the point where everyone can just open a text based on Unicode and read and edit it. Generally, when we do post Unicode, we use the UTF-8 transformation format of it, since that is most commonly supported. Check [www.unicode.org](https://www.unicode.org) for more.

### XML (Format for &#8230; well, just about anything&#160;:-)
eXtensible Markup Language looks a bit like HTML, but whereas tags have a standard meaning in HTML, XML allows anyone to define their own set of tags and meanings using a Document Type Definition (DTD) file. Add a CSS (Cascading Style Sheets) file to that, and you have the ability to display the text according to predefined rules. Add some XSL (eXtensible Stylesheet Language) files and conversion software, and you can automagically make other formats as well. In principle, this seems to make it ideal for the storage and processing of etexts, since a suitable DTD and CSS and XSL, together with the right programs, should make it possible to produce any format of eBook automatically from an XML original. Some PG volunteers have looked at, and are looking at, ways to convert the entire archive using a satisfactory DTD; however, meantime we aren't actually producing much XML, since most volunteers aren't working with it, and nobody wants to start producing many XML texts until we have agreed standards. [www.w3.org/XML](https://www.w3.org/XML/) is the definitive source for more information about XML.
