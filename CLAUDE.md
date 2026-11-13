# Instrucciones de trabajo – Tienda de Bienestar BIF

## Cómo hablar con el usuario
- Todo en español, también los mensajes cortos de avance. Lenguaje sencillo: no es técnico.
- No usar palabras con género para referirse al usuario.

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
- Un ajuste de texto en `{% schema %}` no puede tener `"default": ""` (Shopify rechaza el archivo sin avisar).
- Subir primero la sección y después la plantilla JSON: si la sección todavía no tiene un ajuste nuevo, Shopify lo borra del JSON.
- Estado general: `ESTADO.md`. SEO: `SEO.md`.
