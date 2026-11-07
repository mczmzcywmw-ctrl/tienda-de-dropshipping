# SEO – BIF Tienda de Bienestar

Última revisión: 7 de noviembre de 2026.

## Cómo está hecha la tienda
- Shopify (plan Basic), tema Horizon con secciones propias `bif-*`.
- Dominio principal: `tiendadebienestarbif.myshopify.com` (HTTPS activo, sin dominio propio).
- Un solo idioma (español), así que no hace falta hreflang.
- La tienda no tiene contraseña, así que Google puede entrar.
- Shopify crea solo `robots.txt` y `sitemap.xml`, y bloquea por defecto el carrito, el pago, la cuenta, el admin y la búsqueda. No hace falta personalizarlo.

## Cambios en el tema (versión "BIF Bienestar v19 (SEO)")
| Archivo | Cambio |
|---|---|
| `snippets/meta-tags.liquid` | Título y descripción de la portada, color de marca, Open Graph en español (`es_CO`), imagen por defecto para compartir (logo), `twitter:image`, títulos sin la marca repetida, textos "Página N" en español y `noindex, follow` en páginas filtradas por etiqueta y en la búsqueda. |
| `snippets/bif-seo.liquid` (nuevo) | JSON-LD: Organization (todas las páginas), WebSite con buscador (portada) y BreadcrumbList (productos, colecciones, blog, artículos y páginas). Product y Article ya los genera el tema. |
| `layout/theme.liquid` | Fuente con `preconnect`, `bif-styles.css` cargado desde el `<head>` y renderizado de `bif-seo`. |
| `assets/bif-styles.css` | Se quitó el `@import` de la fuente, que bloqueaba la carga. |
| `sections/bif-hero.liquid` | La foto de fondo (2400 px) ya no se descarga cuando el efecto vidrio la oculta. |

## Cambios en el contenido (ya en vivo)
- Marca (vendor) real en 10 productos que decían "Mi tienda": Plenitud Orgánica, Jaquin de Francia, Laboratorio Homeopático Alemán y Heel.
- Título SEO más corto para Colagoquin.
- Título y descripción SEO para los 20 artículos antiguos del blog, el blog "noticias", Políticas de privacidad y Términos y condiciones.
- Descripción de Nutrición deportiva corregida (no hay proteína en la tienda).
- Colección "Página de inicio" (`frontpage`) oculta de Google y del sitemap (`seo.hidden`).

## Pendiente
- Publicar la versión v19 del tema.
- Verificar en vivo (robots, sitemap, etiquetas) desde el entorno `tienda-de-dropshipping`, que sí tiene acceso a la tienda.
- Marca real de 9 productos que siguen como "Mi tienda".
- Enlaces reales de Instagram y TikTok (hoy el pie de página apunta a instagram.com y tiktok.com genéricos).
- Código de verificación de Google Search Console.
- Confirmar si se atiende en persona en Cali (dirección y horario) para agregar LocalBusiness.
