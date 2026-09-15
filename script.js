document.getElementById('openMenu').addEventListener('click', () => {
  document.getElementById('mobilePanel').classList.add('open');
});
document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('mobilePanel').classList.remove('open');
});
document.querySelectorAll('.mobile-panel a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobilePanel').classList.remove('open');
  });
});

/* ---------- Scroll reveal ---------- */
(function () {
  var groups = [
    '.section-head',
    '.service-row',
    '.about .feature-item',
    '.about h2, .about .pull',
    '.gallery-grid figure',
    '.sede-plate',
    '.testi-wrap .section-head',
    '.testi-item',
    '.process-item',
    '.cta-final .paw, .cta-final h2, .cta-final p, .cta-final .cta-row',
    'footer .footer-brand, footer .tag, footer .footer-col'
  ];

  groups.forEach(function (selector) {
    var els = document.querySelectorAll(selector);
    els.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i * 90, 360) + 'ms';
    });
  });

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }
})();

/* ---------- Nav shadow + hide on scroll ---------- */
(function () {
  var nav = document.querySelector('nav.main');
  if (!nav) return;
  var lastScroll = window.pageYOffset;

  function onScroll() {
    var current = window.pageYOffset;
    if (current > 8) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    if (current > lastScroll && current > 140) {
      nav.classList.add('hide-nav');
    } else {
      nav.classList.remove('hide-nav');
    }
    lastScroll = current;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
