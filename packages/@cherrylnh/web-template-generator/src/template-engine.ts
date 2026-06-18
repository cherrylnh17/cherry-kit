import { TemplateData, TemplateConfig } from './types';
import { Localization } from './localization';
import { ThreeJSModule } from './threejs';
import * as fs from 'fs';
import * as path from 'path';

export class TemplateEngine {
  /**
   * Render template dengan data dan konfigurasi
   */
  static renderTemplate(
    templateContent: string,
    data: TemplateData,
    config: TemplateConfig
  ): string {
    // Dapatkan terjemahan berdasarkan bahasa
    const t = (key: string) => Localization.translate(key, config.language);
    
    // Data yang akan digunakan untuk rendering
    const templateData = {
      ...data,
      language: config.language,
      primaryColor: config.theme?.primaryColor || '#4F46E5',
      secondaryColor: config.theme?.secondaryColor || '#7C3AED',
      fontFamily: config.theme?.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      // Tambahkan semua terjemahan
      welcome: t('welcome'),
      title: t('title'),
      description: t('description'),
      footer: t('footer'),
      contact: t('contact'),
      about: t('about'),
      services: t('services'),
      home: t('home'),
      learn_more: t('learn_more'),
      get_started: t('get_started'),
      features: t('features'),
      testimonials: t('testimonials'),
      pricing: t('pricing'),
      blog: t('blog'),
      contact_us: t('contact_us'),
      email: t('email'),
      phone: t('phone'),
      address: t('address'),
      submit: t('submit'),
      name: t('name'),
      message: t('message'),
      send: t('send'),
      loading: t('loading'),
      success: t('success'),
      error: t('error'),
      thank_you: t('thank_you'),
      back_to_home: t('back_to_home')
    };

    // Render template dengan data
    let rendered = templateContent;
    
    // Ganti semua placeholder {{variable}}
    for (const [key, value] of Object.entries(templateData)) {
      const placeholder = `{{${key}}}`;
      if (typeof value === 'string' || typeof value === 'number') {
        rendered = rendered.replace(new RegExp(placeholder, 'g'), String(value));
      } else if (typeof value === 'boolean') {
        rendered = rendered.replace(new RegExp(placeholder, 'g'), String(value));
      } else if (value === null || value === undefined) {
        rendered = rendered.replace(new RegExp(placeholder, 'g'), '');
      }
    }

    // Proses conditional statements {{if condition}} ... {{endif}}
    rendered = this.processConditionals(rendered, data);

    // Inject Three.js jika enabled
    if (config.threeJS?.enable) {
      const threeJSContainer = ThreeJSModule.generateContainer(config.threeJS);
      const threeJSScript = ThreeJSModule.generateScript(config.threeJS);
      
      // Inject container sebelum </body>
      rendered = rendered.replace(
        '</body>',
        `${threeJSContainer}\n<script>${threeJSScript}</script>\n</body>`
      );
    }

    return rendered;
  }

  /**
   * Proses conditional statements dalam template
   */
  private static processConditionals(template: string, data: TemplateData): string {
    const conditionalRegex = /\{\{if\s+([^}]+)\}\}([\s\S]*?)\{\{endif\}\}/g;
    
    return template.replace(conditionalRegex, (_match, condition, content) => {
      // Cek apakah kondisi terpenuhi
      const conditionValue = this.getConditionValue(condition.trim(), data);
      return conditionValue ? content : '';
    });
  }

  /**
   * Dapatkan nilai kondisi dari data
   */
  private static getConditionValue(condition: string, data: TemplateData): boolean {
    // Cek untuk kondisi sederhana (variable name)
    if (condition in data) {
      const value = (data as any)[condition];
      return Boolean(value);
    }

    // Cek untuk nested properties (e.g., sections.about)
    const parts = condition.split('.');
    let current: any = data;
    
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return false;
      }
    }
    
    return Boolean(current);
  }

  /**
   * Load template dari file
   */
  static loadTemplate(templateType: string): string {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateType}.html`);
    
    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template "${templateType}" not found at ${templatePath}`);
    }

    return fs.readFileSync(templatePath, 'utf-8');
  }

  /**
   * Generate file HTML dari template
   */
  static generateHTMLFile(
    data: TemplateData,
    config: TemplateConfig
  ): string {
    // Load template berdasarkan tipe
    const templateContent = this.loadTemplate(config.templateType);
    
    // Render template dengan data
    const renderedHTML = this.renderTemplate(templateContent, data, config);
    
    // Buat file output jika diperlukan
    if (config.outputPath) {
      const outputDir = path.dirname(config.outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      fs.writeFileSync(config.outputPath, renderedHTML, 'utf-8');
      console.log(`Template generated successfully: ${config.outputPath}`);
    }
    
    return renderedHTML;
  }

  /**
   * Generate file CSS terpisah (optional)
   */
  static generateCSSFile(outputPath: string, theme?: TemplateConfig['theme']): string {
    const cssContent = `
/* Generated CSS for Web Template */
:root {
  --primary-color: ${theme?.primaryColor || '#4F46E5'};
  --secondary-color: ${theme?.secondaryColor || '#7C3AED'};
  --font-family: ${theme?.fontFamily || "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  line-height: 1.6;
  color: #333;
  background-color: #f9f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn {
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 0.8rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
    `;

    if (outputPath) {
      fs.writeFileSync(outputPath, cssContent, 'utf-8');
      console.log(`CSS file generated: ${outputPath}`);
    }
    
    return cssContent;
  }

  /**
   * Generate file JavaScript terpisah (optional)
   */
  static generateJSFile(outputPath: string): string {
    const jsContent = `
// Generated JavaScript for Web Template
document.addEventListener('DOMContentLoaded', function() {
  // Form submission handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Mobile menu toggle (if needed)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
    });
  }
});
    `;

    if (outputPath) {
      fs.writeFileSync(outputPath, jsContent, 'utf-8');
      console.log(`JavaScript file generated: ${outputPath}`);
    }
    
    return jsContent;
  }
}