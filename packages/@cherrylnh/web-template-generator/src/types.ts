export type ThreeJSModelType = 'kopi' | 'laptop' | 'buku' | 'logo' | 'abstract' | 'globe';

export interface ThreeJSConfig {
  enable: boolean;
  model: ThreeJSModelType;
  backgroundColor?: string;
  cameraPosition?: { x: number; y: number; z: number };
  autoRotate?: boolean;
  customModelUrl?: string;
}

export interface TemplateData {
  // Data umum
  title?: string;
  description?: string;
  companyName?: string;
  tagline?: string;
  logoUrl?: string;

  // Kontak
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };

  // Hero section
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  showHero?: boolean;

  // Section toggles
  sections?: {
    about?: boolean;
    services?: boolean;
    testimonials?: boolean;
    contact?: boolean;
    pricing?: boolean;
    features?: boolean;
    hero?: boolean;
  };

  // Konten kustom (flexible)
  features?: Array<{ title: string; description: string; icon?: string }>;
  services?: Array<{ title: string; description: string; price?: string }>;
  testimonials?: Array<{ name: string; role: string; content: string; avatarUrl?: string }>;
  pricingPlans?: Array<{ name: string; price: string; features: string[]; highlighted?: boolean }>;
  teamMembers?: Array<{ name: string; role: string; bio: string; avatarUrl?: string }>;

  // Data kustom bebas (user bisa memasukkan data apapun)
  customContent?: Record<string, any>;
  [key: string]: any;
}

export interface TemplateConfig {
  language: 'id' | 'en';
  templateType: 'basic' | 'business' | 'portfolio' | 'landing';
  outputPath: string;
  includeAssets?: boolean;
  threeJS?: ThreeJSConfig;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
  };
  // Target DOM element untuk rendering langsung di browser (opsional)
  domTarget?: string;
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

/**
 * Opsi error yang lebih deskriptif
 */
export class TemplateError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'TemplateError';
    this.code = code;
  }
}