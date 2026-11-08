# Instrucciones de trabajo – Tienda de Bienestar BIF

## Cómo hablar con el usuario
- Todo en español, también los mensajes cortos de avance. Lenguaje sencillo: no es técnico.
- No usar palabras con género para referirse al usuario.

## Estándar de calidad (aplica a todo trabajo web)
Trabajar como un equipo de agencia: dirección creativa y UI/UX, desarrollo senior, marketing y conversión, SEO, rendimiento, accesibilidad y seguridad, todo integrado.

1. **Analizar antes de construir:** entender el negocio, el cliente ideal, el objetivo de la página y la acción que debe hacer el visitante. Inspeccionar el código existente antes de cambiarlo.
2. **Diseño premium y propio:** dirección artística definida, paleta coherente (verde de marca #477E33), tipografía consistente (Plus Jakarta Sans), espaciado y alineación cuidados, estados hover/focus, animaciones sutiles que respeten `prefers-reduced-motion`. Nada genérico ni sobrecargado.
3. **Conversión honesta:** propuesta de valor clara, CTA concretas (WhatsApp https://wa.me/573173570881, comprar), confianza con información real. Sin urgencia falsa, descuentos inventados ni contadores engañosos.
4. **Nunca inventar:** testimonios, clientes, cifras, certificaciones, direcciones, horarios, valoraciones ni usos de productos. Si falta un dato, preguntar de forma agrupada.
5. **SEO desde el principio:** title y description únicos, un H1 por página, encabezados en orden, canonical, Open Graph, JSON-LD con datos reales, enlaces internos y alt descriptivos. Ver `SEO.md`.
6. **Rendimiento:** objetivos LCP ≤ 2,5 s, INP < 200 ms, CLS < 0,1. Imágenes optimizadas (WebP), lazy loading fuera de la primera pantalla, sin recursos que bloqueen.
7. **Móvil primero:** probar en celular sin desbordes horizontales (`ancho.mjs`), botones cómodos y menús claros.
8. **Accesibilidad WCAG 2.2 AA:** HTML semántico, teclado, foco visible, contraste, etiquetas en formularios y nombres accesibles.
9. **Funciones reales:** ningún botón decorativo ni formulario que no envíe.
10. **Seguridad y privacidad:** no exponer credenciales, validar datos y no guardar datos personales innecesarios.
11. **Analítica:** medir clics en WhatsApp, añadir al carrito, inicio de pago y compras, respetando el consentimiento.
12. **Probar antes de entregar:** capturas en móvil y escritorio, consola, enlaces y SEO. No decir que algo se probó, publicó o conectó si no se hizo.
13. **Entregar con claridad:** qué se hizo, qué se probó, qué queda pendiente y qué datos se necesitan del usuario.

## Reglas del negocio
- **Precios:** terminan en 990 (redondear hacia abajo). El precio de comparación es el precio + 20.000. Nunca aplicar descuentos reales.
- **Productos:** títulos cortos (ej. "Hepar Sulfur"); los detalles van en la descripción.
- **Usos de productos:** investigarlos; si no hay información, decirlo con honestidad.
- **Textos:** transmitir confianza, sin frases que suenen a IA. Nunca escribir "no se ha demostrado".
- **Artículos del blog:** sin imágenes dentro.

## Reglas técnicas de Shopify
- El código propio del tema está en `theme/` (archivos `bif-*` y algunos del tema Horizon modificados).
- No se puede escribir en el tema publicado (MAIN). Editar la última versión sin publicar; si la última es MAIN, duplicarla. Crear las menos versiones posibles.
- Después de subir archivos al tema, comprobar con `checksumMd5` que se guardaron (Shopify a veces rechaza archivos sin avisar).
- En Liquid no se pueden escribir llaves `{}` dentro de `{{ }}`: guardarlas antes en una variable.
- Estado general: `ESTADO.md`. SEO: `SEO.md`.
