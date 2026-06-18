# Web Template Generator

Library JavaScript/TypeScript untuk generate template halaman web dengan fitur multi-bahasa (i18n) dan 3D Three.js.

## Fitur

- ✅ **Multi-bahasa support** - Template otomatis tersedia dalam bahasa Indonesia (id) dan Inggris (en)
- ✅ **Template fleksibel** - Support berbagai tipe template (basic, business, portfolio, landing)
- ✅ **Customizable** - Warna, font, dan konten dapat disesuaikan
- ✅ **Conditional rendering** - Support conditional statements dalam template
- ✅ **Assets generation** - Generate file CSS dan JavaScript terpisah
- ✅ **Three.js 3D Support** - Integrasi elemen 3D dengan berbagai model (kopi, laptop, buku, logo, abstract, globe)
- ✅ **TypeScript support** - Full TypeScript definitions

## Instalasi

```bash
npm install @cherrylnh/web-template-generator
```

atau

```bash
yarn add @cherrylnh/web-template-generator
```

## Penggunaan

### Contoh Dasar

```javascript
import WebTemplateGenerator from '@cherrylnh/web-template-generator';

// Data untuk template
const data = {
  title: 'My Awesome Website',
  companyName: 'My Company',
  contactEmail: 'contact@example.com',
  contactPhone: '+62 812-3456-7890',
  address: 'Jakarta, Indonesia',
  socialMedia: {
    facebook: 'https://facebook.com/mycompany',
    instagram: 'https://instagram.com/mycompany'
  },
  sections: {
    about: true,
    services: true,
    contact: true
  }
};

// Konfigurasi
const config = {
  language: 'id', // 'id' untuk Indonesia, 'en' untuk English
  templateType: 'basic',
  outputPath: './dist/index.html',
  includeAssets: true,
  theme: {
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981'
  }
};

// Generate template
const generator = new WebTemplateGenerator(data, config);
const result = generator.generateToFile();

console.log('Template berhasil digenerate!');
console.log('HTML:', result.html.substring(0, 100) + '...');
```

### Menggunakan Fungsi Helper

```javascript
import { generateTemplateToFile } from '@cherrylnh/web-template-generator';

const result = generateTemplateToFile(
  {
    companyName: 'My Startup',
    contactEmail: 'hello@startup.com'
  },
  {
    language: 'en',
    templateType: 'basic',
    outputPath: './public/index.html'
  }
);
```

### Menggunakan Metode Chaining

```javascript
import WebTemplateGenerator from '@cherrylnh/web-template-generator';

const result = WebTemplateGenerator.create()
  .setData({
    companyName: 'My Business',
    description: 'Solusi terbaik untuk kebutuhan Anda'
  })
  .setLanguage('id')
  .setTemplateType('business')
  .setOutputPath('./output/website.html')
  .generateToFile();
```

### Menggunakan Fitur Three.js 3D

```javascript
import WebTemplateGenerator from '@cherrylnh/web-template-generator';

// Template dengan elemen 3D model kopi
const result = WebTemplateGenerator.create()
  .setData({
    companyName: 'Coffee Shop',
    description: 'Kopi terbaik untuk Anda'
  })
  .setLanguage('id')
  .setThreeJS(true, 'kopi') // Aktifkan 3D dengan model kopi
  .setTemplateType('basic')
  .setOutputPath('./output/3d-website.html')
  .generateToFile();
```

**Model 3D yang tersedia:**

| Model | Deskripsi |
|-------|-----------|
| `kopi` | Objek cangkir kopi dengan piring dan sendok |
| `laptop` | Model laptop dengan layar dan keyboard |
| `buku` | Objek buku terbuka dengan halaman |
| `logo` | Bentuk 3D abstrak untuk logo |
| `abstract` | Geometri abstrak berputar |
| `globe` | Bola dunia dengan garis lintang/bujur |

## API Reference

### WebTemplateGenerator

Kelas utama untuk generate template.

#### Constructor
```typescript
new WebTemplateGenerator(data?: TemplateData, config?: Partial<TemplateConfig>)
```

#### Methods

- `setData(data: TemplateData): this` - Set data untuk template
- `setConfig(config: Partial<TemplateConfig>): this` - Set konfigurasi
- `setLanguage(language: 'id' | 'en'): this` - Set bahasa template
- `setThreeJS(enable: boolean, model?: ThreeJSModelType): this` - Aktifkan/nonaktifkan 3D
- `setThreeJSModel(model: ThreeJSModelType): this` - Set model 3D
- `setTemplateType(type: 'basic' | 'business' | 'portfolio' | 'landing'): this` - Set tipe template
- `setOutputPath(path: string): this` - Set path output
- `generate(): GeneratedTemplate` - Generate template (return object)
- `generateToFile(): GeneratedTemplate` - Generate dan simpan ke file

#### Static Methods
- `WebTemplateGenerator.getAvailableLanguages(): string[]` - Dapatkan daftar bahasa
- `WebTemplateGenerator.getAvailableTemplates(): string[]` - Dapatkan daftar template
- `WebTemplateGenerator.create(data, config): WebTemplateGenerator` - Factory method
- `WebTemplateGenerator.generateQuick(data, language, outputPath): GeneratedTemplate` - Generate cepat

### TemplateData Interface

```typescript
interface TemplateData {
  title?: string;
  description?: string;
  companyName?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  sections?: {
    about?: boolean;
    services?: boolean;
    testimonials?: boolean;
    contact?: boolean;
    pricing?: boolean;
  };
  customContent?: Record<string, any>;
}
```

### TemplateConfig Interface

```typescript
interface TemplateConfig {
  language: 'id' | 'en';
  templateType: 'basic' | 'business' | 'portfolio' | 'landing';
  outputPath: string;
  includeAssets?: boolean;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  threeJS?: ThreeJSConfig;
}

interface ThreeJSConfig {
  enable: boolean;
  model: 'kopi' | 'laptop' | 'buku' | 'logo' | 'abstract' | 'globe';
}

type ThreeJSModelType = ThreeJSConfig['model'];
```

## Template Syntax

### Variables
Gunakan `{{variable}}` untuk menampilkan data:

```html
<h1>{{welcome}}</h1>
<p>{{description}}</p>
```

### Conditionals
Gunakan `{{if condition}}` dan `{{endif}}` untuk conditional rendering:

```html
{{if sections.about}}
<section id="about">
  <!-- Konten tentang -->
</section>
{{endif}}
```

### Available Variables dalam Template

| Variable | Deskripsi |
|----------|-----------|
| `{{welcome}}` | Teks welcome (tergantung bahasa) |
| `{{title}}` | Judul halaman |
| `{{description}}` | Deskripsi halaman |
| `{{companyName}}` | Nama perusahaan |
| `{{contactEmail}}` | Email kontak |
| `{{contactPhone}}` | Telepon kontak |
| `{{address}}` | Alamat |
| `{{primaryColor}}` | Warna utama dari theme |
| `{{secondaryColor}}` | Warna sekunder dari theme |
| `{{fontFamily}}` | Font family dari theme |
| `{{home}}`, `{{about}}`, `{{services}}`, dll | Terjemahan berdasarkan bahasa |

## Menambahkan Bahasa Baru

1. Buat file JSON baru di folder `locales/`
2. Tambahkan terjemahan dengan format yang sama seperti `id.json` dan `en.json`
3. File akan otomatis terload saat library diinisialisasi

Contoh `locales/es.json`:
```json
{
  "welcome": "Bienvenido",
  "title": "Tu Página Web",
  "description": "Esta es una página web creada con Web Template Generator"
}
```

## Menambahkan Template Baru

1. Buat file HTML baru di folder `templates/`
2. Gunakan syntax template seperti di atas
3. Template akan otomatis tersedia melalui `WebTemplateGenerator.getAvailableTemplates()`

## Contoh Lengkap

```javascript
import WebTemplateGenerator from '@cherrylnh/web-template-generator';

// Contoh data lengkap
const data = {
  title: 'My Awesome Business',
  description: 'Solusi digital terbaik untuk bisnis Anda',
  companyName: 'Digital Solutions Inc.',
  contactEmail: 'info@digitalsolutions.com',
  contactPhone: '+62 21 1234 5678',
  address: 'Jl. Sudirman No. 123, Jakarta',
  socialMedia: {
    facebook: 'https://facebook.com/digitalsolutions',
    instagram: 'https://instagram.com/digitalsolutions',
    linkedin: 'https://linkedin.com/company/digitalsolutions'
  },
  sections: {
    about: true,
    services: true,
    testimonials: false,
    contact: true,
    pricing: true
  },
  customContent: {
    tagline: 'Innovate. Create. Succeed.',
    yearFounded: 2020
  }
};

// Generate dalam bahasa Indonesia
const generatorID = new WebTemplateGenerator(data, {
  language: 'id',
  templateType: 'business',
  outputPath: './output/id/index.html',
  includeAssets: true,
  theme: {
    primaryColor: '#2563EB',
    secondaryColor: '#059669',
    fontFamily: "'Inter', sans-serif"
  }
});

const resultID = generatorID.generateToFile();

// Generate dalam bahasa Inggris
const generatorEN = new WebTemplateGenerator(data, {
  language: 'en',
  templateType: 'business',
  outputPath: './output/en/index.html',
  includeAssets: true
});

const resultEN = generatorEN.generateToFile();

console.log('Template Indonesia:', resultID.html.substring(0, 50) + '...');
console.log('Template English:', resultEN.html.substring(0, 50) + '...');
```

### Contoh dengan Three.js 3D

```javascript
import WebTemplateGenerator from '@cherrylnh/web-template-generator';

// Generate landing page dengan elemen 3D
const generator = new WebTemplateGenerator(
  {
    companyName: 'Coffee House',
    description: 'Pengalaman kopi premium',
    contactEmail: 'hello@coffeehouse.com'
  },
  {
    language: 'id',
    templateType: 'landing',
    outputPath: './output/3d-landing.html',
    theme: {
      primaryColor: '#8B4513',
      secondaryColor: '#D2691E'
    }
  }
);

// Aktifkan Three.js dengan model kopi
generator.setThreeJS(true, 'kopi');
generator.generateToFile();

// Ganti model menjadi globe
generator.setThreeJSModel('globe');
generator.setOutputPath('./output/3d-globe.html');
generator.generateToFile();
```

### Contoh Generate Semua Model 3D

```javascript
import WebTemplateGenerator, { ThreeJSModule } from '@cherrylnh/web-template-generator';

const models = ThreeJSModule.getAvailableModels();
const data = { companyName: '3D Demo', description: 'Demo semua model' };

models.forEach(model => {
  WebTemplateGenerator.create(data)
    .setLanguage('en')
    .setThreeJS(true, model)
    .setOutputPath(`./output/3d-${model}.html`)
    .generateToFile();
  
  console.log(`Generated: 3d-${model}.html`);
});
```

## Lisensi

MIT