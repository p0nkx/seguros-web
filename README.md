# 🛡️ Seguros NAG

Landing page profesional desarrollada con **Next.js 16**, **React**, **TypeScript** y **Tailwind CSS**.

Este proyecto representa el sitio web institucional de una productora de seguros, diseñado para captar clientes y transmitir confianza, profesionalismo y claridad.

---

# 🚀 Tecnologías utilizadas

- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- React Icons
- Vercel (deploy automático)

---

# 📥 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js (versión LTS recomendada)**
- **Git**

Verificar instalación:

```bash
node -v
npm -v
git --version
```

---

# 📦 Instalación del proyecto

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/p0nkx/seguros-web.git
```

## 2️⃣ Ingresar a la carpeta del proyecto

```bash
cd seguros-web
```

## 3️⃣ Instalar dependencias

```bash
npm install
```

Esto instalará automáticamente todas las dependencias definidas en:

- package.json
- package-lock.json

---

# 🧪 Ejecutar en entorno de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

```
http://localhost:3000
```

El proyecto se actualizará automáticamente al guardar cambios.

---

```
seguros-web
├─ app
│  ├─ api
│  │  └─ enviar-email
│  │     └─ route.ts
│  ├─ clientes
│  │  ├─ actions.ts
│  │  └─ page.tsx
│  ├─ components
│  │  ├─ ClienteForm.tsx
│  │  ├─ ClientesList.tsx
│  │  ├─ CotizacionForm.tsx
│  │  ├─ Footer.tsx
│  │  ├─ Header.tsx
│  │  ├─ ScrollToTop.tsx
│  │  └─ WhatsappButton.tsx
│  ├─ cotizacion
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ login
│  │  └─ page.tsx
│  ├─ page.tsx
│  └─ src
│     └─ store
│        └─ useAuthStore.ts
├─ eslint.config.mjs
├─ lib
│  ├─ segurosConfig.ts
│  └─ validators.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ apple-touch-icon.png
│  ├─ banner.jpg
│  ├─ fakio-mono.jpg
│  ├─ favicon-96x96.png
│  ├─ favicon.ico
│  ├─ favicon.svg
│  ├─ favicon.zip
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ hero-mobile.jpg
│  ├─ hero-mobile2.webp
│  ├─ hero.png
│  ├─ logo-blanco-cuadrado.png
│  ├─ logo-blanco-cuadrado.svg
│  ├─ logo-blanco.png
│  ├─ logo-oscuro-cuadrado.png
│  ├─ logo-oscuro-cuadrado.svg
│  ├─ logo.png
│  ├─ logos
│  │  ├─ atm.webp
│  │  ├─ experta.png
│  │  ├─ federacion.png
│  │  ├─ galeno.png
│  │  ├─ rivadavia.avif
│  │  ├─ rivadavia.png
│  │  ├─ rus.png
│  │  ├─ san-cristobal.png
│  │  └─ sancor.png
│  ├─ next.svg
│  ├─ opencard.jpg
│  ├─ site.webmanifest
│  ├─ vercel.svg
│  ├─ web-app-manifest-192x192.png
│  ├─ web-app-manifest-512x512.png
│  └─ window.svg
├─ README.md
├─ test
│  ├─ ClienteForm.test.tsx
│  ├─ CotizacionForm.test.tsx
│  └─ validators.test.ts
├─ tsconfig.json
├─ vitest.config.ts
└─ vitest.setup.ts

```