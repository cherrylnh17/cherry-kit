# 🍒 Cherry Kit

> Monorepo toolkit untuk mempercepat development website UMKM dan web template.

---

## 📦 Packages

Monorepo ini terdiri dari beberapa package:

### 1. `@cherrylnh/web-template-generator`

Library generator template halaman web — cukup masukkan data, pilih bahasa, dan dapatkan HTML siap pakai!

**Fitur:**
- ✅ **Generate Halaman Web** — Masukkan data, dapatkan HTML lengkap (CSS + JS)
- ✅ **Multi-Bahasa (i18n)** — Dukungan bahasa **Indonesia (`id`)** dan **English (`en`)**, teks bawaan otomatis menyesuaikan
- ✅ **4 Jenis Template** — `basic`, `business`, `portfolio`, `landing`
- ✅ **Three.js 3D** — Sisipkan model 3D interaktif (kopi, laptop, buku, globe, dll)
- ✅ **Customizable Theme** — Ubah warna dan font sesuai brand
- ✅ **Browser & Node.js** — Generate file di server atau render langsung ke DOM di browser

### 2. `create-cherry-app`

CLI generator untuk membuat website UMKM berbasis Next.js dengan cepat.

---

## 🚀 Quick Start — Web Template Generator

### Instalasi

```bash
npm install @cherrylnh/web-template-generator
```

### Penggunaan Dasar

```typescript
import { generateTemplate } from '@cherrylnh/web-template-generator';

const result = generateTemplate(
  {
    companyName: 'Kopi Nusantara',
    heroTitle: 'Selamat Datang di Dunia Kopi',
    heroSubtitle: 'Nikmati cita rasa kopi nusantara terbaik',
    showHero: true,
    features: [
      { title: 'Biji Pilihan', description: '100% arabika lokal' },
      { title: 'Roasting Segar', description: 'Dipanggang setiap hari' }
    ]
  },
  {
    language: 'id',         // 'id' untuk Indonesia, 'en' untuk English
    templateType: 'landing' // 'basic' | 'business' | 'portfolio' | 'landing'
  }
);

console.log(result.html); // HTML string lengkap, siap disimpan atau ditampilkan
```

### Dengan Three.js 3D

```typescript
import { generateTemplateToFile } from '@cherrylnh/web-template-generator';

generateTemplateToFile(
  {
    companyName: 'Tech Store',
    heroTitle: 'Welcome to Tech Store',
    showHero: true,
    features: [
      { title: 'Fast', description: 'Blazing fast performance' }
    ]
  },
  {
    language: 'en',
    templateType: 'landing',
    outputPath: './output/index.html',
    theme: {
      primaryColor: '#1E40AF',
      secondaryColor: '#3B82F6'
    },
    threeJS: {
      enable: true,
      model: 'laptop',   // 'kopi' | 'laptop' | 'buku' | 'logo' | 'abstract' | 'globe'
      autoRotate: true
    }
  }
);
```

### Render Langsung ke DOM (Browser)

```typescript
import { renderToDOM } from '@cherrylnh/web-template-generator';

renderToDOM(
  { companyName: 'Website Saya', heroTitle: 'Halo Dunia!', showHero: true },
  { language: 'id', templateType: 'landing' },
  '#app'
);
```

📖 **Dokumentasi lengkap:** Lihat [`packages/@cherrylnh/web-template-generator/README.md`](./packages/@cherrylnh/web-template-generator/README.md)

---

## 🏗️ Development

### Prasyarat

- Node.js >= 18
- npm atau pnpm

### Setup

```bash
# Clone repository
git clone https://github.com/cherrylnh17/cherry-kit.git
cd cherry-kit

# Install dependency
npm install
```

### Build

Build semua package:

```bash
npm run build
```

Build package tertentu:

```bash
# Build web-template-generator
npx tsc -p packages/@cherrylnh/web-template-generator/tsconfig.json

# Build create-cherry-app
npm run build --workspace=create-cherry-app
```

### Run Example

```bash
npx ts-node packages/@cherrylnh/web-template-generator/examples/basic-usage.ts
```

---

## 📁 Struktur Project

```
cherry-kit/
├── packages/
│   ├── @cherrylnh/
│   │   └── web-template-generator/    # Library generator template web
│   │       ├── src/                    # Source code (TypeScript)
│   │       │   ├── index.ts           # Entry point & WebTemplateGenerator class
│   │       │   ├── types.ts           # TypeScript types & interfaces
│   │       │   ├── localization.ts    # Sistem i18n (multi-bahasa)
│   │       │   ├── template-engine.ts # Engine untuk generate HTML
│   │       │   ├── threejs.ts         # Three.js module (model 3D)
│   │       │   └── i18n/translations/ # File terjemahan (id.json, en.json)
│   │       ├── dist/                  # Output build (auto-generated)
│   │       ├── templates/assets/      # File statis
│   │       ├── examples/              # Contoh penggunaan
│   │       ├── package.json
│   │       ├── tsconfig.json
│   │       └── README.md             # Dokumentasi lengkap package ini
│   └── create-cherry-app/            # CLI generator website UMKM
│       ├── src/
│       ├── templates/
│       ├── package.json
│       └── README.md
├── package.json                       # Root package.json (npm workspaces)
├── tsconfig.base.json                 # Shared TypeScript config
├── turbo.json                         # Turborepo config
├── .npmrc
└── README.md                          # ← Kamu di sini!
```

---

## 📄 License

MIT © [cherrylnh](https://github.com/cherrylnh17)