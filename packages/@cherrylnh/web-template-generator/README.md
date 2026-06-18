# @cherrylnh/web-template-generator

> Library generator template halaman web — cukup masukkan data, pilih bahasa, dan dapatkan HTML siap pakai! 🍒

---

## ✨ Fitur Utama

- **Generate Halaman Web** — Masukkan data kamu, library akan menghasilkan HTML lengkap (dengan CSS & JS).
- **Multi-Bahasa (i18n)** — Dukungan bahasa **Indonesia (`id`)** dan **English (`en`)**. Semua teks bawaan template otomatis menyesuaikan.
- **4 Jenis Template** — `basic`, `business`, `portfolio`, `landing`.
- **Three.js 3D** — Sisipkan model 3D interaktif langsung ke halaman (kopi, laptop, buku, globe, dll).
- **Customizable Theme** — Ubah warna dan font sesuai brand kamu.
- **Browser & Node.js** — Bisa dipakai di server (generate file) maupun langsung di browser (render ke DOM).

---

## 📦 Instalasi

```bash
npm install @cherrylnh/web-template-generator
```

Atau kalau kamu pakai monorepo:

```bash
pnpm add @cherrylnh/web-template-generator --filter your-package
```

---

## 🚀 Penggunaan Dasar

### Paling Simpel — Satu Baris Jadi

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
    language: 'id',         // Pakai bahasa Indonesia
    templateType: 'landing' // Template landing page
  }
);

// result.html → String HTML lengkap, siap disimpan atau ditampilkan
console.log(result.html);
```

### Fluent API — Method Chaining

Kalau kamu lebih suka gaya chain, bisa pakai `WebTemplateGenerator` langsung:

```typescript
import { WebTemplateGenerator } from '@cherrylnh/web-template-generator';

const generator = new WebTemplateGenerator();

const result = generator
  .setData({
    companyName: 'Toko Online Saya',
    heroTitle: 'Belanja Mudah, Hidup Nyaman',
    showHero: true,
    features: [
      { title: 'Produk Original', description: '100% original' },
      { title: 'Gratis Ongkir', description: 'Min. belanja Rp 100rb' }
    ]
  })
  .setLanguage('id')               // 'id' atau 'en'
  .setTemplateType('landing')      // 'basic' | 'business' | 'portfolio' | 'landing'
  .setConfig({
    outputPath: './output/index.html',
    theme: {
      primaryColor: '#E91E63',
      secondaryColor: '#9C27B0'
    }
  })
  .generate();

console.log(result.html);
```

### Render Langsung ke DOM (Browser)

```typescript
import { renderToDOM } from '@cherrylnh/web-template-generator';

renderToDOM(
  {
    companyName: 'Website Saya',
    heroTitle: 'Halo Dunia!',
    showHero: true,
    features: [
      { title: 'Cepat', description: 'Performa kilat' },
      { title: 'Aman', description: 'Keamanan enterprise' }
    ]
  },
  {
    language: 'id',
    templateType: 'landing'
  },
  '#app'  // CSS selector container di HTML kamu
);
```

---

## ⚙️ Configuration Object

Saat memanggil `generateTemplate(data, config)` atau menggunakan `setConfig()`, kamu bisa mengatur berbagai opsi berikut:

```typescript
{
  // Bahasa template — teks bawaan (menu, tombol, footer, dll) otomatis berubah
  language: 'id',  // 'id' = Indonesia | 'en' = English

  // Jenis template
  templateType: 'landing',  // 'basic' | 'business' | 'portfolio' | 'landing'

  // Path output file (untuk generate ke file)
  outputPath: './output/index.html',

  // Apakah generate CSS & JS sebagai file terpisah
  includeAssets: false,

  // Target DOM element (untuk renderToDOM di browser)
  domTarget: '#app',

  // Tema / styling
  theme: {
    primaryColor: '#4F46E5',     // Warna utama (tombol, link, aksen)
    secondaryColor: '#7C3AED',   // Warna sekunder
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },

  // Konfigurasi Three.js (opsional)
  threeJS: {
    enable: true,                // true = aktifkan model 3D
    model: 'kopi',              // Model 3D yang ditampilkan
    backgroundColor: '0xf0f0f0', // Warna background canvas (hex number)
    cameraPosition: { x: 5, y: 4, z: 5 }, // Posisi kamera
    autoRotate: true             // Model otomatis berputar
  }
}
```

### Pilihan Bahasa (`language`)

| Nilai | Bahasa | Keterangan |
|-------|--------|------------|
| `'id'` | Indonesia | Menu: Beranda, Tentang, Layanan, Fitur, Kontak |
| `'en'` | English | Menu: Home, About, Services, Features, Contact |

Semua teks bawaan template (navigasi, judul section, tombol, footer) otomatis berubah sesuai bahasa yang dipilih. Konten dari data user tetap apa adanya — **tidak di-translate otomatis**.

```typescript
// Contoh: Bahasa Indonesia
generateTemplate(data, { language: 'id' });
// → Navbar: Beranda | Tentang | Layanan | Fitur | Kontak
// → Footer: © 2026 Nama Perusahaan. Hak cipta dilindungi.

// Contoh: Bahasa Inggris
generateTemplate(data, { language: 'en' });
// → Navbar: Home | About | Services | Features | Contact
// → Footer: © 2026 Company Name. All rights reserved.
```

### Pilihan Template (`templateType`)

| Nilai | Deskripsi |
|-------|-----------|
| `'basic'` | Template sederhana, cocok untuk halaman personal atau blog |
| `'business'` | Template profesional untuk perusahaan atau startup |
| `'portfolio'` | Template untuk menampilkan portofolio dan karya |
| `'landing'` | Template landing page dengan hero section, fitur, dan CTA |

### Pilihan Model Three.js (`threeJS.model`)

| Nilai | Model | Deskripsi |
|-------|-------|-----------|
| `'kopi'` | ☕ Cangkir Kopi | Cangkir lengkap dengan cangkir, pegangan, dan piring |
| `'laptop'` | 💻 Laptop | Laptop dengan layar, keyboard, dan touchpad |
| `'buku'` | 📖 Buku | Buku terbuka dengan halaman dan teks |
| `'logo'` | 🔮 Logo 3D | Bentuk geometris abstrak (sphere + torus orbiting) |
| `'abstract'` | 💎 Geometri Abstrak | Icosahedron dengan efek wireframe dan partikel |
| `'globe'` | 🌍 Globe | Bola dunia dengan garis lintang/bujur dan benua |

```typescript
// Aktifkan Three.js dengan model laptop
generateTemplate(data, {
  language: 'id',
  templateType: 'landing',
  threeJS: {
    enable: true,
    model: 'laptop',
    backgroundColor: '0xf8fafc',
    autoRotate: true
  }
});
```

**Tips**: Model 3D bisa di-rotate dengan mouse drag, dan di-zoom dengan scroll. Atur `autoRotate: false` kalau mau user kontrol penuh.

---

## 📋 Data Object

Parameter pertama `generateTemplate(data, config)` adalah objek data yang isinya bebas. Beberapa field yang umum dipakai:

```typescript
{
  // Identitas
  companyName: 'Nama Perusahaan',
  tagline: 'Tagline perusahaan kamu',

  // Hero Section
  heroTitle: 'Judul Besar di Atas',
  heroSubtitle: 'Subtitle di bawah judul',
  heroButtonText: 'Mulai Sekarang',
  heroButtonLink: '#features',
  heroImage: 'https://example.com/hero.jpg',
  showHero: true,

  // Konten
  aboutText: 'Tentang perusahaan kamu...',
  features: [
    { title: 'Fitur 1', description: 'Deskripsi fitur 1' },
    { title: 'Fitur 2', description: 'Deskripsi fitur 2' },
    { title: 'Fitur 3', description: 'Deskripsi fitur 3' }
  ],

  // Section visibility
  sections: {
    about: true,
    services: true,
    features: true,
    contact: true
  },

  // Footer / Contact
  email: 'halo@example.com',
  phone: '+62 812-3456-7890',
  address: 'Jakarta, Indonesia',

  // Sosial media (muncul di footer)
  socialMedia: {
    instagram: 'https://instagram.com/kamu',
    twitter: 'https://twitter.com/kamu',
    linkedin: 'https://linkedin.com/in/kamu'
  }
}
```

> **Catatan**: Field `TemplateData` bersifat fleksibel (`Record<string, any>`). Kamu bisa menambahkan field apa saja dan menggunakannya di template custom.

---

## 🎨 Contoh Lengkap

### Landing Page Toko Kopi (Bahasa Indonesia + Model 3D)

```typescript
import { generateTemplateToFile } from '@cherrylnh/web-template-generator';

generateTemplateToFile(
  {
    companyName: 'Kopi Nusantara',
    tagline: 'Kopi Terbaik dari Sabang sampai Merauke',
    heroTitle: 'Selamat Datang di Dunia Kopi',
    heroSubtitle: 'Nikmati cita rasa kopi nusantara terbaik',
    heroButtonText: 'Pesan Sekarang',
    showHero: true,
    aboutText: 'Kopi Nusantara adalah brand kopi lokal yang menghadirkan biji kopi pilihan dari seluruh Indonesia.',
    features: [
      { title: 'Biji Pilihan', description: '100% kopi arabika lokal berkualitas tinggi' },
      { title: 'Roasting Segar', description: 'Dipanggang setiap hari untuk kesegaran optimal' },
      { title: 'Pengiriman Cepat', description: 'Sampai di rumah Anda dalam 2-3 hari kerja' }
    ],
    sections: {
      about: true,
      services: true,
      features: true,
      contact: true
    },
    email: 'halo@kopinusantara.id',
    phone: '+62 21-1234-5678',
    socialMedia: {
      instagram: 'https://instagram.com/kopinusantara'
    }
  },
  {
    language: 'id',
    templateType: 'landing',
    outputPath: './output/kopi-nusantara.html',
    theme: {
      primaryColor: '#6F4E37',   // Warna kopi
      secondaryColor: '#C4A882'  // Warna susu
    },
    threeJS: {
      enable: true,
      model: 'kopi',
      backgroundColor: '0xfdf5e6',
      autoRotate: true
    }
  }
);

console.log('✅ Halaman berhasil di-generate di ./output/kopi-nusantara.html');
```

### Business Page English (Tanpa Three.js)

```typescript
import { generateTemplate } from '@cherrylnh/web-template-generator';

const result = generateTemplate(
  {
    companyName: 'TechCorp',
    tagline: 'Innovation at its finest',
    heroTitle: 'Build the Future',
    heroSubtitle: 'We create digital solutions that matter',
    heroButtonText: 'Get Started',
    showHero: true,
    features: [
      { title: 'Cloud Solutions', description: 'Scalable infrastructure for your business' },
      { title: 'AI Integration', description: 'Smart automation powered by machine learning' },
      { title: '24/7 Support', description: 'Always here when you need us' }
    ]
  },
  {
    language: 'en',
    templateType: 'business',
    theme: {
      primaryColor: '#1E40AF',
      secondaryColor: '#3B82F6'
    }
  }
);

console.log(result.html);
```

---

## 🔧 API Reference

### Fungsi Utama

| Fungsi | Return | Deskripsi |
|--------|--------|-----------|
| `generateTemplate(data, config)` | `GeneratedTemplate` | Generate HTML string tanpa menyimpan ke file |
| `generateTemplateToFile(data, config)` | `GeneratedTemplate` | Generate dan simpan ke file |
| `renderToDOM(data, config, target?)` | `GeneratedTemplate` | Render langsung ke elemen DOM (browser only) |

### `WebTemplateGenerator` Class

| Method | Return | Deskripsi |
|--------|--------|-----------|
| `setData(data)` | `this` | Set data template (method chaining) |
| `setLanguage('id' \| 'en')` | `this` | Set bahasa |
| `setTemplateType(type)` | `this` | Set jenis template |
| `setConfig(config)` | `this` | Set konfigurasi lengkap |
| `setThreeJS(enable, model?)` | `this` | Aktifkan/nonaktifkan Three.js |
| `setDomTarget(selector)` | `this` | Set target DOM element |
| `generate()` | `GeneratedTemplate` | Generate HTML string |
| `generateToFile()` | `GeneratedTemplate` | Generate & simpan ke file |
| `renderToDOM(target?)` | `GeneratedTemplate` | Render ke DOM (browser) |

### Static Methods

| Method | Return | Deskripsi |
|--------|--------|-----------|
| `WebTemplateGenerator.getAvailableLanguages()` | `string[]` | Daftar bahasa tersedia (`['id', 'en']`) |
| `WebTemplateGenerator.getAvailableTemplates()` | `string[]` | Daftar template tersedia |
| `WebTemplateGenerator.getAvailableThreeJSModels()` | `string[]` | Daftar model 3D tersedia |
| `WebTemplateGenerator.create(data, config)` | `WebTemplateGenerator` | Factory method |

### `GeneratedTemplate` Object

```typescript
{
  html: string;       // HTML string lengkap
  css: string;        // CSS string (jika includeAssets: true)
  js: string;         // JS string (jika includeAssets: true)
  assets?: string[];  // Path file assets (jika includeAssets: true)
}
```

---

## 📁 Struktur Project

```
packages/@cherrylnh/web-template-generator/
├── src/
│   ├── index.ts              # Entry point & WebTemplateGenerator class
│   ├── types.ts              # TypeScript types & interfaces
│   ├── localization.ts       # Sistem i18n (multi-bahasa)
│   ├── template-engine.ts    # Engine untuk generate HTML
│   ├── threejs.ts            # Three.js module (model 3D)
│   └── i18n/
│       └── translations/
│           ├── id.json       # Terjemahan bahasa Indonesia
│           └── en.json       # Terjemahan bahasa Inggris
├── templates/
│   └── assets/               # File statis (CSS, gambar, dll)
├── examples/
│   └── basic-usage.ts        # Contoh penggunaan
├── dist/                     # Output build (auto-generated)
├── package.json
├── tsconfig.json
└── README.md                 # ← Kamu di sini!
```

---

## 🤝 Kontribusi

Library ini adalah bagian dari monorepo `cherry-kit`. Silakan ikuti konvensi yang sudah ada di project.

---

## 📄 License

MIT © cherrylnh