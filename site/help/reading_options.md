---
layout: default
title: How to Read Our eBooks, incl. Kindle | Project Gutenberg
permalink: /help/reading_options.html
---

<style>
.page_content { max-width: 1250px; }
.page_content h1 { margin-top: 2em; }
.page_content h1:first-child { margin-top: 0; }
.page_content h2 { margin-top: 1.4em; }
.device-picker { display: flex; flex-wrap: wrap; margin: 1em 0 -12px; }
.page_content .device-picker a { margin: 0 12px 12px 0; padding: 14px 22px; border: 1px solid #9cc4d2; border-radius: 10px; background: #fafbfc; color: #1f2428; font-weight: 600; text-decoration: none; }
.page_content .device-picker a::after { content: "›"; margin-left: 10px; color: #5a8a9c; }
.page_content .device-picker a:hover { background: #eef6f9; }
.lead { font-size: 1.25em; line-height: 1.5; }
@media (max-width: 500px) {
  .device-picker { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0; }
  .page_content .device-picker a { margin: 0; padding: 14px 8px; text-align: center; }
  .page_content .device-picker a::after { content: none; }
  .device-panel ol { margin: 0 0 0 0.5em; }
}
@media (max-width: 750px) {
  .page_content h2 { text-align: left; }
}
details { margin-top: 1.2em; }
ol + details { margin-top: 2em; }
details summary { cursor: pointer; font-size: inherit; }
p + details.inline { margin-top: 0; }
details.inline summary { list-style: none; font-size: inherit; }
details.inline summary::-webkit-details-marker { display: none; }
details.inline summary .toggle { text-decoration: underline; color: inherit; }
details.inline[open] > ol, details.inline[open] > ul, details.inline[open] > p { margin-top: 0.8em; }
.alternatives { margin-top: 2em; }
.alternatives > .usb { margin: 0 0 0.6em; }
.page_content .device-panel .alternatives summary { font-size: 1.2rem; }
.alternatives summary::before { content: "▸"; display: inline-block; width: 1em; color: #5a8a9c; }
.alternatives details[open] > summary::before { content: "▾"; }
.alternatives > details { margin-top: 0.2em; }
.alternatives > details[open] { margin-bottom: 0.8em; }
.page_content .device-panel p, .page_content .device-panel li, .page_content .device-panel details, #need-help + p { font-size: 1.125rem; line-height: 1.6; max-width: 42rem; }
#need-help { max-width: 42rem; margin-top: 2.5em; padding-top: 1.2em; border-top: 1px solid #d5e4ea; }
/* One device panel at a time: the one holding the link target, else Read Online.
   Browsers without :has() show all panels instead. */
.device-panel { margin-top: 3em; }
.page_content .device-panel > :first-child { margin-top: 0; }
@supports selector(:has(a)) {
  .device-panel { display: none; }
  /* Huge scroll margin pins the page to the top, so switching panels never jumps */
  .page_content .device-panel > :first-child { scroll-margin-top: 9999px; }
}
.device-panel:has(:target),
.page_content:not(:has(.device-panel :target)) .device-panel--online { display: block; }
.page_content:not(:has(.device-panel :target)) .device-picker a[href="#read-online"],
.page_content:has(.device-panel--online :target) .device-picker a[href="#read-online"],
.page_content:has(.device-panel--kindle :target) .device-picker a[href="#kindle"],
.page_content:has(.device-panel--kobo :target) .device-picker a[href="#kobo-nook-etc"],
.page_content:has(.device-panel--iphone :target) .device-picker a[href="#iphone--ipad"],
.page_content:has(.device-panel--android :target) .device-picker a[href="#android"],
.page_content:has(.device-panel--computer :target) .device-picker a[href="#computer"] { background: #e3f0f5; border-color: #2f6f86; }
</style>

How to Read
=====================================

<p class="lead">Here's how you can enjoy our 75,000+ free ebooks:</p>

<nav class="device-picker" aria-label="Pick your device">
 <a href="#read-online">Read Online</a>
 <a href="#kindle">Kindle</a>
 <a href="#kobo-nook-etc">Kobo, Nook etc.</a>
 <a href="#iphone--ipad">iPhone / iPad</a>
 <a href="#android">Android</a>
 <a href="#computer">Computer</a>
</nav>

<div class="device-panel device-panel--online" markdown="1">

## Read Online

Every book has its own webpage, so you can **read it right away in your browser** on your smartphone, tablet, or personal computer.

1. Find a book you like
2. Click the "Read online now" button

</div>

<div class="device-panel device-panel--kindle" markdown="1">

## Kindle {#kindle}

For Kindles since 2013, Send-to-Kindle is the easiest way.

1. Download the **EPUB3** file
2. Upload it at your country's Amazon site, e.g. [amazon.com/sendtokindle](https://www.amazon.com/sendtokindle){:target="_blank"} (US) or [amazon.co.uk/sendtokindle](https://www.amazon.co.uk/sendtokindle){:target="_blank"} (UK)
3. It appears on your Kindle in minutes

<div class="alternatives">
<details class="inline usb"><summary><span class="toggle">USB transfer</span> (older Kindles)</summary><p>Use the <strong>Kindle/MOBI</strong> format, not EPUB:</p><ol><li>On the book's page, use the <strong>"Older Kindles"</strong> or <strong>"Kindles (kf8)"</strong> download option</li><li>Connect your Kindle to your computer via USB</li><li>Copy the file to the "documents" folder on your Kindle</li></ol></details>
<details class="inline"><summary><span class="toggle">Email to Kindle</span></summary><p>Every Kindle has its own email address. You can email files directly to it.</p><ol><li>On Amazon: open Menu → Manage Your Content and Devices → Devices tab → select your Kindle and find its email address</li><li>On the same page: go to the Preferences tab → scroll down to "Approved Personal Document E-mail List" → add your own email address, so the Kindle can receive emails from you</li><li>Email the <strong>EPUB3</strong> file as an attachment to your Kindle's address</li></ol></details>
</div>

</div>

<div class="device-panel device-panel--kobo" markdown="1">

## Kobo {#kobo-nook-etc}

Kobo makes it easy: plug it into your computer, and it shows up as a USB drive you can drag books onto.

1. Download the **EPUB3** file
2. Connect your Kobo to your computer via USB
3. Tap "Connect" on your Kobo's screen
4. Drag the file into the Kobo drive that appears

<details class="inline">
<summary>Forma, Sage, Elipsa, Elipsa 2E, and Libra Colour also support <span class="toggle">Dropbox (no cable needed)</span>.</summary>
<ol>
<li>On your Kobo, go to Settings &gt; Dropbox and link your account</li>
<li>Save the <strong>EPUB3</strong> file to your Dropbox</li>
<li>On your Kobo, tap the Dropbox icon to sync — the book will appear in your library</li>
</ol>
</details>

## Nook

Nook works much the same way as Kobo — plug it in and it appears as a drive on your computer.

1. Download the **EPUB3** file on your computer
2. Connect your Nook via USB
3. Tap "Connect" on your Nook's screen
4. Copy the file to the "My Files" folder on the Nook drive

**Older Nooks** (Simple Touch, original GlowLight): use the **EPUB** file instead.

## Other E-readers

Using a PocketBook, Boox, or another e-reader? Just download the **EPUB3** file — most modern e-readers support it.

</div>

<div class="device-panel device-panel--iphone" markdown="1">

## iPhone / iPad

Easiest: [read online](#read-online) in your browser.

Use a Reading App:

1. Apple's "Books" App is pre-installed. Other EPUB reading apps are available in the App Store.
2. Download the **EPUB3** file. It will be saved in the "Files" App.
3. Open the file from the Files app.
4. Pick a reading app — directly from the prompt, or via the Share button.

EPUB reading apps for iPad/iPhone include Books (mac, iPhone, iPad), Neat Reader and PocketBook Reader.

**Kindle app?** It can't open a downloaded EPUB file. Use [Send-to-Kindle](#kindle) instead, and the book will appear in your Kindle app.

</div>

<div class="device-panel device-panel--android" markdown="1">

## Android

Easiest: [read online](#read-online) in your browser.

Use a Reading App:

1. Install an EPUB reading app.
2. Download the **EPUB3** file.
3. Open the file — if there's a download notification, tap it. Or find and tap it in your Files/Downloads app.
4. Pick your reader app if Android asks.

Free reading apps include ReadEra and Moon+ Reader.

**Kindle app?** It can't open a downloaded EPUB file. Use [Send-to-Kindle](#kindle) instead, and the book will appear in your Kindle app.

<details class="inline">
<summary>Google Play Books is often preinstalled but <span class="toggle">works differently</span>.</summary>
<p>Unlike most reading apps, Play Books won't open a local EPUB directly. Instead, upload the file to your Google Play Books library at <a href="https://play.google.com/books" target="_blank">play.google.com/books</a> (or via the Upload option inside the Android app), then read it from your library.</p>
</details>

</div>

<div class="device-panel device-panel--computer" markdown="1">

## Computer

Easiest: [read online](#read-online) in your browser.

To read offline, download the **EPUB3** file and open it in a desktop reading app:

- **Calibre** (Windows/Mac/Linux) — The Swiss army knife of ebook software. Manages your library, converts between formats, and syncs to devices.
- **Thorium Reader** (Windows/Mac/Linux) — A clean, open-source EPUB3 reader.
- **Apple Books** (Mac) — Built into macOS. Clean and simple.
- **Sumatra PDF** (Windows) — Lightweight and fast. Handles EPUB despite the name.

These are just a few options — there are many other EPUB reading apps available, for example [Koodo Reader](https://github.com/koodo-reader/koodo-reader){:target="_blank"}, [FBReader](https://fbreader.org/){:target="_blank"}. We do not recommend [Adobe Digital Editions](https://www.adobe.com/solutions/ebook/digital-editions.html){:target="_blank"}.

</div>

## Need help?

Everyone's setup is a little different. If you're unsure how to start reading or are running into trouble, a chat with an AI assistant can help if you describe your situation to it, e.g. [Claude](https://claude.ai){:target="_blank"}, [ChatGPT](https://chat.openai.com){:target="_blank"}, or [Gemini](https://gemini.google.com){:target="_blank"}.

