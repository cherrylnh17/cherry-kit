/**
 * Contoh penggunaan fitur Three.js 3D di Web Template Generator
 * 
 * Jalankan: node examples/threejs-usage.js
 */

const { WebTemplateGenerator, ThreeJSModule } = require('../dist/index.js');

// Data untuk template
const data = {
  companyName: 'Coffee House Premium',
  description: 'Pengalaman kopi terbaik untuk Anda',
  contactEmail: 'hello@coffeehouse.com',
  contactPhone: '+62 812-3456-7890',
  address: 'Jl. Sudirman No. 123, Jakarta',
  sections: {
    about: true,
    services: true,
    contact: true
  }
};

console.log('=== Contoh Penggunaan Three.js 3D ===\n');

// 1. Template dengan model kopi
console.log('1. Generate template dengan model kopi...');
const generatorKopi = new WebTemplateGenerator(data, {
  language: 'id',
  templateType: 'basic',
  outputPath: './output/threejs-kopi.html',
  theme: {
    primaryColor: '#8B4513',
    secondaryColor: '#D2691E',
    fontFamily: "'Segoe UI', sans-serif"
  }
});

generatorKopi.setThreeJS(true, 'kopi');
generatorKopi.generateToFile();
console.log('   ✓ Template dengan model kopi berhasil digenerate!\n');

// 2. Template dengan model globe (bahasa Inggris)
console.log('2. Generate template dengan model globe (English)...');
const generatorGlobe = new WebTemplateGenerator(data, {
  language: 'en',
  templateType: 'landing',
  outputPath: './output/threejs-globe.html',
  theme: {
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6'
  }
});

generatorGlobe.setThreeJS(true, 'globe');
generatorGlobe.generateToFile();
console.log('   ✓ Template dengan model globe berhasil digenerate!\n');

// 3. Template dengan model laptop
console.log('3. Generate template dengan model laptop...');
const generatorLaptop = new WebTemplateGenerator(data, {
  language: 'id',
  templateType: 'business',
  outputPath: './output/threejs-laptop.html',
  theme: {
    primaryColor: '#0F766E',
    secondaryColor: '#14B8A6'
  }
});

generatorLaptop.setThreeJS(true, 'laptop');
generatorLaptop.generateToFile();
console.log('   ✓ Template dengan model laptop berhasil digenerate!\n');

// 4. Generate semua model 3D
console.log('4. Generate semua model 3D yang tersedia...');
const allModels = ThreeJSModule.getAvailableModels();
console.log('   Model tersedia: ' + allModels.join(', ') + '\n');

allModels.forEach(function(model) {
  var generator = new WebTemplateGenerator(
    {
      companyName: '3D Demo - ' + model.toUpperCase(),
      description: 'Demo template dengan model 3D ' + model
    },
    {
      language: 'id',
      templateType: 'basic',
      outputPath: './output/threejs-' + model + '.html',
      theme: {
        primaryColor: '#4F46E5',
        secondaryColor: '#7C3AED'
      }
    }
  );

  generator.setThreeJS(true, model);
  generator.generateToFile();
  console.log('   ✓ Model ' + model + ' berhasil digenerate!');
});

console.log('\n=== Semua template 3D berhasil digenerate! ===');
console.log('Buka file di folder ./output/ untuk melihat hasilnya.');