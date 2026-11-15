(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelectorAll('.nav a');

  // Cabecera con fondo al desplazarse
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  function setMenu(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', function () {
    setMenu(!header.classList.contains('nav-open'));
  });
  navLinks.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setMenu(false);
  });

  // Animaciones de aparición
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Resaltar la sección activa en el menú
  var map = {};
  navLinks.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  // Secciones sin enlace propio se asocian a la más cercana
  var alias = { presentacion: 'inicio', organizacion: 'convenios', cierre: 'contacto' };
  var sections = document.querySelectorAll('main section[id]');

  function setActive() {
    var line = window.innerHeight * 0.35;
    var current = 'inicio';
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top <= line) current = s.id;
    });
    var key = alias[current] || current;
    navLinks.forEach(function (a) { a.classList.remove('active'); });
    if (map[key]) map[key].classList.add('active');
  }
  window.addEventListener('scroll', setActive, { passive: true });
  window.addEventListener('resize', setActive);
  setActive();
})();
