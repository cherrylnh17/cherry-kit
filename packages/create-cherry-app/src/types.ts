export type Language = "ts" | "js";

export type AuthProvider = "none" | "email" | "google-email";

export type ScaffoldConfig = {
  projectName: string;
  language: Language;
  auth: AuthProvider;
  install: boolean;
};