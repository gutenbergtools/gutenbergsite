---
layout: default
title: Free eBooks | Project Gutenberg
permalink: /
---

<div class="homepage homepage__body pgx">

<!-- ============ Hero ============ -->
<section class="pgx-hero">
  <h1 id="slogan">A library of 75,000+ free eBooks</h1>

  <p class="pgx-mission">Choose among free eBooks to download or read online. You will find the world's great literature here. Thousands of Project Gutenberg volunteers have digitized and proofread these books for you.</p>

  <ul class="pgx-trust">
    <li>100% free</li>
    <li>No registration</li>
    <li>No app required</li>
  </ul>
</section>

<!-- ============ Shelves + categories ============ -->
<div class="pgx-flow">

  <div class="pgx-flow-newest">
    <div class="library">
      <div class="box_shadow">
        <div class="pgx-shelf-head">
          <div class="pgx-shelf-titles">
            <span class="pgx-shelf-title">New Releases</span>
          </div>
          <a class="pgx-shelf-more" href="/ebooks/search/?sort_order=release_date" id="more_recent" title="find more recent releases">Browse all <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="pgx-rail">
          <div class="lib latest no-select">
          {% include latest_covers.html %}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pgx-flow-cats">
    <div class="pgx-shelf-head">
      <div class="pgx-shelf-titles">
        <span class="pgx-shelf-title">Categories</span>
      </div>
      <a class="pgx-shelf-more" href="/ebooks/categories.html" title="Browse all categories">Browse all <span aria-hidden="true">&rarr;</span></a>
    </div>
    <div class="category-grid">
      <a href="/ebooks/categories.html#history"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/></svg>History</a>
      <a href="/ebooks/categories.html#literature"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>Literature</a>
      <a href="/ebooks/categories.html#science-technology"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44"/><path d="m13.56 11.747 4.332-.924"/><path d="m16 21-3.105-6.21"/><path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z"/><path d="m6.158 8.633 1.114 4.456"/><path d="m8 21 3.105-6.21"/><circle cx="12" cy="13" r="2"/></svg>Science &amp; Technology</a>
      <a href="/ebooks/categories.html#social-sciences-society"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/></svg>Social Sciences &amp; Society</a>
      <a href="/ebooks/categories.html#arts-culture"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/></svg>Arts &amp; Culture</a>
      <a href="/ebooks/categories.html#religion-philosophy"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9"/><path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14"/></svg>Religion &amp; Philosophy</a>
      <a href="/ebooks/categories.html#lifestyle-hobbies"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>Lifestyle &amp; Hobbies</a>
      <a href="/ebooks/categories.html#health-medicine"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>Health &amp; Medicine</a>
      <a href="/ebooks/categories.html#education-reference"><svg class="pgx-cat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>Education &amp; Reference</a>
    </div>
  </div>

  <div class="pgx-flow-popular">
    <div class="library">
      <div class="box_shadow">
        <div class="pgx-shelf-head">
          <div class="pgx-shelf-titles">
            <span class="pgx-shelf-title">Most Popular</span>
          </div>
          <a class="pgx-shelf-more" href="/ebooks/search/?sort_order=downloads" id="more_popular" title="Find more popular books">Browse all <span aria-hidden="true">&rarr;</span></a>
        </div>
        <div class="pgx-rail">
          <div class="lib latest no-select">
          {% include popular_covers.html %}
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<!-- ============ Outro: lead statement + explore + follow ============ -->
<section class="pgx-cards">

  <div class="pgx-card pgx-card--lead pgx-lead-wide">
    <p class="pgx-lead-text"><strong>Project Gutenberg is the world's oldest digital library.</strong> Michael Hart started the Project in 1971. Today it is a nonprofit sustained entirely by volunteers who digitize and proofread works of literature as they enter the public domain, keeping them free for everyone, everywhere. We charge nothing, run no ads and never will. Donations are what keep our servers running.</p>
    <div class="pgx-lead-links">
      <a class="pgx-btn pgx-btn-secondary" href="/about/">Learn more</a>
      <a class="pgx-btn pgx-btn-secondary pgx-btn-donate" href="/donate/">Donate</a>
    </div>
    <p class="pgx-lead-note"><a href="/newsletter/february.html">Read about our late CEO</a>, <strong>Dr. Greg Newby</strong>.</p>
  </div>

  <div class="pgx-cards-row pgx-cards-row--outro">

    <div class="pgx-card pgx-card--explore">
      <div class="pgx-accordion pgx-card-accordion">

        <div class="pgx-acc-item">
          <input type="checkbox" id="pgx-acc-help" class="pgx-acc-toggle">
          <label class="pgx-acc-head" for="pgx-acc-help">
            <span class="pgx-acc-title">Get Help</span>
            <span class="pgx-acc-icon" aria-hidden="true"></span>
          </label>
          <div class="pgx-acc-inner">
            <div class="pgx-acc-content">
              <ul>
                <li><a href="/help/reading_options.html">Reading Options &amp; Kindle</a>: How to read and enjoy our ebooks.</li>
                <li><a href="/help/faq.html">Frequently Asked Questions</a> about Project Gutenberg.</li>
                <li><a href="/help/">Help, How-To and FAQs</a>: In depth information about many topics.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="pgx-acc-item">
          <input type="checkbox" id="pgx-acc-involved" class="pgx-acc-toggle">
          <label class="pgx-acc-head" for="pgx-acc-involved">
            <span class="pgx-acc-title">Get Involved</span>
            <span class="pgx-acc-icon" aria-hidden="true"></span>
          </label>
          <div class="pgx-acc-inner">
            <div class="pgx-acc-content">
              <ul>
                <li><a href="https://www.pgdp.net">Distributed Proofreaders</a> welcomes new volunteers. This is the main source of new Project Gutenberg eBooks. Getting started is easy, and just a page a day will help!</li>
                <li><a href="/help/errata.html">Fix and improve</a> Project Gutenberg by reporting errors, bugs, typos, and suggesting changes.</li>
                <li>Record audiobooks with our friends at <a href="https://librivox.org">LibriVox</a>.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="pgx-acc-item">
          <input type="checkbox" id="pgx-acc-audio" class="pgx-acc-toggle">
          <label class="pgx-acc-head" for="pgx-acc-audio">
            <span class="pgx-acc-title">Audio Books</span>
            <span class="pgx-acc-icon" aria-hidden="true"></span>
          </label>
          <div class="pgx-acc-inner">
            <div class="pgx-acc-content">
              <p>Audio books are a great way to enjoy literature. We recommend the following sources. All of them are digitizations of Project Gutenberg texts. They are freely available and in the public domain in the US.</p>
              <ul>
                <li><a href="/browse/categories/1">Project Gutenberg’s 662 titles read by people</a></li>
                <li><a href="https://librivox.org">Human-read audio books from LibriVox</a>, a volunteer community that produces high-quality performances.</li>
                <li><a href="https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/index.html">The Project Gutenberg Open Audiobook Collection</a>. Almost 5,000 computer-generated titles via a collaboration with Microsoft and MIT.</li>
                <li><a href="/browse/categories/2">Project Gutenberg’s audio books from 2003</a>, computer-generated and listenable, but lower quality.</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="pgx-acc-item">
          <input type="checkbox" id="pgx-acc-special" class="pgx-acc-toggle">
          <label class="pgx-acc-head" for="pgx-acc-special">
            <span class="pgx-acc-title">Special Areas</span>
            <span class="pgx-acc-icon" aria-hidden="true"></span>
          </label>
          <div class="pgx-acc-inner">
            <div class="pgx-acc-content">
              <ul>
                <li><a href="/ebooks/feeds.html">Feeds</a> of new eBooks.</li>
                <li><a href="/policy/linking.html">Linking to Project Gutenberg</a> and <a href="/policy/robot_access.html">roboting or crawling</a> the site.</li>
                <li><a href="/about/partners_affiliates.html">Partners and affiliates</a>.</li>
                <li><a href="/policy/permission.html">Permissions, copyright, licensing, and trademark information</a>.</li>
                <li>What does <a href="/about/background/free_ebook.html">free eBook</a> (No Cost or Freedom?) mean?</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="pgx-card pgx-card--social">
      <h2 class="pgx-social-title">Follow Us</h2>
      <div class="pgx-social-icons">
    <a class="pgx-ic pgx-ic--fb" href="https://www.facebook.com/project.gutenberg" aria-label="Facebook">
      <span class="pgx-ic-name"><span class="pgx-ic-glyph"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"/></svg></span>
      Facebook</span>
    </a>
    <a class="pgx-ic pgx-ic--mast" href="https://mastodon.social/@gutenberg_org" rel="me" aria-label="Mastodon">
      <span class="pgx-ic-name"><span class="pgx-ic-glyph"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403H10.9V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.668 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.504 2.962 1.51l.638 1.07.638-1.07c.66-1.006 1.65-1.51 2.96-1.51 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/></svg></span>
      Mastodon</span>
    </a>
    <a class="pgx-ic pgx-ic--bsky" href="https://bsky.app/profile/gutenberg.org" rel="me" aria-label="Bluesky">
      <span class="pgx-ic-name"><span class="pgx-ic-glyph"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 0 1-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.479 0-.689-.139-1.86-.902-2.203-.659-.299-1.664-.621-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg></span>
      Bluesky</span>
    </a>
      </div>
      <p class="pgx-social-feed">Just new releases? Follow the new-eBook feeds on
        <a href="https://www.facebook.com/gutenberg.new">Facebook</a>,
        <a href="https://mastodon.social/@gutenberg_new" rel="me">Mastodon</a>, or
        <a href="https://bsky.app/profile/new.gutenberg.org" rel="me">Bluesky</a>.</p>
    </div>

  </div>
</section>

</div>
