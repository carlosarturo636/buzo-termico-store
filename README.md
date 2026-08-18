# Buzo térmico store

Landing ecommerce headless monoproducto construida con Next.js, React y TypeScript. Shopify será la única fuente comercial y gestionará producto, variantes, disponibilidad, carrito y checkout. Dropi se conectará directamente a Shopify y no forma parte de este frontend.

## Arquitectura

```text
Cliente → Next.js en Vercel → Shopify Storefront API → Shopify Checkout → Pedido en Shopify → Dropi
```

- `app/`: layout, página principal y estilos globales.
- `components/`: secciones modulares de la landing y controles interactivos.
- `lib/shopify.ts`: cliente privado y server-only de Storefront API 2026-07, consultas de producto y Cart API.
- `public/media/`: fotografías optimizadas, logo, pósteres y videos MP4 preparados para web. Los medios definitivos también podrán venir de Shopify CDN.

La landing conserva la identidad MUFASA, los medios locales y las medidas proporcionadas (mangas 65 cm, largo total 92 cm y contorno completo del torso 86 cm). Shopify aporta en tiempo real el nombre, descripción, precio, variantes y disponibilidad; las imágenes y videos no se reemplazan con medios de Shopify.

## Instalación

Requiere Node.js 20.9 o superior y pnpm.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Abre `http://localhost:3000`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | Dominio `myshopify.com` de la tienda. |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` | Token privado del canal Headless. Solo se usa en el servidor y nunca debe subirse al repositorio. |
| `SHOPIFY_PRODUCT_HANDLE` | Handle del producto (`mufasa`). |

No agregues `.env.local` ni credenciales reales a Git.

## Comandos

```bash
pnpm lint
pnpm build
pnpm start
```

## Flujo de compra

1. El Server Component consulta el producto por handle con Storefront API.
2. El visitante elige una variante real y disponible.
3. Una Server Action valida de nuevo la variante, crea el carrito con `cartCreate` y añade la línea con `cartLinesAdd`.
4. El navegador se redirige al `checkoutUrl` devuelto por Shopify.

No hay token en el navegador, checkout propio, lógica de pedidos ni integración directa con Dropi.
