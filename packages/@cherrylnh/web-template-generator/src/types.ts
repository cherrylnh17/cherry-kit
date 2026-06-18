export interface TemplateData {
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

export interface TemplateConfig {
  language: 'id' | 'en';
  templateType: 'basic' | 'business' | 'portfolio' | 'landing';
  outputPath: string;
  includeAssets?: boolean;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
}

export interface LocalizationData {
  [key: string]: string;
}

export interface GeneratedTemplate {
  html: string;
  css: string;
  js: string;
  assets?: string[];
}