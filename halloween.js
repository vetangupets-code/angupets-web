/*
 * ANGUPETS — Edición Halloween (temporal)
 * ---------------------------------------------------------------
 * Esta capa es INDEPENDIENTE del sitio: no modifica style.css ni script.js.
 * - Se activa sola y se APAGA SOLA después del 1 de noviembre de 2026
 *   (hora de Bogotá). Pasada esa fecha el sitio se ve exactamente como antes.
 * - Para quitarla del todo: borra halloween.js y halloween.css, y en cada
 *   HTML borra el bloque entre <!-- HALLOWEEN-START --> y <!-- HALLOWEEN-END -->.
 * - Vista previa manual:  ?halloween=1 (forzar encendido)  /  ?halloween=0 (apagado)
 */
(function () {
  var END = new Date('2026-11-02T00:00:00-05:00').getTime(); // fin del 1 de nov (Bogotá)

  var m = /[?&]halloween=(\d)/.exec(window.location.search);
  var active = m ? m[1] === '1' : Date.now() < END;
  if (!active) return;

  var root = document.documentElement;
  root.classList.add('halloween');

  /* Carga la hoja de estilos solo si la capa está activa */
  var me = document.currentScript;
  var base = me && me.src ? me.src.replace(/halloween\.js[^/]*$/, '') : '';
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = base + 'halloween.css';
  document.head.appendChild(link);

  /* ---------- Piezas SVG (decorativas) ---------- */
  var BAT_HALF = 'M30 7C28.4 7 27.4 8.4 26.8 9.6 23 7.4 16.5 4.4 8 4.6c2.2 2 3.2 5 2.4 8 3-.8 5.6.4 7 3.2 2.6-1.8 6-1.8 8.4.8C27 15.4 28.2 14.6 30 14.6zM27.4 8.8L27.8 3 30 7z';
  var BAT = '<svg viewBox="0 0 60 30" fill="currentColor" aria-hidden="true">' +
    '<path d="' + BAT_HALF + '"/><path d="' + BAT_HALF + '" transform="translate(60 0) scale(-1 1)"/></svg>';

  var GHOST = '<svg viewBox="0 0 60 70" aria-hidden="true">' +
    '<path d="M30 4C16 4 8 14 8 28v34c0 2 2 3 3.5 1.500L16 59l5 6 5-6 4 6 4-6 5 6 5-6 4.5 4.500C50 65 52 64 52 62V28C52 14 44 4 30 4z" fill="#fff" fill-opacity=".92"/>' +
    '<circle cx="23" cy="28" r="4" fill="#2a1650"/><circle cx="37" cy="28" r="4" fill="#2a1650"/>' +
    '<ellipse cx="30" cy="41" rx="4" ry="5.5" fill="#2a1650"/></svg>';

  var SPIDER = '<svg viewBox="0 0 40 40" aria-hidden="true">' +
    '<g stroke="#120824" stroke-width="2" fill="none" stroke-linecap="round">' +
    '<path d="M14 18l-9-7M13 21l-10-1M13 25l-9 6M15 28l-5 9M26 18l9-7M27 21l10-1M27 25l9 6M25 28l5 9"/></g>' +
    '<ellipse cx="20" cy="26" rx="8" ry="9" fill="#120824"/><circle cx="20" cy="15" r="5.5" fill="#120824"/>' +
    '<circle cx="18" cy="14" r="1.4" fill="#FF8A1F"/><circle cx="22" cy="14" r="1.4" fill="#FF8A1F"/></svg>';

  var WEB = '<svg viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true">' +
    '<path d="M0 0v120M0 0l120 120M0 0L90 120M0 0L40 120M0 0h120M0 0l120 90M0 0l120 40"/>' +
    '<path d="M18 0q-2 18-18 18M36 0q-3 36-36 36M56 0q-4 56-56 56M78 0q-5 78-78 78M102 0q-6 102-102 102"/></svg>';

  var PUMPKIN = '<svg viewBox="0 0 60 54" aria-hidden="true">' +
    '<rect x="27" y="4" width="6" height="11" rx="2.5" fill="#4B7A2B"/>' +
    '<ellipse cx="30" cy="32" rx="27" ry="20" fill="#F27405"/>' +
    '<ellipse cx="17" cy="32" rx="13" ry="19.5" fill="#FF8A1F"/><ellipse cx="43" cy="32" rx="13" ry="19.5" fill="#FF8A1F"/>' +
    '<ellipse cx="30" cy="32" rx="9" ry="20" fill="#FF9F45"/>' +
    '<path d="M16 28l5-7 5 7zM34 28l5-7 5 7z" fill="#2a1650"/>' +
    '<path d="M16 38q14 14 28 0l-4-2-3 3-3-3-3 3-3-3-3 3-3-3z" fill="#2a1650"/></svg>';

  var HAT = '<svg viewBox="0 0 120 90" aria-hidden="true">' +
    '<path d="M60 3C54 20 48 40 40 66h40C74 44 70 24 60 3z" fill="#3d1f6d" transform="rotate(8 60 66)"/>' +
    '<path d="M44 58h36l1.5 9H42.500z" fill="#FF8A1F" transform="rotate(8 60 66)"/>' +
    '<rect x="55" y="57.5" width="10" height="10" rx="1.5" fill="none" stroke="#FFD27A" stroke-width="2.2" transform="rotate(8 60 66)"/>' +
    '<ellipse cx="60" cy="70" rx="52" ry="10" fill="#2a1650"/><ellipse cx="60" cy="68" rx="52" ry="9" fill="#3d1f6d"/></svg>';

  var STARS = (function () {
    var pts = [[6,14],[14,32],[22,10],[31,26],[38,8],[47,20],[58,12],[66,30],[74,9],[83,22],[91,13],[96,34],[11,52],[88,50]];
    var out = '<svg viewBox="0 0 100 60" preserveAspectRatio="xMidYMid slice" aria-hidden="true">';
    for (var i = 0; i < pts.length; i++) {
      out += '<circle cx="' + pts[i][0] + '" cy="' + pts[i][1] + '" r="' + (i % 3 === 0 ? 0.55 : 0.35) +
        '" fill="#fff" style="animation-delay:' + ((i * 0.37) % 3).toFixed(2) + 's"/>';
    }
    return out + '</svg>';
  })();

  var GROUND = '<svg viewBox="0 0 1440 90" preserveAspectRatio="xMidYMax slice" aria-hidden="true">' +
    '<g fill="#0d0620">' +
    '<path d="M0 74Q180 60 360 72T720 70T1080 72T1440 66V90H0z"/>' +
    '<path d="M118 78V52a14 14 0 0 1 28 0v26z"/>' +
    '<path d="M262 76V46h-8v-7h8v-9h8v9h8v7h-8v30z"/>' +
    '<path d="M1160 76V54a12 12 0 0 1 24 0v22z"/>' +
    '<path d="M1262 76V50a15 15 0 0 1 30 0v26z"/>' +
    '<path d="M560 74v-14h6v14zM900 74V62h6v12z"/></g>' +
    '<g stroke="#0d0620" stroke-width="4" fill="none" stroke-linecap="round">' +
    '<path d="M1360 74C1362 54 1358 40 1350 24M1358 50C1370 42 1380 40 1392 32M1356 38C1346 34 1338 28 1332 18"/></g></svg>';

  function div(cls, html) {
    var d = document.createElement('div');
    d.className = cls;
    d.setAttribute('aria-hidden', 'true');
    if (html) d.innerHTML = html;
    return d;
  }

  /* Capa de decoración nocturna dentro de un hero (no intercepta clics) */
  function buildNight(host, withGround) {
    var layer = div('hw-night');
    layer.appendChild(div('hw-stars', STARS));
    layer.appendChild(div('hw-fog hw-fog--a'));
    layer.appendChild(div('hw-fog hw-fog--b'));
    layer.appendChild(div('hw-web hw-web--l', WEB));
    layer.appendChild(div('hw-web hw-web--r', WEB));
    layer.appendChild(div('hw-ghost', GHOST));
    layer.appendChild(div('hw-spider', '<i></i>' + SPIDER));
    var bats = [
      ['hw-bat hw-bat--fly', 'top:14%;--d:17s;--s:30px;--del:-3s'],
      ['hw-bat hw-bat--fly', 'top:30%;--d:23s;--s:22px;--del:-11s'],
      ['hw-bat hw-bat--drift', 'left:12%;top:9%;--s:26px;--del:-1s'],
      ['hw-bat hw-bat--drift', 'left:78%;top:20%;--s:32px;--del:-4s'],
      ['hw-bat hw-bat--drift hw-bat--extra', 'left:44%;top:6%;--s:20px;--del:-7s'],
      ['hw-bat hw-bat--drift hw-bat--extra', 'left:90%;top:44%;--s:24px;--del:-2s']
    ];
    bats.forEach(function (b) {
      var el = div(b[0], BAT);
      el.setAttribute('style', b[1]);
      layer.appendChild(el);
    });
    if (withGround) {
      layer.appendChild(div('hw-ground', GROUND));
      layer.appendChild(div('hw-pumpkin hw-pumpkin--l', PUMPKIN));
      layer.appendChild(div('hw-pumpkin hw-pumpkin--r', PUMPKIN));
    }
    host.insertBefore(layer, host.firstChild);
  }

  function colgante(host) {
    host.appendChild(div('hw-spider hw-spider--section', '<i></i>' + SPIDER));
  }

  function init() {
    /* Cinta de saludo (arriba del todo) */
    var ribbon = document.createElement('div');
    ribbon.className = 'hw-ribbon';
    ribbon.innerHTML = '<span>🎃 ¡Feliz Halloween! Recuerda: el chocolate y los dulces no son para tu mascota. Urgencias 24/7.</span>';
    document.body.insertBefore(ribbon, document.body.firstChild);

    /* Hero de inicio */
    var hero = document.querySelector('header.hero');
    if (hero) {
      buildNight(hero, true);
      var wrap = document.getElementById('heroDogWrap');
      if (wrap) {
        wrap.insertBefore(div('hw-moon'), wrap.firstChild);
      }
      /* Íconos de las burbujas */
      var icons = ['🦇', '🎃', '👻'];
      var spans = hero.querySelectorAll('.hero-side-icon');
      for (var i = 0; i < spans.length && i < icons.length; i++) spans[i].textContent = icons[i];
    }

    /* Hero de sedes */
    var sedeHero = document.querySelector('header.sede-hero');
    if (sedeHero) buildNight(sedeHero, false);

    /* Detalles en secciones inferiores */
    var about = document.querySelector('section.about');
    if (about) colgante(about);
    var cta = document.querySelector('section.cta-final');
    if (cta) {
      colgante(cta);
      var paw = cta.querySelector('.paw');
      if (paw) paw.textContent = '🎃';
    }

    /* Altura del nav → el hero nocturno se extiende por detrás de la barra */
    var nav = document.querySelector('nav.main');
    function setNavH() {
      if (nav) root.style.setProperty('--hw-nav-h', nav.offsetHeight + 'px');
    }
    setNavH();
    window.addEventListener('resize', setNavH, { passive: true });
    window.addEventListener('load', setNavH);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
