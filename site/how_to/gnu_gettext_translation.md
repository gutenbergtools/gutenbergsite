---
layout: default
title: PG-GNU Gettext Translation
permalink: /how_to/gnu_gettext_translation.html
---

# GNU Gettext Translation How-To 
While the wiki contents can be translated by creating new translated wiki pages, the rest of the Project Gutenberg site cannot. The Project Gutenberg search engine uses **GNU gettext** as translation interface. 

## Overview
To start a new translation:
- Get a .po editor.
- Create a new .po file for your language from gutenberg.pot.
- Use the .po editor to edit the .po file until satisfied.
- Send the finished .po file to webmaster@gutenberg.org.

To update an existing translation:
- Get a .po editor.
- Grab [the existing .po file](https://www.gutenberg.org/tools/) and
- update it from the gutenberg.pot file.
- Use the .po editor to edit the .po file until satisfied.
- Send the finished .po file to webmaster@gutenberg.org.

## .pot and .po files

### gutenberg.pot
The [gutenberg.pot] (//www.gutenberg.org/tools/gutenberg.pot) file contains all English strings to be translated, but no translation. The file's content is automatically extracted from the website. The file is regenerated at regular intervals to keep up with the site. 

### .po files
A .po file contains all English strings to be translated along with a more or less complete translation of those string into *one* other language

You can create new .po files from gutenberg.pot with any .po editor.

If gutenberg.pot gets updated after you have started editing the your .po file, you can sync the two files anytime again within the .po editor.

Syncing will insert any new strings into your .po and comment out those strings that are no longer needed. It may also provide "fuzzy" translations, that is, it will match new strings that are similar to old strings to the old translation and flag the translation as "fuzzy" for human revision.

We already have .po files for some languages. .po files for new languages and updates to the existing .po files are always welcome. 

[Available .po files](//www.gutenberg.org/tools/)

## Resources

### .po Editors

Although you can edit a .po file with any UTF-8-capable editor, there are programs that aim to make your life easier. Which one you get is mainly a matter of personal taste. 

- [poedit](https://www.poedit.net/)
- [gtranslator](https://projects.gnome.org/gtranslator/)
- [Virtaal](https://translate.sourceforge.net/wiki/virtaal/index)

### Translation Help
[Google Translate](https://translate.google.com/) A web translation tool. You can cut & paste text snippets and choose between different proposals. You can even upload a complete .po file and get it back translated (well, sort of).

## Hints for Translators
In no particular order.

You may switch the language used by the PG web site like this: 
<div>
 https://www.gutenberg.org/ebooks/?lang=fr
</div>

This keeps your language switched until the session times out or you close the browser.

Do not translate programming language artefacts like: {0}, {title}, %(name)s, etc. These are placeholders for variables inserted at run time.

Keep capitalization at the beginning and punctuation at the end of phrases. 

English headings usually are titlecased. If your language does not follow this convention, change the case to use the convention of your language.

Imperative and infinitive forms are usually the same in English. (eg. go) If your language uses different forms (eg. ir, ve, vaya) you have to figure out which one is the most appropriate. As a quick rule of thumb, you may use the imperative form for menu commands and the infinitive for tooltip phrases and headers. Let you be guided by whichever form is the most customary in your language.

There is no distinct courtesy form in English, so you have to decide which, if any, courtesy form you want to use (eg. tú, vos, Usted) and stay consistent. Again, see what is customary in your language. 

