/* BIF – Cuenta regresiva de oferta (se carga en la tienda con un Script Tag).
   Para cambiar la hora de fin o los textos, edita CONFIG. */
(function () {
  var CONFIG = {
    fin: '2026-09-29T15:00:00-05:00', // hora de Colombia
    etiqueta: 'Oferta por tiempo limitado',
    titulo: '¡30% de descuento en toda la tienda!',
    texto: 'Se aplica solo al pagar. Aprovecha antes de que se acabe el tiempo.',
    boton: 'Aprovechar ahora',
    enlace: '/collections/all'
  };
  var fin = new Date(CONFIG.fin).getTime();
  if (isNaN(fin) || fin <= Date.now()) return;

  function iniciar() {
    // Si el tema ya trae su propia cuenta regresiva (tema v2), no se duplica.
    if (document.querySelector('.bif-cuenta') || document.getElementById('bifx-cuenta')) return;

    var css = '' +
      '#bifx-cuenta{position:relative;overflow:hidden;z-index:50;color:#fff;font-family:Poppins,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:linear-gradient(110deg,#1F3B17 0%,#477E33 55%,#1F3B17 100%);background-size:200% 100%;animation:bifx-fondo 12s ease-in-out infinite;-webkit-font-smoothing:antialiased}' +
      '#bifx-cuenta *{box-sizing:border-box;margin:0;padding:0;font-family:inherit}' +
      '#bifx-cuenta:before{content:"";position:absolute;inset:0;background:linear-gradient(100deg,transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);transform:translateX(-100%);animation:bifx-brillo 5s ease-in-out infinite;pointer-events:none}' +
      '@keyframes bifx-fondo{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}' +
      '@keyframes bifx-brillo{0%{transform:translateX(-100%)}60%,100%{transform:translateX(100%)}}' +
      '#bifx-cuenta .bx-fila{position:relative;display:flex;align-items:center;justify-content:space-between;gap:28px;max-width:1264px;margin:0 auto;padding:14px 32px}' +
      '#bifx-cuenta .bx-texto{display:flex;align-items:center;gap:16px;min-width:0}' +
      '#bifx-cuenta .bx-pildora{display:inline-flex;align-items:center;gap:8px;flex-shrink:0;padding:6px 12px;border-radius:999px;background:#E8C872;color:#1F3B17;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;line-height:1.2}' +
      '#bifx-cuenta .bx-pulso{width:7px;height:7px;border-radius:50%;background:#C0392B;animation:bifx-pulso 1.6s infinite}' +
      '@keyframes bifx-pulso{0%{box-shadow:0 0 0 0 rgba(192,57,43,.6)}70%{box-shadow:0 0 0 8px rgba(192,57,43,0)}100%{box-shadow:0 0 0 0 rgba(192,57,43,0)}}' +
      '#bifx-cuenta .bx-titulo{display:block;font-size:17px;font-weight:600;line-height:1.25;letter-spacing:-.01em;color:#fff}' +
      '#bifx-cuenta .bx-sub{font-size:13px;line-height:1.4;opacity:.82;margin-top:2px;color:#fff}' +
      '#bifx-cuenta .bx-reloj{display:flex;align-items:center;gap:14px;flex-shrink:0}' +
      '#bifx-cuenta .bx-termina{font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;opacity:.8}' +
      '#bifx-cuenta .bx-casillas{display:flex;align-items:center;gap:6px}' +
      '#bifx-cuenta .bx-casilla{display:flex;flex-direction:column;align-items:center;min-width:54px;padding:7px 6px 5px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22)}' +
      '#bifx-cuenta .bx-casilla b{display:block;font-size:24px;font-weight:700;line-height:1;font-variant-numeric:tabular-nums;color:#fff}' +
      '#bifx-cuenta .bx-casilla b.is-cambio{animation:bifx-num .45s cubic-bezier(.22,1,.36,1)}' +
      '@keyframes bifx-num{0%{transform:translateY(-40%);opacity:0}100%{transform:none;opacity:1}}' +
      '#bifx-cuenta .bx-casilla small{font-size:9.5px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;opacity:.75;margin-top:4px;color:#fff}' +
      '#bifx-cuenta .bx-sep{font-size:20px;font-weight:700;opacity:.6;animation:bifx-parp 1s steps(1) infinite}' +
      '@keyframes bifx-parp{50%{opacity:.15}}' +
      '#bifx-cuenta.is-urgente .bx-casilla{background:rgba(192,57,43,.28);border-color:rgba(255,180,170,.45)}' +
      '#bifx-cuenta .bx-boton{display:inline-flex;align-items:center;gap:8px;flex-shrink:0;padding:12px 22px;border-radius:999px;background:#E8C872;color:#1F3B17!important;font-size:14px;font-weight:600;text-decoration:none!important;transition:transform .3s,box-shadow .3s;box-shadow:0 8px 20px -8px rgba(0,0,0,.4)}' +
      '#bifx-cuenta .bx-boton:hover{transform:translateY(-2px)}' +
      '@media(max-width:990px){#bifx-cuenta .bx-fila{flex-wrap:wrap;justify-content:center;gap:12px 18px;text-align:center;padding:14px 20px}#bifx-cuenta .bx-texto{flex-direction:column;gap:8px;width:100%}#bifx-cuenta .bx-sub{display:none}}' +
      '@media(max-width:600px){#bifx-cuenta .bx-titulo{font-size:15.5px}#bifx-cuenta .bx-termina{display:none}#bifx-cuenta .bx-casilla{min-width:48px;padding:6px 4px 4px}#bifx-cuenta .bx-casilla b{font-size:20px}#bifx-cuenta .bx-boton{width:100%;justify-content:center;padding:11px 18px}}' +
      '@media(prefers-reduced-motion:reduce){#bifx-cuenta,#bifx-cuenta:before,#bifx-cuenta .bx-sep,#bifx-cuenta .bx-pulso,#bifx-cuenta .bx-casilla b.is-cambio{animation:none}}';

    var estilo = document.createElement('style');
    estilo.textContent = css;
    document.head.appendChild(estilo);

    var fuente = document.createElement('link');
    fuente.rel = 'stylesheet';
    fuente.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap';
    document.head.appendChild(fuente);

    var casilla = function (k, n) { return '<div class="bx-casilla"><b data-v="' + k + '">00</b><small>' + n + '</small></div>'; };
    var barra = document.createElement('div');
    barra.id = 'bifx-cuenta';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Oferta por tiempo limitado');
    barra.innerHTML =
      '<div class="bx-fila">' +
        '<div class="bx-texto"><span class="bx-pildora"><span class="bx-pulso"></span>' + CONFIG.etiqueta + '</span>' +
        '<div><strong class="bx-titulo">' + CONFIG.titulo + '</strong><p class="bx-sub">' + CONFIG.texto + '</p></div></div>' +
        '<div class="bx-reloj"><span class="bx-termina">Termina en</span><div class="bx-casillas">' +
          '<div class="bx-casilla" data-dias style="display:none"><b data-v="d">00</b><small>Días</small></div>' +
          casilla('h', 'Horas') + '<span class="bx-sep">:</span>' + casilla('m', 'Min') + '<span class="bx-sep">:</span>' + casilla('s', 'Seg') +
        '</div></div>' +
        '<a class="bx-boton" href="' + CONFIG.enlace + '">' + CONFIG.boton + ' <span aria-hidden="true">→</span></a>' +
      '</div>';

    var destino = document.getElementById('header-group') || document.querySelector('header') || document.body.firstElementChild;
    if (destino && destino.parentNode) destino.parentNode.insertBefore(barra, destino);
    else document.body.insertBefore(barra, document.body.firstChild);

    var campos = { d: barra.querySelector('[data-v="d"]'), h: barra.querySelector('[data-v="h"]'), m: barra.querySelector('[data-v="m"]'), s: barra.querySelector('[data-v="s"]') };
    var cajaDias = barra.querySelector('[data-dias]');
    var dos = function (n) { return (n < 10 ? '0' : '') + n; };
    var poner = function (k, v) {
      var t = campos[k];
      if (t.textContent === v) return;
      t.textContent = v;
      t.classList.remove('is-cambio'); void t.offsetWidth; t.classList.add('is-cambio');
    };
    var timer;
    var tic = function () {
      var r = Math.floor((fin - Date.now()) / 1000);
      if (r <= 0) { clearInterval(timer); barra.parentNode && barra.parentNode.removeChild(barra); return; }
      var d = Math.floor(r / 86400), h = Math.floor(r % 86400 / 3600), m = Math.floor(r % 3600 / 60), s = r % 60;
      cajaDias.style.display = d === 0 ? 'none' : '';
      poner('d', dos(d)); poner('h', dos(h)); poner('m', dos(m)); poner('s', dos(s));
      barra.classList.toggle('is-urgente', r < 3600);
    };
    tic();
    timer = setInterval(tic, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
