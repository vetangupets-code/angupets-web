/* ---------- Menú móvil accesible ---------- */
(function () {
var openBtn = document.getElementById('openMenu');
var closeBtn = document.getElementById('closeMenu');
var panel = document.getElementById('mobilePanel');
if (!openBtn || !closeBtn || !panel) return;

function openMenu() {
panel.hidden = false;
panel.classList.add('open');
openBtn.setAttribute('aria-expanded', 'true');
closeBtn.focus();
document.addEventListener('keydown', onKeydown);
}

function closeMenu() {
panel.hidden = true;
panel.classList.remove('open');
openBtn.setAttribute('aria-expanded', 'false');
document.removeEventListener('keydown', onKeydown);
openBtn.focus();
}

function onKeydown(e) {
if (e.key === 'Escape' || e.key === 'Esc') {
closeMenu();
return;
}
if (e.key === 'Tab') {
var focusables = panel.querySelectorAll('a, button');
if (!focusables.length) return;
var first = focusables[0];
var last = focusables[focusables.length - 1];
if (e.shiftKey && document.activeElement === first) {
e.preventDefault();
last.focus();
} else if (!e.shiftKey && document.activeElement === last) {
e.preventDefault();
first.focus();
}
}
}

openBtn.addEventListener('click', openMenu);
closeBtn.addEventListener('click', closeMenu);
panel.querySelectorAll('a').forEach(function (a) {
a.addEventListener('click', closeMenu);
});
})();

/* ---------- Scroll reveal: títulos y fotos (sin librerías) ---------- */
(function () {
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function markVisible(list) {
list.forEach(function (el) { el.classList.add('is-visible'); });
}

var titles = document.querySelectorAll('.reveal-title');
var photos = document.querySelectorAll('.reveal-photo');

if (reduceMotion || !('IntersectionObserver' in window)) {
markVisible(titles);
markVisible(photos);
return;
}

var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add('is-visible');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

titles.forEach(function (el) { observer.observe(el); });
photos.forEach(function (el) { observer.observe(el); });
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

/* ---------- Huellitas que siguen el puntero (solo desktop) ---------- */
(function () {
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (reduceMotion || !canHover) return;

var MIN_DIST = 46;      // px entre huellas
var LIFETIME = 900;     // ms, duración del desvanecido
var PAW_SIZE = 16;      // px
var SIDE_OFFSET = 7;    // px, separación lateral tipo "caminata"
var MAX_ACTIVE = 28;

var PAW_SVG = '<svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">' +
'<ellipse cx="12" cy="16.2" rx="6.1" ry="5.1"/>' +
'<circle cx="5.6" cy="8.4" r="2.6"/>' +
'<circle cx="10.2" cy="4.6" r="2.35"/>' +
'<circle cx="14.1" cy="4.6" r="2.35"/>' +
'<circle cx="18.4" cy="8.4" r="2.6"/>' +
'</svg>';

var layer = document.createElement('div');
layer.className = 'paw-trail-layer';
layer.setAttribute('aria-hidden', 'true');
document.body.appendChild(layer);

var lastX = null, lastY = null, side = 1, active = 0;

function spawnPaw(x, y, angleDeg) {
if (active >= MAX_ACTIVE) return;
var el = document.createElement('span');
el.className = 'paw-print';
el.innerHTML = PAW_SVG;

var rad = (angleDeg + 90) * Math.PI / 180; /* perpendicular a la dirección */
var ox = Math.cos(rad) * SIDE_OFFSET * side;
var oy = Math.sin(rad) * SIDE_OFFSET * side;
side *= -1;

el.style.left = (x + ox) + 'px';
el.style.top = (y + oy) + 'px';
el.style.width = PAW_SIZE + 'px';
el.style.height = PAW_SIZE + 'px';
/* la huella (SVG) apunta "hacia arriba" por defecto; +90 alinea los dedos con el avance */
el.style.setProperty('--paw-rot', (angleDeg + 90) + 'deg');

layer.appendChild(el);
active++;

requestAnimationFrame(function () {
requestAnimationFrame(function () {
el.classList.add('paw-print--fade');
});
});

window.setTimeout(function () {
if (el.parentNode) el.parentNode.removeChild(el);
active--;
}, LIFETIME + 80);
}

function onPointerMove(e) {
if (lastX === null) {
lastX = e.clientX;
lastY = e.clientY;
return;
}
var dx = e.clientX - lastX;
var dy = e.clientY - lastY;
var dist = Math.sqrt(dx * dx + dy * dy);
if (dist < MIN_DIST) return;

var angle = Math.atan2(dy, dx) * 180 / Math.PI;
spawnPaw(e.clientX, e.clientY, angle);
lastX = e.clientX;
lastY = e.clientY;
}

document.addEventListener('pointermove', onPointerMove, { passive: true });
})();
