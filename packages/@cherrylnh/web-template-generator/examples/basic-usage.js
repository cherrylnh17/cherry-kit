// Contoh penggunaan Web Template Generator

const { WebTemplateGenerator, generateTemplateToFile } = require('../dist/index.js');

// Contoh 1: Menggunakan class dengan method chaining
console.log('=== Contoh 1: Menggunakan Class dengan Method Chaining ===');

const generator = new WebTemplateGenerator()
  .setData({
    title: 'My Awesome Website',
    companyName: 'Digital Solutions Inc.',
    description: 'Solusi digital terbaik untuk bisnis Anda',
    contactEmail: 'info@digitalsolutions.com',
    contactPhone: '+62 21 1234 5678',
    address: 'Jakarta, Indonesia',
    socialMedia: {
      facebook: 'https://facebook.com/digitalsolutions',
      instagram: 'https://instagram.com/digitalsolutions',
      linkedin: 'https://linkedin.com/company/digitalsolutions'
    },
    sections: {
      about: true,
      services: true,
      contact: true,
      pricing: false,
      testimonials: false
    }
  })
  .setLanguage('id')
  .setTemplateType('basic')
  .setOutputPath('./examples/output/id/index.html')
  .setConfig({
    includeAssets: true,
    theme: {
      primaryColor: '#3B82F6',
      secondaryColor: '#10B981',
      fontFamily: "'Inter', sans-serif"
    }
  });

try {
  const result = generator.generateToFile();
  console.log('✅ Template berhasil digenerate (Bahasa Indonesia)');
  console.log('📁 Output:', generator.config.outputPath);
  console.log('📄 HTML length:', result.html.length, 'characters');
  console.log('🎨 CSS generated:', result.css ? 'Yes' : 'No');
  console.log('⚡ JS generated:', result.js ? 'Yes' : 'No');
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Contoh 2: Menggunakan fungsi helper
console.log('\n=== Contoh 2: Menggunakan Fungsi Helper ===');

try {
  const result2 = generateTemplateToFile(
    {
      companyName: 'My Startup',
      contactEmail: 'hello@startup.com',
      sections: {
        about: true,
        contact: true
      }
    },
    {
      language: 'en',
      templateType: 'basic',
      outputPath: './examples/output/en/index.html',
      includeAssets: false
    }
  );
  
  console.log('✅ Template berhasil digenerate (English)');
  console.log('📁 Output:', './examples/output/en/index.html');
  console.log('📄 HTML preview:', result2.html.substring(0, 100) + '...');
} catch (error) {
  console.error('❌ Error:', error.message);
}

// Contoh 3: Menggunakan static method
console.log('\n=== Contoh 3: Menggunakan Static Method ===');

console.log('🌐 Available languages:', WebTemplateGenerator.getAvailableLanguages());
console.log('📋 Available templates:', WebTemplateGenerator.getAvailableTemplates());

// Contoh 4: Quick generation
console.log('\n=== Contoh 4: Quick Generation ===');

try {
  const quickResult = WebTemplateGenerator.generateQuick(
    {
      companyName: 'Quick Business',
      contactEmail: 'quick@business.com'
    },
    'id',
    './examples/output/quick/index.html'
  );
  
  console.log('✅ Quick template generated');
  console.log('📁 Output:', './examples/output/quick/index.html');
} catch (error) {
  console.error('❌ Error:', error.message);
}

console.log('\n=== Selesai ===');