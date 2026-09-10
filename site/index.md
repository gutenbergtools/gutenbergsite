---
layout: default
title: Free eBooks | Project Gutenberg
permalink: /
---

<div class="homepage homepage__body">

<section class="pgx-hero">
  <h1 id="slogan">Project Gutenberg is a library of {% include ebook_count %} free eBooks</h1>

  <p id="sub-slogan">Choose free eBooks to download or read online. You will find the world's great literature here with a focus on older works whose U.S. copyright has expired. Thousands of Project Gutenberg volunteers have digitized and proofread these books for you. </p>
</section>

<!-- Latest Books -->
<div class="library">
  <div class="box_shadow">
    <div class="pgx-shelf-head">
      <span class="pgx-shelf-title">New Releases</span>
      <a href="/ebooks/search/?sort_order=release_date" id="more_recent" title="find more recent releases">find more</a>
    </div>
    <div class="pgx-rail">
      <div class="lib latest no-select">
      {% include latest_covers.html %}
      </div>
    </div>
  </div>
</div>

{% include category_grid.html %}

<div class="info-box-container">
  <div class="info-box">
    <h3>Project Gutenberg</h3>
    <ul>
      <li>✓ <strong>100% Free</strong> - No fees, no registration, completely free</li>
      <li>✓ <strong>No Apps Required</strong> - only regular Web browsers or eBook readers needed</li>
      <li>✓ <strong>55+ Years</strong> - Pioneering free eBooks <a href="/about/background/50years.html" title="history, 1971-2021">since 1971</a></li>
      <li>✓ <strong>Volunteer-based</strong> - hundreds of volunteers have contributed over the years</li>
      <li>✓ <a href="/newsletter/february.html">Read about our late CEO</a>, <strong>Dr. Greg Newby</strong>. </li>
      <!-- Heart icon: Lucide, same set and license as _includes/category_grid.html -->
      <li class="pgx-donate">
        <span>Your donations are what keep us going!</span>
        <a class="pgx-donate__btn" href="/donate/"><svg class="pgx-donate__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>Donate</a>
      </li>
    </ul>
  </div>

  <div class="info-box">
    <h3> Useful Links </h3>
    <ul>
      <li><a href="/about/">About Project Gutenberg</a>.</li>
      <li><a href="/donate/">Donating to Project Gutenberg</a>.</li>
      <li><a href="/ebooks/feeds.html">Feeds</a> of new eBooks.</li>
      <li><a href="/policy/linking.html">Linking to Project Gutenberg</a> and <a href="/policy/robot_access.html">roboting or crawling</a> the site.</li>
      <li><a href="/about/partners_affiliates.html">Partners and affiliates</a>.</li>
      <li><a href="/policy/permission.html">Permissions, copyright, licensing, and trademark information</a>.</li>
      <li>What does <a href="/about/background/free_ebook.html">free eBook</a> (No Cost or Freedom?) mean?</li>
    </ul>
  </div>
</div>

<!-- Popular Selection -->
<div class="library">
  <div class="box_shadow">
    <div class="pgx-shelf-head">
      <span class="pgx-shelf-title">Most Popular</span>
      <a href="/ebooks/search/?sort_order=downloads" id="more_popular" title="Find more popular books">find more</a>
    </div>
    <div class="pgx-rail">
      <div class="lib latest no-select">
      {% include popular_covers.html %}
      </div>
    </div>
  </div>
</div>

<div class="info-box-container">
  <div class="info-box">
    <h3> Get Help </h3>
    <ul>
      <li><a href="/help/reading_options.html">Reading Options & Kindle</a>: How to read and enjoy our ebooks. </li>
      <li><a href="/help/faq.html">Frequently Asked Questions</a> about Project Gutenberg.</li>
      <li><a href="/help/">Help, How-To and FAQs</a>: In depth information about many topics.</li>
    </ul>
    <h3> How to Help </h3>
    <ul>
      <li><a href="https://www.pgdp.net">Distributed Proofreaders</a> welcomes new volunteers. This is the main source of new Project Gutenberg eBooks. Getting started is easy, and just a page a day will help! </li>
      <li><a href="/help/errata.html">Fix and improve</a> Project Gutenberg by reporting errors, bugs, typos, and suggesting changes.</li>
      <li>Record audiobooks with our friends at <a href="https://librivox.org">LibriVox</a>.</li>
    </ul>
  </div>

  <div class="info-box">
    <h3> Monthly Newsletter </h3>
    <ul>
      <li>We send out one email at the beginning of each month.</li>
      <li>Every eBook we released that month, plus some editorial content.</li>
      <li><a href="https://lists.pglaf.org/mailman3/lists/gmonthly.lists.pglaf.org/">Subscribe and unsubscribe</a> whenever you like.</li>
    </ul>
    <h3> Audio Books </h3>
    <ul>
      <li><a href="https://librivox.org">LibriVox</a> produces high-quality human-read recordings of Project Gutenberg texts.</li>
      <li><a href="/browse/categories/1">662 of our own titles</a> are read by people.</li>
      <li>The <a href="https://marhamilresearch4.blob.core.windows.net/gutenberg-public/Website/index.html">Open Audiobook Collection</a> adds almost 5,000 computer-generated titles.</li>
    </ul>
  </div>
</div>

<section class="pgx-connect">
  <div class="pgx-connect__group">
    <h3>Main Social Media</h3>
    <ul class="pgx-social">
      <li><a class="is-facebook" href="https://www.facebook.com/project.gutenberg"><img src="/gutenberg/f_icon.png" alt="">Facebook</a></li>
      <li><a class="is-mastodon" href="https://mastodon.social/@gutenberg_org" rel="me"><img src="/gutenberg/m_icon.png" alt="">Mastodon</a></li>
      <li><a class="is-bluesky" href="https://bsky.app/profile/gutenberg.org" rel="me"><img src="/gutenberg/b_icon.png" alt="">Bluesky</a></li>
    </ul>
  </div>
  <div class="pgx-connect__group">
    <h3>New Releases</h3>
    <ul class="pgx-social">
      <li><a class="is-facebook" href="https://www.facebook.com/gutenberg.new"><img src="/gutenberg/f_icon.png" alt="">Facebook</a></li>
      <li><a class="is-mastodon" href="https://mastodon.social/@gutenberg_new" rel="me"><img src="/gutenberg/m_icon.png" alt="">Mastodon</a></li>
      <li><a class="is-bluesky" href="https://bsky.app/profile/new.gutenberg.org" rel="me"><img src="/gutenberg/b_icon.png" alt="">Bluesky</a></li>
    </ul>
  </div>
</section>

</div>
