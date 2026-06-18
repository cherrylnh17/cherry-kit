/**
 * Contoh penggunaan dasar @cherrylnh/web-template-generator
 *
 * File ini mendemonstrasikan cara menggunakan fungsi generateTemplate()
 * yang merupakan fungsi utama library untuk menghasilkan halaman web.
 */

import {
  WebTemplateGenerator,
  generateTemplate,
  generateTemplateToFile,
  TemplateError
} from '../src/index';

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 1: Menggunakan fungsi generateTemplate() langsung
// ───────────────────────────────────────────────────────────────────────────────

function example1_generateTemplate() {
  console.log('\n=== Contoh 1: generateTemplate() ===\n');

  const result = generateTemplate(
    {
      // Data kustom dari user
      companyName: 'Kopi Nusantara',
      tagline: 'Kopi Terbaik dari Sabang sampai Merauke',
      heroTitle: 'Selamat Datang di Dunia Kopi',
      heroSubtitle: 'Nikmati cita rasa kopi nusantara terbaik',
      showHero: true,
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
      }
    },
    {
      language: 'id',           // Bahasa Indonesia
      templateType: 'landing',  // Gunakan template landing page
      theme: {
        primaryColor: '#6F4E37',   // Warna kopi
        secondaryColor: '#C4A882'  // Warna susu
      }
    }
  );

  console.log('HTML length:', result.html.length, 'characters');
  console.log('Contains "Selamat Datang":', result.html.includes('Selamat Datang'));
  console.log('Contains "Fitur":', result.html.includes('Fitur'));
  console.log('Contains company name:', result.html.includes('Kopi Nusantara'));
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 2: Menggunakan fluent API (method chaining)
// ───────────────────────────────────────────────────────────────────────────────

function example2_fluentAPI() {
  console.log('\n=== Contoh 2: Fluent API ===\n');

  const generator = new WebTemplateGenerator();

  const result = generator
    .setData({
      companyName: 'Toko Online Saya',
      tagline: 'Belanja Mudah, Hidup Nyaman',
      heroTitle: 'Toko Online Terpercaya',
      showHero: true,
      features: [
        { title: 'Produk Original', description: 'Semua produk dijamin 100% original' },
        { title: 'Gratis Ongkir', description: 'Gratis ongkir untuk pembelian di atas Rp 100.000' }
      ]
    })
    .setLanguage('id')
    .setTemplateType('landing')
    .setConfig({
      outputPath: './output/toko-online.html',
      theme: {
        primaryColor: '#E91E63',
        secondaryColor: '#9C27B0'
      }
    })
    .generate();

  console.log('Generated successfully! HTML length:', result.html.length);
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 3: Generate dalam bahasa Inggris
// ───────────────────────────────────────────────────────────────────────────────

function example3_englishLanguage() {
  console.log('\n=== Contoh 3: English Language ===\n');

  const result = generateTemplate(
    {
      companyName: 'Coffee Paradise',
      tagline: 'Premium Coffee From Around The World',
      heroTitle: 'Welcome to Coffee Paradise',
      heroSubtitle: 'Discover the finest coffee beans from Indonesia',
      showHero: true,
      features: [
        { title: 'Premium Selection', description: 'Hand-picked coffee beans from the best plantations' },
        { title: 'Fresh Roasted', description: 'Roasted daily to ensure maximum freshness' }
      ]
    },
    {
      language: 'en',           // Bahasa Inggris
      templateType: 'landing'
    }
  );

  // Semua teks bawaan template otomatis dalam bahasa Inggris
  console.log('Contains "Features":', result.html.includes('Features'));
  console.log('Contains "Contact Us":', result.html.includes('Contact Us'));
  console.log('Contains "Home":', result.html.includes('Home'));
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 4: Dengan fitur Three.js 3D
// ───────────────────────────────────────────────────────────────────────────────

function example4_threeJS() {
  console.log('\n=== Contoh 4: Three.js 3D Integration ===\n');

  const generator = new WebTemplateGenerator(
    {
      companyName: 'Tech Store',
      heroTitle: 'Welcome to Tech Store',
      showHero: true
    },
    {
      language: 'en',
      templateType: 'business',
      outputPath: './output/tech-store.html',
      theme: {
        primaryColor: '#1E40AF',
        secondaryColor: '#3B82F6'
      },
      threeJS: {
        enable: true,
        model: 'laptop',              // Tampilkan model laptop 3D
        backgroundColor: '0xf8fafc',  // Background warna abu muda
        cameraPosition: { x: 4, y: 3, z: 4 },
        autoRotate: true
      }
    }
  );

  const result = generator.generateToFile();
  console.log('Generated with Three.js laptop model!');
  console.log('Contains Three.js script:', result.html.includes('three.js'));
  console.log('Contains canvas container:', result.html.includes('threejs-container'));
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 5: Error handling - model Three.js tidak valid
// ───────────────────────────────────────────────────────────────────────────────

function example5_errorHandling() {
  console.log('\n=== Contoh 5: Error Handling ===\n');

  try {
    // Model Three.js tidak valid
    generateTemplate(
      { companyName: 'Test' },
      {
        language: 'id',
        templateType: 'basic',
        threeJS: {
          enable: true,
          model: 'model-tidak-ada' as any  // Model ini tidak ada!
        }
      }
    );
  } catch (error) {
    if (error instanceof TemplateError) {
      console.log('Caught TemplateError!');
      console.log('  Code:', error.code);
      console.log('  Message:', error.message);
    }
  }

  try {
    // Bahasa tidak valid
    generateTemplate(
      { companyName: 'Test' },
      {
        language: 'xx' as any,
        templateType: 'basic'
      }
    );
  } catch (error) {
    if (error instanceof TemplateError) {
      console.log('Caught TemplateError!');
      console.log('  Code:', error.code);
      console.log('  Message:', error.message);
    }
  }
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 6: Menggunakan DOM rendering (browser only)
// ───────────────────────────────────────────────────────────────────────────────

function example6_domRendering() {
  console.log('\n=== Contoh 6: DOM Rendering (Browser Only) ===\n');
  console.log('Contoh ini hanya bisa dijalankan di browser.');
  console.log(`
    // Di browser:
    import { renderToDOM } from '@cherrylnh/web-template-generator';

    renderToDOM(
      {
        companyName: 'My Website',
        heroTitle: 'Welcome!',
        showHero: true,
        features: [
          { title: 'Fast', description: 'Blazing fast performance' },
          { title: 'Secure', description: 'Enterprise-grade security' }
        ]
      },
      {
        language: 'en',
        templateType: 'landing',
        theme: { primaryColor: '#10B981' },
        threeJS: { enable: true, model: 'globe' }
      },
      '#app'  // CSS selector target element
    );
  `);
}

// ───────────────────────────────────────────────────────────────────────────────
// Contoh 7: Menampilkan semua opsi yang tersedia
// ───────────────────────────────────────────────────────────────────────────────

function example7_availableOptions() {
  console.log('\n=== Contoh 7: Available Options ===\n');

  console.log('Languages:', WebTemplateGenerator.getAvailableLanguages());
  console.log('Templates:', WebTemplateGenerator.getAvailableTemplates());
  console.log('3D Models:', WebTemplateGenerator.getAvailableThreeJSModels());
}

// ───────────────────────────────────────────────────────────────────────────────
// Jalankan semua contoh
// ───────────────────────────────────────────────────────────────────────────────

// Jalankan semua contoh (gunakan ts-node examples/basic-usage.ts)
example1_generateTemplate();
example2_fluentAPI();
example3_englishLanguage();
example4_threeJS();
example5_errorHandling();
example6_domRendering();
example7_availableOptions();

export {
  example1_generateTemplate,
  example2_fluentAPI,
  example3_englishLanguage,
  example4_threeJS,
  example5_errorHandling,
  example6_domRendering,
  example7_availableOptions
};