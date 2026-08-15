# Buzo térmico store

Landing ecommerce headless monoproducto construida con Next.js, React y TypeScript. Shopify será la única fuente comercial y gestionará producto, variantes, disponibilidad, carrito y checkout. Dropi se conectará directamente a Shopify y no forma parte de este frontend.

## Arquitectura

```text
Cliente → Next.js en Vercel → Shopify Storefront API → Shopify Checkout → Pedido en Shopify → Dropi
```

- `app/`: layout, página principal y estilos globales.
- `components/`: secciones modulares de la landing y controles interactivos.
- `lib/shopify.ts`: cliente central de Storefront API y tipos compartidos.
- `public/`: medios locales provisionales; los medios definitivos podrán venir de Shopify CDN.

Los datos comerciales mostrados actualmente son provisionales. Cuando se configure Shopify, nombre, descripción, precio, medios, variantes y disponibilidad se consultarán desde Storefront API.

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
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Token público de Storefront API. Nunca debe subirse al repositorio. |
| `SHOPIFY_STOREFRONT_API_VERSION` | Versión soportada de la API, definida al conectar Shopify. |
| `SHOPIFY_PRODUCT_HANDLE` | Handle real del producto monoproducto. |

No agregues `.env.local` ni credenciales reales a Git.

## Comandos

```bash
pnpm lint
pnpm build
pnpm start
```

## Próxima integración Shopify

1. Crear/confirmar el producto y sus variantes reales en Shopify.
2. Crear un token de Storefront API y completar `.env.local`.
3. Añadir consultas de producto y mutaciones de carrito en `lib/shopify.ts`.
4. Sustituir los placeholders por datos y medios reales.
5. Conectar `Comprar ahora` a la variante seleccionada y redirigir a `checkoutUrl` de Shopify.

No se implementará checkout propio, lógica de pedidos ni integración directa con Dropi.
