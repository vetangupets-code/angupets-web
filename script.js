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

/* ---------- Ojos del perro: siguen el puntero (solo desktop) ---------- */
(function () {
var wrap = document.getElementById('heroDogWrap');
var pupilL = document.getElementById('dogPupilL');
var pupilR = document.getElementById('dogPupilR');
if (!wrap || !pupilL || !pupilR) return;

var hero = wrap.closest('.hero');
var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

var TIME_CONSTANT = 110; // ms, suavizado independiente de la tasa de refresco
var maxOffset = 7; // px, recalculado según el tamaño real del perro

function recalcMaxOffset() {
var rect = wrap.getBoundingClientRect();
/* el radio disponible dentro del iris es pequeño: ~0.9% del ancho de la imagen */
maxOffset = Math.max(2, Math.min(5, rect.width * 0.009));
}

var target = { x: 0, y: 0 };
var current = { x: 0, y: 0 };
var rafId = null;
var lastTime = null;
var inViewport = true;

function setPupils(x, y) {
var ex = x.toFixed(2) + 'px';
var ey = y.toFixed(2) + 'px';
pupilL.style.setProperty('--ex', ex);
pupilL.style.setProperty('--ey', ey);
pupilR.style.setProperty('--ex', ex);
pupilR.style.setProperty('--ey', ey);
}

function step(time) {
if (lastTime === null) lastTime = time;
var dt = time - lastTime;
lastTime = time;

var alpha = 1 - Math.exp(-dt / TIME_CONSTANT);
current.x += (target.x - current.x) * alpha;
current.y += (target.y - current.y) * alpha;

setPupils(current.x, current.y);

var settled = Math.abs(target.x - current.x) < 0.03 &&
Math.abs(target.y - current.y) < 0.03;

if (!settled) {
rafId = requestAnimationFrame(step);
} else {
rafId = null;
lastTime = null;
}
}

function ensureLoop() {
if (rafId === null && document.visibilityState === 'visible' && inViewport) {
rafId = requestAnimationFrame(step);
}
}

function onPointerMove(e) {
if (!hero) return;
recalcMaxOffset();
var rect = wrap.getBoundingClientRect();
var cx = rect.left + rect.width / 2;
var cy = rect.top + rect.height * 0.27; /* altura aprox. de los ojos */
var nx = (e.clientX - cx) / (rect.width / 2);
var ny = (e.clientY - cy) / (rect.height / 2);
nx = Math.max(-1, Math.min(1, nx));
ny = Math.max(-1, Math.min(1, ny));

target.x = nx * maxOffset;
target.y = ny * maxOffset;
ensureLoop();
}

function onPointerLeave() {
target.x = 0;
target.y = 0;
ensureLoop();
}

if (canHover && !reduceMotion && hero) {
recalcMaxOffset();
hero.addEventListener('pointermove', onPointerMove);
hero.addEventListener('pointerleave', onPointerLeave);
window.addEventListener('resize', recalcMaxOffset, { passive: true });

if ('IntersectionObserver' in window) {
var io = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
inViewport = entry.isIntersecting;
if (inViewport) ensureLoop();
});
}, { threshold: 0 });
io.observe(hero);
}

document.addEventListener('visibilitychange', function () {
if (document.visibilityState === 'visible') ensureLoop();
});
} else if (!reduceMotion) {
/* Táctil / sin mouse fino: una sola animación de bienvenida, solo en los ojos */
wrap.classList.add('hero-dog-welcome');
}
})();
