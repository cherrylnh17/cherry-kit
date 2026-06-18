import { TemplateData, TemplateConfig, GeneratedTemplate } from './types';
import { TemplateEngine } from './template-engine';
import { Localization } from './localization';
import * as path from 'path';
import * as fs from 'fs-extra';

export class WebTemplateGenerator {
  private config: TemplateConfig;
  private data: TemplateData;

  constructor(data: TemplateData = {}, config: Partial<TemplateConfig> = {}) {
    this.data = data;
    this.config = {
      language: 'en',
      templateType: 'basic',
      outputPath: './output/index.html',
      includeAssets: false,
      theme: {
        primaryColor: '#4F46E5',
        secondaryColor: '#7C3AED',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      },
      ...config
    };
  }

  /**
   * Set data untuk template
   */
  setData(data: TemplateData): this {
    this.data = { ...this.data, ...data };
    return this;
  }

  /**
   * Set konfigurasi untuk generator
   */
  setConfig(config: Partial<TemplateConfig>): this {
    this.config = { ...this.config, ...config };
    return this;
  }

  /**
   * Set bahasa untuk template
   */
  setLanguage(language: 'id' | 'en'): this {
    this.config.language = language;
    return this;
  }

  /**
   * Set tipe template
   */
  setTemplateType(templateType: 'basic' | 'business' | 'portfolio' | 'landing'): this {
    this.config.templateType = templateType;
    return this;
  }

  /**
   * Set path output
   */
  setOutputPath(outputPath: string): this {
    this.config.outputPath = outputPath;
    return this;
  }

  /**
   * Generate template HTML
   */
  generate(): GeneratedTemplate {
    // Validasi data dan konfigurasi
    this.validateInput();

    // Generate HTML
    const html = TemplateEngine.generateHTMLFile(this.data, this.config);
    
    // Generate CSS dan JS terpisah jika diperlukan
    let css = '';
    let js = '';
    const assets: string[] = [];

    if (this.config.includeAssets) {
      const outputDir = path.dirname(this.config.outputPath);
      const cssPath = path.join(outputDir, 'styles.css');
      const jsPath = path.join(outputDir, 'script.js');

      css = TemplateEngine.generateCSSFile(cssPath, this.config.theme);
      js = TemplateEngine.generateJSFile(jsPath);
      
      assets.push(cssPath, jsPath);
    }

    return {
      html,
      css,
      js,
      assets: this.config.includeAssets ? assets : undefined
    };
  }

  /**
   * Generate dan simpan ke file
   */
  generateToFile(): GeneratedTemplate {
    const result = this.generate();
    
    // Jika assets termasuk, copy template assets jika ada
    if (this.config.includeAssets) {
      this.copyTemplateAssets();
    }

    return result;
  }

  /**
   * Validasi input data dan konfigurasi
   */
  private validateInput(): void {
    if (!this.config.language) {
      throw new Error('Language is required');
    }

    if (!['id', 'en'].includes(this.config.language)) {
      throw new Error(`Unsupported language: ${this.config.language}. Supported languages: id, en`);
    }

    if (!this.config.templateType) {
      throw new Error('Template type is required');
    }

    const supportedTemplates = ['basic', 'business', 'portfolio', 'landing'];
    if (!supportedTemplates.includes(this.config.templateType)) {
      throw new Error(`Unsupported template type: ${this.config.templateType}. Supported types: ${supportedTemplates.join(', ')}`);
    }
  }

  /**
   * Copy template assets ke output directory
   */
  private copyTemplateAssets(): void {
    const outputDir = path.dirname(this.config.outputPath);
    const assetsDir = path.join(__dirname, '..', 'templates', 'assets');

    if (fs.existsSync(assetsDir)) {
      try {
        fs.copySync(assetsDir, path.join(outputDir, 'assets'));
        console.log(`Assets copied to: ${path.join(outputDir, 'assets')}`);
      } catch (error) {
        console.warn('Failed to copy assets:', error.message);
      }
    }
  }

  /**
   * Dapatkan daftar bahasa yang tersedia
   */
  static getAvailableLanguages(): string[] {
    return Localization.getAvailableLanguages();
  }

  /**
   * Dapatkan daftar template yang tersedia
   */
  static getAvailableTemplates(): string[] {
    const templatesDir = path.join(__dirname, '..', 'templates');
    
    if (!fs.existsSync(templatesDir)) {
      return [];
    }

    const files = fs.readdirSync(templatesDir);
    return files
      .filter(file => file.endsWith('.html'))
      .map(file => path.basename(file, '.html'));
  }

  /**
   * Buat instance generator dengan konfigurasi cepat
   */
  static create(data: TemplateData = {}, config: Partial<TemplateConfig> = {}): WebTemplateGenerator {
    return new WebTemplateGenerator(data, config);
  }

  /**
   * Generate template dengan satu baris kode
   */
  static generateQuick(
    data: TemplateData,
    language: 'id' | 'en' = 'en',
    outputPath: string = './output/index.html'
  ): GeneratedTemplate {
    const generator = new WebTemplateGenerator(data, {
      language,
      outputPath,
      templateType: 'basic'
    });

    return generator.generateToFile();
  }
}

// Export utama
export default WebTemplateGenerator;

// Export utilitas
export { TemplateEngine, Localization };
export type { TemplateData, TemplateConfig, GeneratedTemplate };

// Export fungsi helper untuk penggunaan langsung
export function generateTemplate(
  data: TemplateData,
  config: Partial<TemplateConfig> = {}
): GeneratedTemplate {
  const generator = new WebTemplateGenerator(data, config);
  return generator.generate();
}

export function generateTemplateToFile(
  data: TemplateData,
  config: Partial<TemplateConfig> = {}
): GeneratedTemplate {
  const generator = new WebTemplateGenerator(data, config);
  return generator.generateToFile();
}