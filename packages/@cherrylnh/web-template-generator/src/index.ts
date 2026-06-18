import {
  TemplateData,
  TemplateConfig,
  GeneratedTemplate,
  ThreeJSConfig,
  ThreeJSModelType,
  TemplateError
} from './types';
import { TemplateEngine } from './template-engine';
import { Localization } from './localization';
import { ThreeJSModule } from './threejs';
import * as path from 'path';
import * as fs from 'fs';

// ─── Validation helpers ───────────────────────────────────────────────────────

const SUPPORTED_LANGUAGES: ReadonlyArray<string> = ['id', 'en'];
const SUPPORTED_TEMPLATES: ReadonlyArray<string> = ['basic', 'business', 'portfolio', 'landing'];

/**
 * Validasi bahasa yang dipilih user
 */
function validateLanguage(language: string): asserts language is 'id' | 'en' {
  if (!language) {
    throw new TemplateError(
      'Language is required. Use "id" for Indonesian or "en" for English.',
      'INVALID_LANGUAGE'
    );
  }
  if (!SUPPORTED_LANGUAGES.includes(language)) {
    throw new TemplateError(
      `Unsupported language: "${language}". Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}`,
      'INVALID_LANGUAGE'
    );
  }
}

/**
 * Validasi tipe template
 */
function validateTemplateType(templateType: string): asserts templateType is TemplateConfig['templateType'] {
  if (!templateType) {
    throw new TemplateError(
      'Template type is required. Supported types: ' + SUPPORTED_TEMPLATES.join(', '),
      'INVALID_TEMPLATE_TYPE'
    );
  }
  if (!SUPPORTED_TEMPLATES.includes(templateType)) {
    throw new TemplateError(
      `Unsupported template type: "${templateType}". Supported types: ${SUPPORTED_TEMPLATES.join(', ')}`,
      'INVALID_TEMPLATE_TYPE'
    );
  }
}

/**
 * Validasi konfigurasi Three.js — memastikan model yang dipilih user tersedia
 */
function validateThreeJSConfig(threeJS: ThreeJSConfig): void {
  if (!threeJS.enable) return;

  const supportedModels = ThreeJSModule.getAvailableModels();
  if (!supportedModels.includes(threeJS.model)) {
    throw new TemplateError(
      `Unsupported 3D model: "${threeJS.model}". ` +
      `Supported models: ${supportedModels.join(', ')}`,
      'INVALID_THREEJS_MODEL'
    );
  }
}

/**
 * Validasi seluruh input sebelum generate
 */
function validateInput(config: TemplateConfig): void {
  validateLanguage(config.language);
  validateTemplateType(config.templateType);

  if (config.threeJS) {
    validateThreeJSConfig(config.threeJS);
  }
}

// ─── WebTemplateGenerator class ───────────────────────────────────────────────

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

  // ── Fluent setters ──────────────────────────────────────────────────────────

  /**
   * Set data untuk template (data di-merge dengan data sebelumnya)
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
   * Set bahasa untuk template ('id' | 'en')
   */
  setLanguage(language: 'id' | 'en'): this {
    this.config.language = language;
    return this;
  }

  /**
   * Aktifkan/nonaktifkan fitur Three.js 3D
   */
  setThreeJS(enable: boolean, model: ThreeJSModelType = 'kopi'): this {
    this.config.threeJS = { enable, model };
    return this;
  }

  /**
   * Set model 3D Three.js
   */
  setThreeJSModel(model: ThreeJSModelType): this {
    if (!this.config.threeJS) {
      this.config.threeJS = { enable: true, model };
    } else {
      this.config.threeJS.model = model;
    }
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
   * Set target DOM element ID untuk rendering langsung di browser
   */
  setDomTarget(elementId: string): this {
    this.config.domTarget = elementId;
    return this;
  }

  // ── Core generation ─────────────────────────────────────────────────────────

  /**
   * Generate template HTML.
   *
   * Alur:
   * 1. Validasi semua input (bahasa, template type, model Three.js)
   * 2. Terapkan i18n — ganti teks statis sesuai bahasa yang dipilih user
   * 3. Sisipkan komponen Three.js (jika diaktifkan) ke layout HTML
   * 4. Hasilkan output: HTML string, dan opsional CSS/JS terpisah
   */
  generate(): GeneratedTemplate {
    // ── 1. Validasi ────────────────────────────────────────────────────────
    try {
      validateInput(this.config);
    } catch (error) {
      // Re-throw TemplateError langsung, wrap error lain
      if (error instanceof TemplateError) {
        throw error;
      }
      throw new TemplateError(
        `Validation failed: ${(error as Error).message}`,
        'VALIDATION_ERROR'
      );
    }

    // ── 2. Generate HTML (termasuk i18n & Three.js injection) ─────────────
    let html: string;
    try {
      html = TemplateEngine.generateHTMLFile(this.data, this.config);
    } catch (error) {
      throw new TemplateError(
        `Failed to generate template: ${(error as Error).message}`,
        'GENERATION_ERROR'
      );
    }

    // ── 3. Generate CSS & JS terpisah jika diminta ────────────────────────
    let css = '';
    let js = '';
    const assets: string[] = [];

    if (this.config.includeAssets) {
      try {
        const outputDir = path.dirname(this.config.outputPath);
        const cssPath = path.join(outputDir, 'styles.css');
        const jsPath = path.join(outputDir, 'script.js');

        css = TemplateEngine.generateCSSFile(cssPath, this.config.theme);
        js = TemplateEngine.generateJSFile(jsPath);

        assets.push(cssPath, jsPath);
      } catch (error) {
        throw new TemplateError(
          `Failed to generate assets: ${(error as Error).message}`,
          'ASSET_ERROR'
        );
      }
    }

    return {
      html,
      css,
      js,
      assets: this.config.includeAssets ? assets : undefined
    };
  }

  /**
   * Generate template dan simpan ke file
   */
  generateToFile(): GeneratedTemplate {
    const result = this.generate();

    // Copy template assets jika ada
    if (this.config.includeAssets) {
      this.copyTemplateAssets();
    }

    return result;
  }

  /**
   * Generate template dan langsung render ke DOM target (untuk penggunaan di browser).
   *
   * @param targetSelector - CSS selector atau element ID dari target container
   *                        (opsional, jika tidak diisi akan menggunakan config.domTarget)
   * @returns GeneratedTemplate dengan HTML string
   *
   * Catatan: Method ini hanya bisa digunakan di environment browser.
   */
  renderToDOM(targetSelector?: string): GeneratedTemplate {
    const result = this.generate();

    // Cek apakah berjalan di browser
    if (typeof document === 'undefined') {
      throw new TemplateError(
        'renderToDOM() only works in browser environment. ' +
        'Use generate() or generateToFile() for Node.js.',
        'NOT_BROWSER_ENV'
      );
    }

    // Tentukan target element
    const selector = targetSelector || this.config.domTarget;
    if (!selector) {
      throw new TemplateError(
        'DOM target is required. Provide a CSS selector via renderToDOM(selector) ' +
        'or config.domTarget, or use setDomTarget().',
        'NO_DOM_TARGET'
      );
    }

    // Cari element target
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      throw new TemplateError(
        `DOM target element not found: "${selector}". ` +
        'Make sure the element exists before calling renderToDOM().',
        'DOM_TARGET_NOT_FOUND'
      );
    }

    // Render ke DOM
    targetElement.innerHTML = result.html;

    // Inject CSS ke head jika ada
    if (result.css) {
      const existingStyle = document.getElementById('cherry-template-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      const styleElement = document.createElement('style');
      styleElement.id = 'cherry-template-styles';
      styleElement.textContent = result.css;
      document.head.appendChild(styleElement);
    }

    // Execute JS jika ada
    if (result.js) {
      try {
        const scriptElement = document.createElement('script');
        scriptElement.id = 'cherry-template-script';
        scriptElement.textContent = result.js;
        document.body.appendChild(scriptElement);
      } catch (error) {
        console.warn('Failed to execute template script:', (error as Error).message);
      }
    }

    return result;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  /**
   * Copy template assets ke output directory
   */
  private copyTemplateAssets(): void {
    const outputDir = path.dirname(this.config.outputPath);
    const assetsDir = path.join(__dirname, '..', 'templates', 'assets');

    if (fs.existsSync(assetsDir)) {
      try {
        fs.cpSync(assetsDir, path.join(outputDir, 'assets'), { recursive: true });
        console.log(`Assets copied to: ${path.join(outputDir, 'assets')}`);
      } catch (error: any) {
        console.warn('Failed to copy assets:', error.message);
      }
    }
  }

  // ── Static helpers ──────────────────────────────────────────────────────────

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
      .filter((file: string) => file.endsWith('.html'))
      .map((file: string) => path.basename(file, '.html'));
  }

  /**
   * Dapatkan daftar model Three.js yang tersedia
   */
  static getAvailableThreeJSModels(): ThreeJSModelType[] {
    return ThreeJSModule.getAvailableModels();
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

// ─── Exports ──────────────────────────────────────────────────────────────────

export default WebTemplateGenerator;

// Re-export modul internal
export { TemplateEngine, Localization, ThreeJSModule };

// Re-export types
export type {
  TemplateData,
  TemplateConfig,
  GeneratedTemplate,
  ThreeJSConfig,
  ThreeJSModelType
};

// Re-export error class
export { TemplateError };

// ─── Fungsi helper top-level ──────────────────────────────────────────────────

/**
 * Generate template HTML string tanpa menyimpan ke file.
 *
 * @param data   - Data kustom dari user (nama, deskripsi, kontak, dll)
 * @param config - Konfigurasi template (bahasa, tipe, tema, Three.js)
 * @returns GeneratedTemplate { html, css, js }
 *
 * @example
 * ```typescript
 * const result = generateTemplate(
 *   {
 *     companyName: 'Kopi Nusantara',
 *     heroTitle: 'Selamat Datang',
 *     features: [
 *       { title: 'Biji Pilihan', description: '100% arabika' }
 *     ]
 *   },
 *   {
 *     language: 'id',
 *     templateType: 'landing',
 *     threeJS: { enable: true, model: 'kopi' }
 *   }
 * );
 * console.log(result.html); // Full HTML string
 * ```
 */
export function generateTemplate(
  data: TemplateData,
  config: Partial<TemplateConfig> = {}
): GeneratedTemplate {
  const generator = new WebTemplateGenerator(data, config);
  return generator.generate();
}

/**
 * Generate template dan simpan langsung ke file.
 */
export function generateTemplateToFile(
  data: TemplateData,
  config: Partial<TemplateConfig> = {}
): GeneratedTemplate {
  const generator = new WebTemplateGenerator(data, config);
  return generator.generateToFile();
}

/**
 * Generate template dan render langsung ke DOM target (browser only).
 *
 * @param data     - Data kustom dari user
 * @param config   - Konfigurasi template (harus menyertakan domTarget)
 * @param target   - CSS selector dari container DOM (opsional, override config.domTarget)
 * @returns GeneratedTemplate
 *
 * @example
 * ```typescript
 * // Di browser:
 * renderToDOM(
 *   { companyName: 'Toko Saya', heroTitle: 'Halo!' },
 *   { language: 'id', templateType: 'landing' },
 *   '#app'
 * );
 * ```
 */
export function renderToDOM(
  data: TemplateData,
  config: Partial<TemplateConfig> = {},
  target?: string
): GeneratedTemplate {
  const generator = new WebTemplateGenerator(data, config);
  return generator.renderToDOM(target);
}