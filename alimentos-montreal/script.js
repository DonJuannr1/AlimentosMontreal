/* Alimentos Montreal — interacciones */
(function () {
  'use strict';

  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── año del pie ─────────────────────────── */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ── nav pegado + botón flotante ─────────── */
  var nav = document.getElementById('nav');
  var flota = document.querySelector('.wa-flota');

  function alScroll() {
    var y = window.scrollY;
    nav.classList.toggle('pegado', y > 30);
    if (flota) flota.classList.toggle('visible', y > 700);
  }
  alScroll();
  window.addEventListener('scroll', alScroll, { passive: true });

  /* ── menú móvil ──────────────────────────── */
  var burger = document.getElementById('burger');
  var menu = document.getElementById('menu-movil');

  function cerrarMenu() {
    menu.hidden = true;
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Abrir menú');
  }

  burger.addEventListener('click', function () {
    var abierto = burger.getAttribute('aria-expanded') === 'true';
    if (abierto) {
      cerrarMenu();
    } else {
      menu.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
    }
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      cerrarMenu();
      burger.focus();
    }
  });

  /* ── revelar al hacer scroll ─────────────── */
  var reveals = document.querySelectorAll('.reveal');

  if (menosMovimiento || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('visto'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('visto');
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    reveals.forEach(function (el) { obs.observe(el); });
  }

  /* ── enlace activo en el nav ─────────────── */
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
  var secciones = enlaces
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && secciones.length) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (!en.isIntersecting) return;
        enlaces.forEach(function (a) {
          a.classList.toggle('activo', a.getAttribute('href') === '#' + en.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    secciones.forEach(function (s) { obsNav.observe(s); });
  }

  /* ── parallax suave de la foto del hero ──── */
  var heroFoto = document.querySelector('.hero__foto img');
  if (heroFoto && !menosMovimiento) {
    var pendiente = false;
    window.addEventListener('scroll', function () {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < 900) heroFoto.style.translate = '0 ' + (y * 0.06) + 'px';
        pendiente = false;
      });
    }, { passive: true });
  }
})();
