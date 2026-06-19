#!/usr/bin/env node
/* ============================================================
   Online Queso — static site generator.
   Renders real .html files from data.js so the whole structure
   (home, category indexes, article pages) is browsable on disk.

   Run:  node build.js
   Output: index.html + /blogs/<category>/index.html + /blogs/<category>/<slug>.html
   The generated files are plain static HTML — no build step is
   needed to *serve* them, only to regenerate after a data change.
   ============================================================ */
'use strict';

var fs = require('fs');
var path = require('path');
var D = require('./data.js');
var catMeta = D.catMeta, posts = D.posts, postPath = D.postPath, catPath = D.catPath;

var ROOT = __dirname;
var LOAD_MORE_VISIBLE = 9; // category page shows lead + 9, then "Load more"

// ---- Helpers -------------------------------------------------------------
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function byCat(slug) { return posts.filter(function (p) { return p.cat === slug; }); }
function initialsOf(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
}
function write(rel, html) {
  var dest = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log('  ✓ ' + rel);
}

var ARROW = '<svg viewBox="0 0 24 24" fill="none" class="link-arrow"><path d="M5 12h14M13 6l6 6-6 6" stroke="#211C14" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function mediaInner(p, labelHTML) {
  if (p && p.img) {
    return '<img class="media-img" loading="lazy" src="' + esc(p.img) + '" alt="' + esc(p.title) + '">';
  }
  return labelHTML;
}

// ---- Cards ---------------------------------------------------------------
function cardHTML(p, opts) {
  opts = opts || {};
  var meta = catMeta[p.cat];
  return '' +
    '<a class="card" href="' + esc(postPath(p)) + '">' +
      '<div class="card-media">' + mediaInner(p, '<span class="img-label">' + esc(meta.kind) + '</span>') + '</div>' +
      '<div class="card-body">' +
        '<span class="card-cat">' + esc(meta.name) + '</span>' +
        '<h3 class="card-title">' + esc(p.title) + '</h3>' +
        (opts.excerpt ? '<p class="card-excerpt">' + esc(p.excerpt) + '</p>' : '') +
        '<div class="card-meta"><span>' + esc(p.author) + '</span><span class="dot">·</span><span>' + esc(p.date) + '</span></div>' +
      '</div>' +
    '</a>';
}

function relatedCardHTML(p) {
  var meta = catMeta[p.cat];
  return '' +
    '<a class="card" href="' + esc(postPath(p)) + '">' +
      '<div class="card-media">' + mediaInner(p, '<span class="img-label">' + esc(meta.kind) + '</span>') + '</div>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(p.title) + '</h3>' +
        '<div class="card-meta">' + esc(p.date) + '</div>' +
      '</div>' +
    '</a>';
}

// ---- Persistent chrome ---------------------------------------------------
function headerHTML(ctx) {
  var navDefs = [
    { label: 'News', slug: 'news' },
    { label: 'Tips & Tricks', slug: 'tips' },
    { label: 'Podcasts', slug: 'podcasts' },
    { label: 'ASOM', slug: 'asom' },
    { label: 'Sports Cards', slug: 'cards' }
  ];
  function linkFor(d, extraClass) {
    var active = ctx.activeSlug === d.slug;
    return '<a href="' + esc(catPath(d.slug)) + '" class="' + (extraClass || '') + (active ? ' is-active' : '') + '">' + esc(d.label) + '</a>';
  }
  var nav = navDefs.map(function (d) { return linkFor(d); }).join('');
  var mobileNav = navDefs.map(function (d) { return linkFor(d, 'mm-link'); }).join('');
  var burger = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#211C14" stroke-width="2" stroke-linecap="round"/></svg>';

  return '' +
    '<header class="oq-header">' +
      '<div class="oq-header-inner">' +
        '<a class="oq-logo-btn" href="/" aria-label="Online Queso home"><img src="/assets/online-queso-light.svg" alt="Online Queso"></a>' +
        '<nav class="oq-nav">' + nav + '</nav>' +
        '<div class="oq-header-actions">' +
          '<a class="oq-subscribe" href="#oq-newsletter">Subscribe</a>' +
          '<button class="oq-hamburger" data-act="toggle-menu" aria-label="Toggle menu" aria-expanded="false">' + burger + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="oq-mobile-menu">' +
        '<nav class="mm-nav">' + mobileNav + '</nav>' +
        '<a class="mm-subscribe" href="#oq-newsletter">Subscribe</a>' +
      '</div>' +
    '</header>';
}

function newsletterHTML() {
  return '' +
    '<section class="newsletter" id="oq-newsletter">' +
      '<div class="newsletter-inner"><div class="newsletter-grid">' +
        '<div class="newsletter-copy">' +
          '<span class="newsletter-eyebrow">The Newsletter</span>' +
          '<h2 class="newsletter-title">Join the Online Queso Newsletter.</h2>' +
          '<p>Get weekly Online Queso in your inbox — the week’s best articles, great posts we come across on social, and the occasional HOT TAKE.</p>' +
        '</div>' +
        '<div>' +
          '<form class="newsletter-form" id="oq-news-form">' +
            '<label for="oq-email">Email address</label>' +
            '<div class="newsletter-row">' +
              '<input id="oq-email" type="email" required placeholder="Enter your email">' +
              '<button type="submit">Join</button>' +
            '</div>' +
            '<p class="newsletter-fine">Free forever. Unsubscribe anytime.</p>' +
          '</form>' +
          '<div class="newsletter-success" id="oq-news-success" hidden>' +
            '<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#211C14"/><path d="M7.5 12.5l3 3 6-6.5" stroke="#FFD63B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '<div>' +
              '<p class="ok-title">You’re on the list.</p>' +
              '<p class="ok-sub">Check your inbox for a warm welcome.</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div></div>' +
    '</section>';
}

function footerHTML() {
  var read = [
    { label: 'Tips, Tricks & Advice', slug: 'tips' },
    { label: 'News, Trends & Stories', slug: 'news' },
    { label: 'Sports Cards & Crypto', slug: 'cards' },
    { label: 'Food & Travel', slug: 'travel' }
  ];
  var connect = [
    { label: 'Podcasts', slug: 'podcasts' },
    { label: 'ASOM', slug: 'asom' },
    { label: 'Home', href: '/' },
    { label: 'Subscribe', href: '#oq-newsletter' }
  ];
  function linkList(items) {
    return items.map(function (it) {
      var href = it.href ? it.href : catPath(it.slug);
      return '<a href="' + esc(href) + '">' + esc(it.label) + '</a>';
    }).join('');
  }
  return '' +
    '<footer class="oq-footer">' +
      '<div class="oq-footer-top">' +
        '<div class="oq-footer-brand">' +
          '<a class="oq-logo-btn" href="/" aria-label="Online Queso home"><img src="/assets/online-queso-light.svg" alt="Online Queso"></a>' +
          '<p>Digestible and delicious. A non-standard approach inside the minds of the best and brightest in eCommerce.</p>' +
        '</div>' +
        '<div class="oq-footer-col"><span class="col-head">Read & Explore</span>' + linkList(read) + '</div>' +
        '<div class="oq-footer-col"><span class="col-head">Connect & Discover</span>' + linkList(connect) + '</div>' +
      '</div>' +
      '<div class="oq-footer-bottom"><div class="oq-footer-bottom-inner">' +
        '<span>© 2026 Online Queso</span>' +
        '<span class="tag">Digestible & Delicious</span>' +
      '</div></div>' +
    '</footer>';
}

// ---- Page shell ----------------------------------------------------------
function page(opts) {
  var title = opts.title;
  var desc = opts.desc;
  var ctx = { activeSlug: opts.activeSlug || null };
  return '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="utf-8">\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '  <title>' + esc(title) + '</title>\n' +
    '  <meta name="description" content="' + esc(desc) + '">\n' +
    '  <link rel="icon" href="/assets/online-queso-light.svg">\n' +
    '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
    '  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600&family=Rubik:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">\n' +
    '  <link rel="stylesheet" href="/styles.css">\n' +
    '</head>\n' +
    '<body>\n' +
    headerHTML(ctx) +
    '<main>' + opts.main + '</main>' +
    newsletterHTML() +
    footerHTML() +
    '<script src="/site.js"></script>\n' +
    '</body>\n</html>\n';
}

// ---- Home ----------------------------------------------------------------
function buildHome() {
  var featured = posts[0];
  var stripCat = featured.cat;
  var latest = byCat(stripCat).filter(function (p) { return p.id !== featured.id; }).slice(0, 3);
  var railSlugs = ['tips', 'podcasts', 'asom'];

  var rails = railSlugs.map(function (slug) {
    var cards = byCat(slug).slice(0, 3).map(function (p) { return cardHTML(p); }).join('');
    return '' +
      '<section class="rail">' +
        '<div class="section">' +
          '<div class="rail-head">' +
            '<div class="rail-head-text">' +
              '<h2 class="rail-name">' + esc(catMeta[slug].name) + '</h2>' +
              '<p class="rail-tagline">' + esc(catMeta[slug].tagline) + '</p>' +
            '</div>' +
            '<a class="view-all" href="' + esc(catPath(slug)) + '">View all' + ARROW + '</a>' +
          '</div>' +
          '<div class="grid-3">' + cards + '</div>' +
        '</div>' +
      '</section>';
  }).join('');

  var main = '' +
    '<div class="view">' +
      '<section class="brand-hero">' +
        '<div class="cheese-holes" id="oq-holes"></div>' +
        '<div class="cheese-edge" aria-hidden="true">' +
          '<span class="edge-hole eh-tl"></span><span class="edge-hole eh-tc"></span><span class="edge-hole eh-tr"></span>' +
          '<span class="edge-hole eh-bl"></span><span class="edge-hole eh-bc"></span><span class="edge-hole eh-br"></span>' +
        '</div>' +
        '<div class="brand-hero-inner">' +
          '<span class="eyebrow">Online Queso</span>' +
          '<h1>Real Talks. Real Tactics. Real eCommerce.</h1>' +
          '<p class="brand-lead">A non-standard look inside the minds of the best and brightest in eCommerce — tips, tricks, stories, and free advice. Curated by John Roman, entrepreneur and CEO of BattlBox, for anyone in the industry or looking to get in.</p>' +
          '<div class="brand-cta">' +
            '<a class="btn-primary" href="#oq-newsletter">Subscribe</a>' +
            '<a class="btn-ghost" href="#oq-latest">Explore stories' + ARROW + '</a>' +
          '</div>' +
        '</div>' +
      '</section>' +
      '<section class="home-hero" id="oq-latest">' +
        '<a class="hero-grid" href="' + esc(postPath(featured)) + '">' +
          '<div class="hero-copy">' +
            '<span class="hero-kicker">Featured · ' + esc(catMeta[featured.cat].name) + '</span>' +
            '<h2 class="hero-title">' + esc(featured.title) + '</h2>' +
            '<p class="hero-excerpt">' + esc(featured.excerpt) + '</p>' +
            '<div class="hero-meta"><span class="name">' + esc(featured.author) + '</span><span class="dot">·</span><span>' + esc(featured.date) + '</span><span class="dot">·</span><span>' + esc(featured.read) + '</span></div>' +
            '<span class="read-cta">Read the story' + ARROW + '</span>' +
          '</div>' +
          '<div class="hero-media">' + mediaInner(featured, '<span class="img-label lg">Featured image · 16:9</span>') + '</div>' +
        '</a>' +
      '</section>' +
      '<section class="latest-strip">' +
        '<div class="rail-head">' +
          '<div class="rail-head-text">' +
            '<h2 class="rail-name">' + esc(catMeta[stripCat].name) + '</h2>' +
            '<p class="rail-tagline">' + esc(catMeta[stripCat].tagline) + '</p>' +
          '</div>' +
          '<a class="view-all" href="' + esc(catPath(stripCat)) + '">View all' + ARROW + '</a>' +
        '</div>' +
        '<div class="grid-3">' + latest.map(function (p) { return cardHTML(p); }).join('') + '</div>' +
      '</section>' +
      rails +
      '<div class="spacer-48"></div>' +
    '</div>';

  write('index.html', page({
    title: 'Online Queso — Digestible & Delicious',
    desc: 'A non-standard look inside the minds of the best operators in eCommerce. Tips, stories, and free advice, served digestible and delicious.',
    activeSlug: null,
    main: main
  }));
}

// ---- Category index (blog index) ----------------------------------------
function buildCategory(slug) {
  var meta = catMeta[slug];
  var blogPosts = byCat(slug);
  var lead = blogPosts[0];
  var rest = blogPosts.slice(1);

  var leadHTML = lead ? '' +
    '<section class="lead-section">' +
      '<a class="lead" href="' + esc(postPath(lead)) + '">' +
        '<div class="lead-media">' + mediaInner(lead, '<span class="img-label md">Lead image · 16:9</span>') + '</div>' +
        '<div class="lead-copy">' +
          '<span class="lead-kicker">Latest in ' + esc(meta.name) + '</span>' +
          '<h2 class="lead-title">' + esc(lead.title) + '</h2>' +
          '<p class="lead-excerpt">' + esc(lead.excerpt) + '</p>' +
          '<div class="lead-meta"><span class="name">' + esc(lead.author) + '</span><span class="dot">·</span><span>' + esc(lead.date) + '</span><span class="dot">·</span><span>' + esc(lead.read) + '</span></div>' +
        '</div>' +
      '</a>' +
    '</section>' : '';

  // Lead + 9 visible; anything beyond is hidden until "Load more" (site.js).
  var cards = rest.map(function (p, i) {
    var hidden = i >= LOAD_MORE_VISIBLE ? ' is-hidden' : '';
    return '<div class="grid-cell' + hidden + '" data-more-index="' + i + '">' + cardHTML(p, { excerpt: true }) + '</div>';
  }).join('');
  var loadMore = rest.length > LOAD_MORE_VISIBLE
    ? '<div class="load-more-wrap"><button class="load-more" data-act="load-more">Load more stories' + ARROW + '</button></div>'
    : '';

  var main = '' +
    '<div class="view">' +
      '<section class="blog-hero">' +
        '<div class="blog-hero-inner">' +
          '<span class="eyebrow">Blog · ' + blogPosts.length + ' stories</span>' +
          '<h1 class="blog-title">' + esc(meta.name) + '</h1>' +
          '<p class="blog-desc">' + esc(meta.desc) + '</p>' +
        '</div>' +
      '</section>' +
      leadHTML +
      '<section class="blog-grid-section"><div class="grid-3">' + cards + '</div>' + loadMore + '</section>' +
      '<div class="spacer-48"></div>' +
    '</div>';

  write('blogs/' + meta.path + '/index.html', page({
    title: meta.name + ' — Online Queso',
    desc: meta.desc,
    activeSlug: slug,
    main: main
  }));
}

// ---- Article (blog template) --------------------------------------------
function buildArticle(p) {
  var meta = catMeta[p.cat];
  var initials = initialsOf(p.author);
  var related = byCat(p.cat).filter(function (x) { return x.id !== p.id; }).slice(0, 3);

  var main = '' +
    '<div class="view">' +
      '<article class="article-head">' +
        '<div class="crumbs">' +
          '<a href="/">Home</a>' +
          '<span class="dot">/</span>' +
          '<a class="cat" href="' + esc(catPath(p.cat)) + '">' + esc(meta.name) + '</a>' +
        '</div>' +
        '<h1 class="article-title">' + esc(p.title) + '</h1>' +
        '<div class="article-author">' +
          '<div class="avatar">' + esc(initials) + '</div>' +
          '<div class="author-meta"><span class="name">' + esc(p.author) + '</span><span class="sub">' + esc(p.date) + ' · ' + esc(p.read) + '</span></div>' +
        '</div>' +
      '</article>' +
      '<div class="article-hero-wrap"><div class="article-hero">' + mediaInner(p, '<span class="img-label lg">Article hero · 16:9</span>') + '</div></div>' +
      '<div class="article-body">' +
        '<p class="lead-para">' + esc(p.excerpt) + '</p>' +
        '<p>Every breakout brand looks inevitable in hindsight. The reality is almost always messier — a long string of unglamorous decisions, a handful of lucky breaks, and a founder stubborn enough to keep going on the days the spreadsheet said stop.</p>' +
        '<h2>Where it started</h2>' +
        '<p>It rarely begins with a grand thesis. It begins with a specific, nagging problem the founder couldn’t stop thinking about — the kind of friction everyone else had quietly accepted as the cost of doing business. The first version was small, ugly, and held together with duct tape. It also worked just well enough to prove the point.</p>' +
        '<p>Distribution came before polish. Instead of waiting for the perfect product, the team got something into customers’ hands and let the feedback rewrite the roadmap. The early wins weren’t about scale; they were about signal.</p>' +
        '<blockquote>The best operators aren’t the ones with the cleverest tactics — they’re the ones who refuse to outsource their thinking.</blockquote>' +
        '<h2>The turning point</h2>' +
        '<p>Growth forced a decision most founders dread: protect the thing that made you special, or chase the thing that makes you big. The brands that endure tend to choose a third option — they systematize the magic instead of diluting it, building a machine that produces the original feeling at scale.</p>' +
        '<h2>What operators can steal from this</h2>' +
        '<ul>' +
          '<li>Ship before you’re ready, then let real usage edit your assumptions.</li>' +
          '<li>Treat distribution as a product problem, not a marketing afterthought.</li>' +
          '<li>Write down what makes you different — then defend it as you scale.</li>' +
        '</ul>' +
        '<p class="tight">None of it is a secret formula. It’s the discipline to keep doing the obvious things long after the novelty wears off. That’s the part nobody puts in the pitch deck — and it’s the part that actually compounds.</p>' +
      '</div>' +
      '<div class="author-card-wrap">' +
        '<div class="author-card">' +
          '<div class="avatar-lg">' + esc(initials) + '</div>' +
          '<div class="text">' +
            '<span class="name">' + esc(p.author) + '</span>' +
            '<p>Curated for Online Queso — a non-standard look inside the minds of the best operators in eCommerce. Tips, stories, and free advice, served digestible and delicious.</p>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<section class="related">' +
        '<div class="eyebrow-row"><h2>More from ' + esc(meta.name) + '</h2><span class="eyebrow-rule"></span></div>' +
        '<div class="grid-3">' + related.map(relatedCardHTML).join('') + '</div>' +
      '</section>' +
      '<div class="spacer-48"></div>' +
    '</div>';

  write('blogs/' + meta.path + '/' + p.slug + '.html', page({
    title: p.title + ' — Online Queso',
    desc: p.excerpt,
    activeSlug: p.cat,
    main: main
  }));
}

// ---- Run -----------------------------------------------------------------
console.log('Building Online Queso static site…');
buildHome();
Object.keys(catMeta).forEach(buildCategory);
posts.forEach(buildArticle);
console.log('Done — ' + (1 + Object.keys(catMeta).length + posts.length) + ' pages.');
