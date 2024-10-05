---
layout: default
title: Errata, Fixes and Bug Reports | Project Gutenberg
permalink: /help/errata.html
---

Submitting Errata, Fixes and Bug Reports
========================================

Errata reports, typos, etc. are welcome and appreciated. Email reports to errata2024 @ pglaf.org (remove the spaces around the @). Suggested formats for reports are described below.

For many books, you may also submit corrections, typos, etc. by making "pull requests" on [GitHub](https://github.com/gutenbergbooks). See "Corrections to posted books using pull requests to GitHub," below. It is expected that nearly all books will have repositories by the end of October 2024. If you would like to use the process for a book that doesn't yet have a repo send an email requests for the repo to be created to errata2024 @ pglaf.org. 

## Corrections to posted books using email

It is important to report the full title, author, and eBook number of the text you are correcting. We have multiple editions of some texts, like Homer's "Odyssey," and unless you tell us exactly what eBook you mean we have to spend much time searching and guessing which file you were reading. It is important to specify that you are reporting errors found in the text, html, .mobi or .epub file.

It is usually easiest to cut and paste the line where the error is into your e-mail, with your comment.

A report for a typical errata list might look like: 
<pre>
The Odyssey, by Homer
         April, 1999  [EBook #1728]

      Line 884:
        back Telemachus, who bas now resided there for a month.
          "bas" should be "has"

      Line 1491:
        Ithaca yet stands. But I wouldask thee, friend, concerning
           "would" and "ask" are run together here

      Line 1563:
        in his father's seat and the elders gave place to him
           This is the end of a paragraph, and needs a period at end.

      Line 15346-7:
         'Hearken to me now, ye men of Ithaca, to the
         will say. Through your own cowardice, my friends, have
            I think there is something missing between "the" and "will"
</pre>
But the following gets the job done: 
<pre>
      In Homer's Odyssey, EBook #1728,
      I found the following errors:

      Telemachus, who bas now resided
      change "bas" to "has"

      But I wouldask thee,
      "would ask" run together

      and the elders gave place to him
      needs period

      ye men of Ithaca, to the
      will say.
      line missing between "the" and "will"?
</pre>
Or, even shorter and easiest to use: 
<pre>
      In Homer's "Odyssey," EBook #1728, I found the
      following errors:

      Telemachus, who bas now resided
      bas ==> has

      But I wouldask thee,
      wouldask ==> would ask

      and the elders gave place to him
      him ==> him.

      ye men of Ithaca, to the
      will say.
      line or words missing between "the" and "will"?
</pre>
The common error of copying several lines or the entire paragraph which contains the error followed by the same paragraph with the error corrected makes it very difficult and time consuming for the editor to locate the error. Please use one of the errata report formats above.

On the other hand it is also important to give a long enough portion of the line with the error as there may be dozens of instances of a short phrase.

For example: 
<pre>
      to him
      him ==> him.
</pre>

may take 10 minutes or more of the editor's time searching for "to him" if there are 100 instances of "to him" in the eBook.

Experienced Project Gutenberg contributors may find that when there are a great many suspected errors it may be easiest all round just to submit a corrected version of the text and html files.

If you are a regular, and have used any of the standard Gutenberg tools like "Gutcheck" or "Jeebies" to find errors, you might mention something like: "Gutcheck finds a lot of bad quotes".

When you are able to find the eBook's title in an online eBook such as "The Internet Archive," it is a great help to us if you verify your suggested changes and in your report let us know you have done so and the source used.

Any errata submissions are freely made, without obligation, and are entirely in the public domain. 


## Corrections to posted books using pull requests to GitHub

Many books in the Project Gutenberg collection have GitHub repositories of their public domain content. To have a repo, a book must:

- Be in the public domain in the US. This excludes a few hundred copyrighted books in the collection.
- Be dominantly textual. This excludes around a thousand audiobooks and other formats.
- Be available in one of these formats: plain text, HTML, RST, or TeX (and variants like LaTeX). This excludes a small number of books in uncommon formats. You might need to update the format to be one of these, before issuing a pull request.

A "pull request" is jargon for using the "git" revision control system to propose changes. Basically, you will be making a copy of the file(s) containing Project Gutenberg books, making changes to fix those files, then proposing those changes back to the Project Gutenberg repository.

Here is an overview of the process:

- "clone" a copy of the current files into your own workspace on GitHub
- make corrections that you want to suggest
- make a pull request to the maintainers of the PG repositories

A "pull request" means you want Project Gutenberg to "pull" your corrections from the corrected copy you submitted and merge those corrections into the posted eBook. Once your corrections have been incorporated, the book will be reposted and you will be notified. 

To use this process, you need a free account at [GitHub](https://github.com) if you don't have one already. The process is straightforward, as described in the GitHub documentation. Once you have an account, you will clone the eBook to your account.

Project Gutenberg's eBooks are stored in GitHub in the "gutenbergbooks" organization. If you wanted to suggest a correction to eBook 22196, for example, you would clone the repository from https://github.com/gutenbergbooks/22196.

Typically you then will use the built-in editor provided in the browser on the GitHub site to make corrections. Another way is to download your cloned repository to your home machine and use a tool such as "Git for Windows" to make the corrections.

Once corrections are made, "push" the version from your home machine back to your account on GitHub. Wherever you make corrections, the final step will be to make a pull request against the Project Gutenberg repository. You will be informed by emails from PG, via github, of the progress from there and the eventual reposting of the book.

Any errata submissions via pull requests are freely made, without obligation, and are entirely in the public domain. 

If you are not sure whether your pull request was received, or need guidance on the process, email errata2024 @ pglaf.org. 
