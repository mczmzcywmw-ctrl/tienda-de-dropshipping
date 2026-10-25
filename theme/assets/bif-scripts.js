(function () {
  function iniciarReveals() {
    var elementos = document.querySelectorAll('.bif-reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      elementos.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    elementos.forEach(function (el) { observador.observe(el); });
  }

  function iniciarAnuncios() {
    document.querySelectorAll('[data-bif-rotador]').forEach(function (rotador) {
      if (rotador.dataset.listo) return;
      rotador.dataset.listo = '1';
      var frases = rotador.querySelectorAll('.bif-anuncio__frase');
      if (frases.length < 2) return;
      var actual = 0;
      var intervalo = (parseInt(rotador.dataset.bifRotador, 10) || 4) * 1000;
      setInterval(function () {
        frases[actual].classList.remove('is-activa');
        actual = (actual + 1) % frases.length;
        frases[actual].classList.add('is-activa');
      }, intervalo);
    });
  }

  // Título que aparece palabra por palabra; la última palabra queda resaltada.
  function iniciarPalabras() {
    document.querySelectorAll('.bif-palabras:not([data-listo])').forEach(function (titulo) {
      titulo.dataset.listo = '1';
      var palabras = titulo.textContent.trim().split(/\s+/);
      titulo.setAttribute('aria-label', palabras.join(' '));
      titulo.textContent = '';
      palabras.forEach(function (palabra, i) {
        var span = document.createElement('span');
        span.className = 'bif-palabra' + (i === palabras.length - 1 ? ' bif-palabra--acento' : '');
        span.style.setProperty('--n', i);
        span.setAttribute('aria-hidden', 'true');
        span.textContent = palabra;
        titulo.appendChild(span);
        if (i < palabras.length - 1) titulo.appendChild(document.createTextNode(' '));
      });
    });
  }

  // Inclinación suave de las tarjetas al pasar el mouse.
  function iniciarInclinacion() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('[data-bif-inclinar]:not([data-listo])').forEach(function (tarjeta) {
      tarjeta.dataset.listo = '1';
      tarjeta.addEventListener('mousemove', function (e) {
        var r = tarjeta.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        tarjeta.style.transform = 'perspective(900px) rotateX(' + (-y * 6) + 'deg) rotateY(' + (x * 6) + 'deg) translateY(-4px)';
      });
      tarjeta.addEventListener('mouseleave', function () { tarjeta.style.transform = ''; });
    });
  }

  // Números que cuentan desde 0 cuando aparecen en pantalla.
  function iniciarContadores() {
    var numeros = document.querySelectorAll('[data-bif-contar]:not([data-listo])');
    if (!('IntersectionObserver' in window)) return;
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        obs.unobserve(entrada.target);
        var el = entrada.target;
        var meta = parseFloat(el.dataset.bifContar) || 0;
        var inicio = null;
        function paso(t) {
          if (!inicio) inicio = t;
          var p = Math.min((t - inicio) / 1800, 1);
          var valor = Math.round(meta * (1 - Math.pow(1 - p, 3)));
          el.textContent = valor.toLocaleString('es-CO');
          if (p < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
      });
    }, { threshold: 0.5 });
    numeros.forEach(function (el) {
      el.dataset.listo = '1';
      obs.observe(el);
    });
  }

  // Menú desplegable: se abre con clic o toque y se cierra al tocar fuera.
  function iniciarDesplegables() {
    document.querySelectorAll('.bif-nav__desplegable:not([data-listo])').forEach(function (item) {
      item.dataset.listo = '1';
      var boton = item.querySelector('.bif-nav__boton');
      boton.addEventListener('click', function (e) {
        e.stopPropagation();
        var abierto = item.classList.toggle('is-abierto');
        boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
      });
    });
    if (!document.documentElement.dataset.bifDesplegables) {
      document.documentElement.dataset.bifDesplegables = '1';
      document.addEventListener('click', function () {
        document.querySelectorAll('.bif-nav__desplegable.is-abierto').forEach(function (item) {
          item.classList.remove('is-abierto');
          item.querySelector('.bif-nav__boton').setAttribute('aria-expanded', 'false');
        });
      });
    }
  }

  // Palabra del título de la portada que va cambiando.
  function iniciarRotadores() {
    document.querySelectorAll('[data-bif-rota]:not([data-listo])').forEach(function (caja) {
      caja.dataset.listo = '1';
      var palabras = caja.querySelectorAll('.bif-rota__palabra');
      if (palabras.length < 2) return;
      var actual = 0;
      setTimeout(function () {
        setInterval(function () {
          var sale = palabras[actual];
          actual = (actual + 1) % palabras.length;
          sale.classList.remove('is-activa');
          sale.classList.add('is-sale');
          setTimeout(function () { sale.classList.remove('is-sale'); }, 700);
          palabras[actual].classList.add('is-activa');
        }, 2600);
      }, 1600);
    });
  }

  // Portada: la ilustración se mueve un poco con el mouse y una luz suave sigue el cursor.
  function iniciarPortadaMouse() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('[data-bif-hero]:not([data-listo])').forEach(function (hero) {
      hero.dataset.listo = '1';
      var pendiente = null;
      hero.addEventListener('mousemove', function (e) {
        var r = hero.getBoundingClientRect();
        var x = e.clientX - r.left, y = e.clientY - r.top;
        if (pendiente) return;
        pendiente = requestAnimationFrame(function () {
          pendiente = null;
          hero.style.setProperty('--mx', ((x / r.width) * 2 - 1).toFixed(3));
          hero.style.setProperty('--my', ((y / r.height) * 2 - 1).toFixed(3));
          hero.style.setProperty('--lx', x + 'px');
          hero.style.setProperty('--ly', y + 'px');
          hero.classList.add('is-luz');
        });
      });
      hero.addEventListener('mouseleave', function () {
        hero.classList.remove('is-luz');
        hero.style.setProperty('--mx', 0);
        hero.style.setProperty('--my', 0);
      });
    });
  }

  // Encabezado: se encoge al bajar, barra de progreso, píldora del menú, búsqueda y menú móvil.
  function iniciarEncabezado() {
    var header = document.querySelector('[data-bif-header]');
    if (!header || header.dataset.listo) return;
    header.dataset.listo = '1';
    var arriba = document.querySelector('[data-bif-arriba]');
    var raiz = document.documentElement;
    var pendiente = false;
    function alBajar() {
      pendiente = false;
      var y = window.scrollY;
      var alto = document.documentElement.scrollHeight - window.innerHeight;
      var p = alto > 0 ? Math.min(y / alto, 1) : 0;
      header.classList.toggle('is-scrolled', y > 24);
      raiz.style.setProperty('--bif-progreso', p.toFixed(4));
      if (arriba) arriba.classList.toggle('is-visible', y > 700);
    }
    window.addEventListener('scroll', function () { if (!pendiente) { pendiente = true; requestAnimationFrame(alBajar); } }, { passive: true });
    alBajar();
    if (arriba) arriba.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

    // Píldora que sigue al mouse en el menú
    var nav = header.querySelector('[data-bif-nav]');
    if (nav) {
      var pastilla = nav.querySelector('.bif-nav__pastilla');
      var activo = nav.querySelector('a[aria-current="page"]');
      var mover = function (a) {
        if (!a) { pastilla.style.opacity = 0; return; }
        var rn = nav.getBoundingClientRect(), ra = a.getBoundingClientRect();
        pastilla.style.width = ra.width + 'px';
        pastilla.style.transform = 'translateX(' + (ra.left - rn.left) + 'px)';
        pastilla.style.opacity = 1;
      };
      nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('mouseenter', function () { mover(a); }); });
      nav.addEventListener('mouseleave', function () { mover(activo); });
      requestAnimationFrame(function () { mover(activo); });
      window.addEventListener('resize', function () { mover(activo); });
    }

    // Menú móvil
    var menu = document.querySelector('[data-bif-menu]');
    var boton = header.querySelector('[data-bif-abrir-menu]');
    function cerrarMenu() { if (!menu) return; menu.hidden = true; raiz.classList.remove('bif-sin-scroll'); if (boton) boton.setAttribute('aria-expanded', 'false'); }
    if (boton && menu) {
      boton.addEventListener('click', function () { menu.hidden = false; raiz.classList.add('bif-sin-scroll'); boton.setAttribute('aria-expanded', 'true'); });
      menu.querySelectorAll('[data-bif-cerrar-menu]').forEach(function (b) { b.addEventListener('click', cerrarMenu); });
    }

    // Búsqueda con resultados en vivo
    var busqueda = document.querySelector('[data-bif-busqueda]');
    if (!busqueda) return;
    var campo = busqueda.querySelector('[data-bif-busqueda-campo]');
    var caja = busqueda.querySelector('[data-bif-busqueda-resultados]');
    var inicial = caja.innerHTML;
    var raizUrl = (window.Shopify && Shopify.routes && Shopify.routes.root) || '/';
    var t, ultima = '';
    function esc(x) { var d = document.createElement('div'); d.textContent = x; return d.innerHTML; }
    function abrir() { cerrarMenu(); busqueda.hidden = false; raiz.classList.add('bif-sin-scroll'); setTimeout(function () { campo.focus(); }, 60); }
    function cerrar() { busqueda.hidden = true; raiz.classList.remove('bif-sin-scroll'); }
    document.querySelectorAll('[data-bif-abrir-busqueda]').forEach(function (b) { b.addEventListener('click', abrir); });
    busqueda.querySelectorAll('[data-bif-cerrar-busqueda]').forEach(function (b) { b.addEventListener('click', cerrar); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { cerrar(); cerrarMenu(); }
      if (e.key === '/' && busqueda.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); abrir(); }
    });
    campo.addEventListener('input', function () {
      clearTimeout(t);
      var q = campo.value.trim();
      if (q.length < 2) { caja.innerHTML = inicial; return; }
      t = setTimeout(function () {
        ultima = q;
        fetch(raizUrl + 'search/suggest.json?q=' + encodeURIComponent(q) + '&resources[type]=product&resources[limit]=8')
          .then(function (r) { return r.json(); })
          .then(function (d) {
            if (q !== ultima) return;
            var ps = (d.resources && d.resources.results && d.resources.results.products) || [];
            if (!ps.length) { caja.innerHTML = '<p class="bif-busqueda__vacio">No encontramos “' + esc(q) + '”. Escríbenos por WhatsApp y te ayudamos a encontrarlo.</p>' + inicial; return; }
            caja.innerHTML = '<p class="bif-busqueda__sub">Productos</p><div class="bif-busqueda__lista">' + ps.map(function (p, i) {
              var img = p.image ? '<img src="' + p.image + (p.image.indexOf('?') > -1 ? '&' : '?') + 'width=160" alt="" loading="lazy">' : '';
              return '<a class="bif-busqueda__item" style="--n:' + i + '" href="' + p.url + '"><span class="bif-busqueda__img">' + img + '</span><span><b>' + esc(p.title) + '</b><small>' + (p.price ? '$' + Math.round(Number(p.price)).toLocaleString('es-CO') : '') + '</small></span></a>';
            }).join('') + '</div><a class="bif-busqueda__todos" href="' + raizUrl + 'search?type=product&q=' + encodeURIComponent(q) + '">Ver todos los resultados →</a>';
          })
          .catch(function () {});
      }, 200);
    });
  }

  // Botones que se acercan un poco al mouse.
  function iniciarMagneticos() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.bif-btn:not([data-mag]), .bif-header__wa:not([data-mag])').forEach(function (b) {
      b.dataset.mag = '1';
      b.addEventListener('mousemove', function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.18, y = (e.clientY - r.top - r.height / 2) * 0.28;
        b.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
      });
      b.addEventListener('mouseleave', function () { b.style.transform = ''; });
    });
  }

  function iniciar() { iniciarPalabras(); iniciarReveals(); iniciarAnuncios(); iniciarInclinacion(); iniciarContadores(); iniciarDesplegables(); iniciarRotadores(); iniciarPortadaMouse(); iniciarEncabezado(); iniciarMagneticos(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
  document.addEventListener('shopify:section:load', iniciar);
})();
