import WebTemplateGenerator, { TemplateData, TemplateConfig } from '../index';
import { Localization } from '../localization';
import { TemplateEngine } from '../template-engine';

describe('WebTemplateGenerator', () => {
  describe('Constructor', () => {
    it('should create instance with default values', () => {
      const generator = new WebTemplateGenerator();
      expect(generator).toBeDefined();
    });

    it('should create instance with data and config', () => {
      const data: TemplateData = {
        companyName: 'Test Company',
        contactEmail: 'test@example.com'
      };
      const config: Partial<TemplateConfig> = {
        language: 'id',
        templateType: 'basic',
        outputPath: './test-output/index.html'
      };
      
      const generator = new WebTemplateGenerator(data, config);
      expect(generator).toBeDefined();
    });
  });

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const generator = new WebTemplateGenerator();
      
      const result = generator
        .setData({ companyName: 'Test' })
        .setLanguage('id')
        .setTemplateType('basic')
        .setOutputPath('./test.html');
      
      expect(result).toBe(generator);
    });
  });

  describe('Language Support', () => {
    it('should support Indonesian language', () => {
      const generator = new WebTemplateGenerator({}, { language: 'id' });
      expect(generator).toBeDefined();
    });

    it('should support English language', () => {
      const generator = new WebTemplateGenerator({}, { language: 'en' });
      expect(generator).toBeDefined();
    });

    it('should throw error for unsupported language', () => {
      const generator = new WebTemplateGenerator({}, { language: 'fr' as any });
      expect(() => generator.generate()).toThrow('Unsupported language');
    });
  });

  describe('Template Types', () => {
    it('should support basic template type', () => {
      const generator = new WebTemplateGenerator({}, { templateType: 'basic' });
      expect(generator).toBeDefined();
    });

    it('should support business template type', () => {
      const generator = new WebTemplateGenerator({}, { templateType: 'business' });
      expect(generator).toBeDefined();
    });

    it('should support portfolio template type', () => {
      const generator = new WebTemplateGenerator({}, { templateType: 'portfolio' });
      expect(generator).toBeDefined();
    });

    it('should support landing template type', () => {
      const generator = new WebTemplateGenerator({}, { templateType: 'landing' });
      expect(generator).toBeDefined();
    });
  });

  describe('Static Methods', () => {
    it('should return available languages', () => {
      const languages = WebTemplateGenerator.getAvailableLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
    });

    it('should return available templates', () => {
      const templates = WebTemplateGenerator.getAvailableTemplates();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should create instance with factory method', () => {
      const generator = WebTemplateGenerator.create();
      expect(generator).toBeInstanceOf(WebTemplateGenerator);
    });
  });
});

describe('Localization', () => {
  describe('Translation', () => {
    it('should translate welcome key for Indonesian', () => {
      const translation = Localization.translate('welcome', 'id');
      expect(translation).toBe('Selamat Datang');
    });

    it('should translate welcome key for English', () => {
      const translation = Localization.translate('welcome', 'en');
      expect(translation).toBe('Welcome');
    });

    it('should return key if translation not found', () => {
      const translation = Localization.translate('nonexistent_key', 'en');
      expect(translation).toBe('nonexistent_key');
    });

    it('should fallback to default language if language not found', () => {
      const translation = Localization.translate('welcome', 'fr');
      expect(translation).toBeDefined();
    });
  });

  describe('Language Management', () => {
    it('should return available languages', () => {
      const languages = Localization.getAvailableLanguages();
      expect(Array.isArray(languages)).toBe(true);
      expect(languages).toContain('id');
      expect(languages).toContain('en');
    });

    it('should get all translations for a language', () => {
      const translations = Localization.getAllTranslations('id');
      expect(translations).toBeDefined();
      expect(translations.welcome).toBe('Selamat Datang');
    });

    it('should set default language', () => {
      expect(() => Localization.setDefaultLanguage('id')).not.toThrow();
      expect(() => Localization.setDefaultLanguage('en')).not.toThrow();
    });

    it('should throw error when setting unsupported default language', () => {
      expect(() => Localization.setDefaultLanguage('fr')).toThrow();
    });

    it('should add custom translations', () => {
      const customTranslations = { custom_key: 'Custom Value' };
      expect(() => Localization.addTranslations('id', customTranslations)).not.toThrow();
      
      const translation = Localization.translate('custom_key', 'id');
      expect(translation).toBe('Custom Value');
    });
  });
});

describe('TemplateEngine', () => {
  describe('Render Template', () => {
    it('should render template with data', () => {
      const template = '<h1>{{welcome}}</h1><p>{{companyName}}</p>';
      const data: TemplateData = {
        companyName: 'Test Company'
      };
      const config: TemplateConfig = {
        language: 'id',
        templateType: 'basic',
        outputPath: './test.html'
      };

      const rendered = TemplateEngine.renderTemplate(template, data, config);
      expect(rendered).toContain('Selamat Datang');
      expect(rendered).toContain('Test Company');
    });

    it('should handle conditional sections', () => {
      const template = '{{if about}}<section>About</section>{{endif}}';
      const data: TemplateData = {
        sections: { about: true }
      };
      const config: TemplateConfig = {
        language: 'en',
        templateType: 'basic',
        outputPath: './test.html'
      };

      const rendered = TemplateEngine.renderTemplate(template, data, config);
      expect(rendered).toContain('<section>About</section>');
    });

    it('should hide conditional sections when false', () => {
      const template = '{{if about}}<section>About</section>{{endif}}';
      const data: TemplateData = {
        sections: { about: false }
      };
      const config: TemplateConfig = {
        language: 'en',
        templateType: 'basic',
        outputPath: './test.html'
      };

      const rendered = TemplateEngine.renderTemplate(template, data, config);
      expect(rendered).not.toContain('<section>About</section>');
    });
  });
});