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

  function iniciar() { iniciarPalabras(); iniciarReveals(); iniciarAnuncios(); iniciarInclinacion(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
  document.addEventListener('shopify:section:load', iniciar);
})();
