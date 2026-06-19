/* ============================================================
   Online Queso — client-side enhancement for the static pages.
   The HTML is pre-rendered (see build.js); this only adds the
   interactive bits: mobile menu, newsletter form, "Load more",
   and the brand-hero cheese-hole effect.
   ============================================================ */
(function () {
  'use strict';

  // ---- Mobile menu -------------------------------------------------------
  var menu = document.querySelector('.oq-mobile-menu');
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.getAttribute('data-act');

    if (act === 'toggle-menu') {
      var open = menu && menu.classList.toggle('is-open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    } else if (act === 'load-more') {
      // Reveal the next batch of hidden cards.
      var hidden = document.querySelectorAll('.grid-cell.is-hidden');
      for (var i = 0; i < hidden.length; i++) hidden[i].classList.remove('is-hidden');
      var wrap = t.closest('.load-more-wrap');
      if (wrap) wrap.remove();
    }
  });

  // Close the mobile menu when a nav link inside it is followed.
  if (menu) {
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) menu.classList.remove('is-open');
    });
  }

  // ---- Newsletter form ---------------------------------------------------
  var form = document.getElementById('oq-news-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.hidden = true;
      var ok = document.getElementById('oq-news-success');
      if (ok) ok.hidden = false;
    });
  }

  // ---- Brand-hero cheese holes -------------------------------------------
  // Pop non-overlapping Swiss-cheese holes across the yellow hero. On desktop
  // they spawn while the cursor is inside; on touch/mobile they auto-run.
  (function initCheeseHoles() {
    var hero = document.querySelector('.brand-hero');
    var layer = document.getElementById('oq-holes');
    if (!hero || !layer) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var active = [];   // live holes: { x, y, r }
    var GAP = 8;
    var timer = null;

    // Seed the decorative edge holes as fixed obstacles.
    var heroRect = hero.getBoundingClientRect();
    hero.querySelectorAll('.edge-hole').forEach(function (eh) {
      var b = eh.getBoundingClientRect();
      active.push({ x: b.left - heroRect.left + b.width / 2, y: b.top - heroRect.top + b.height / 2, r: b.width / 2 });
    });

    function spawnOne() {
      var rect = hero.getBoundingClientRect();
      var size = Math.random() < 0.28 ? (80 + Math.random() * 95) : (12 + Math.random() * 46);
      var r = size / 2;
      for (var attempt = 0; attempt < 12; attempt++) {
        var x = r + Math.random() * (rect.width - size);
        var y = r + Math.random() * (rect.height - size);
        var clear = true;
        for (var i = 0; i < active.length; i++) {
          var a = active[i];
          if (Math.hypot(x - a.x, y - a.y) < r + a.r + GAP) { clear = false; break; }
        }
        if (!clear) continue;

        var rec = { x: x, y: y, r: r };
        active.push(rec);
        var hole = document.createElement('span');
        hole.className = 'cheese-hole';
        hole.style.left = x + 'px';
        hole.style.top = y + 'px';
        hole.style.width = size + 'px';
        hole.style.height = size + 'px';
        layer.appendChild(hole);
        hole.addEventListener('animationend', function () {
          this.remove();
          var idx = active.indexOf(rec);
          if (idx > -1) active.splice(idx, 1);
        });
        return;
      }
    }

    var mm = window.matchMedia;
    var noHover = !mm || mm('(hover: none)').matches || mm('(pointer: coarse)').matches || window.innerWidth <= 880;
    if (noHover) {
      spawnOne();
      timer = setInterval(spawnOne, 200);
      return;
    }

    hero.addEventListener('mouseenter', function () {
      if (timer) return;
      spawnOne();
      timer = setInterval(spawnOne, 130);
    });
    hero.addEventListener('mouseleave', function () {
      clearInterval(timer); timer = null;
    });
  })();
})();
