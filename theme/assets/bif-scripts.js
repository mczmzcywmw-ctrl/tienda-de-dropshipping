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

  function iniciar() { iniciarReveals(); iniciarAnuncios(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', iniciar);
  } else {
    iniciar();
  }
  document.addEventListener('shopify:section:load', iniciar);
})();
