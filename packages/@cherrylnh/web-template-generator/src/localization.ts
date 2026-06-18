import { LocalizationData } from './types';
import * as fs from 'fs';
import * as path from 'path';

export class Localization {
  private static locales: Map<string, LocalizationData> = new Map();
  private static defaultLanguage: string = 'en';

  /**
   * Load localization data from JSON files
   */
  static loadLocales(): void {
    const localesDir = path.join(__dirname, '..', 'locales');
    
    if (!fs.existsSync(localesDir)) {
      throw new Error(`Locales directory not found: ${localesDir}`);
    }

    const localeFiles = fs.readdirSync(localesDir).filter((file: string) => file.endsWith('.json'));
    
    for (const file of localeFiles) {
      const language = path.basename(file, '.json');
      const filePath = path.join(localesDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const data: LocalizationData = JSON.parse(content);
      this.locales.set(language, data);
    }

    console.log(`Loaded ${this.locales.size} locale(s): ${Array.from(this.locales.keys()).join(', ')}`);
  }

  /**
   * Get translation for a specific key in the specified language
   */
  static translate(key: string, language: string = this.defaultLanguage): string {
    if (!this.locales.has(language)) {
      console.warn(`Language "${language}" not found, falling back to "${this.defaultLanguage}"`);
      language = this.defaultLanguage;
    }

    const locale = this.locales.get(language);
    if (!locale) {
      throw new Error(`Locale data not loaded for language: ${language}`);
    }

    return locale[key] || key;
  }

  /**
   * Set default language
   */
  static setDefaultLanguage(language: string): void {
    if (!this.locales.has(language)) {
      throw new Error(`Language "${language}" not available. Available languages: ${Array.from(this.locales.keys()).join(', ')}`);
    }
    this.defaultLanguage = language;
  }

  /**
   * Get all available languages
   */
  static getAvailableLanguages(): string[] {
    return Array.from(this.locales.keys());
  }

  /**
   * Get all translations for a specific language
   */
  static getAllTranslations(language: string): LocalizationData {
    const locale = this.locales.get(language);
    if (!locale) {
      throw new Error(`Language "${language}" not found`);
    }
    return { ...locale };
  }

  /**
   * Add custom translations for a language
   */
  static addTranslations(language: string, translations: LocalizationData): void {
    const existing = this.locales.get(language) || {};
    this.locales.set(language, { ...existing, ...translations });
  }
}

// Auto-load locales when module is imported
try {
  Localization.loadLocales();
} catch (error: any) {
  console.warn('Failed to load locales:', error.message);
}
