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

  function iniciar() { iniciarPalabras(); iniciarReveals(); iniciarAnuncios(); iniciarInclinacion(); iniciarContadores(); iniciarDesplegables(); iniciarRotadores(); iniciarPortadaMouse(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
  document.addEventListener('shopify:section:load', iniciar);
})();
