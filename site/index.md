---
layout: default
title: Free eBooks | Project Gutenberg
permalink: /
---

<div class="homepage homepage__body pgx">

<!-- ============ Hero ============ -->
<section class="pgx-hero">
  <h1 id="slogan">Project Gutenberg is a library of {% include ebook_count %} free eBooks</h1>

  <p class="pgx-mission">Choose free eBooks to download or read online. You will find the world's great literature here with a focus on older works whose U.S. copyright has expired. Thousands of Project Gutenberg volunteers have digitized and proofread these books for you. </p>
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
        </div>
        <div class="pgx-rail">
          <div class="lib latest no-select">
          {% include latest_covers.html %}
          <a class="pgx-more-card" href="/ebooks/search/?sort_order=release_date" title="Browse all new releases"><span class="pgx-more-card-box">All New Releases</span><span class="pgx-more-card-label" aria-hidden="true">&rarr;</span></a>
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
    </div>
    {% include category_grid.html %}
  </div>

  <div class="pgx-flow-popular">
    <div class="library">
      <div class="box_shadow">
        <div class="pgx-shelf-head">
          <div class="pgx-shelf-titles">
            <span class="pgx-shelf-title">Most Popular</span>
          </div>
        </div>
        <div class="pgx-rail">
          <div class="lib latest no-select">
          {% include popular_covers.html %}
          <a class="pgx-more-card" href="/ebooks/search/?sort_order=downloads" title="Browse all popular books"><span class="pgx-more-card-box">All Popular Books</span><span class="pgx-more-card-label" aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>

<!-- ============ Outro: lead statement + explore + follow ============ -->
<section class="pgx-cards">

  <div class="pgx-card pgx-card--lead pgx-lead-wide">
    <p class="pgx-lead-text"><strong>Project Gutenberg is the world's oldest digital library.</strong> It is sustained entirely by volunteers who digitize and proofread works of literature as they enter the public domain, keeping them free and accessible for everyone, everywhere. We charge nothing and run no ads. Donations are what keeps us and our servers running.</p>
    <div class="pgx-lead-links">
      <a class="pgx-btn pgx-btn-secondary" href="/about/">Learn more</a>
      <a class="pgx-btn pgx-btn-primary" href="/donate/">Donate</a>
    </div>
    <p class="pgx-lead-note"><a href="/newsletter/february.html">Read about our late CEO</a>, <strong>Dr. Greg Newby</strong></p>
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

      </div>
    </div>

    <div class="pgx-card pgx-card--newsletter">
      <h2 class="pgx-social-title">Newsletter</h2>
      <p class="pgx-news-intro">Get our monthly newsletter with updates, project news and new releases. Unsubscribe any time.</p>
      <a class="pgx-btn pgx-btn-secondary pgx-news-btn" href="https://lists.pglaf.org/mailman3/lists/gmonthly.lists.pglaf.org/">Subscribe</a>
      <p class="pgx-social-feed">You can also <a href="https://lists.pglaf.org/archives/list/gmonthly@lists.pglaf.org/latest">browse our archive</a> to read earlier issues.</p>
    </div>

    <div class="pgx-card pgx-card--social">
      <h2 class="pgx-social-title">Follow Us</h2>
      <!-- Brand icons are from Simple Icons (https://simpleicons.org), CC0.
           The logos themselves remain trademarks of their respective owners. -->
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
