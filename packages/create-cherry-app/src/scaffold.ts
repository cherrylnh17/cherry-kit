import fs from "fs-extra";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runInstall } from "./runner.js";
import { slugifyProjectName } from "./utils.js";

export type Language = "ts" | "js";
export type Database = "sqlite" | "mysql" | "supabase";
export type AuthProvider = "both" | "google" | "email";
export type PackageManager = "pnpm" | "npm" | "yarn";

export interface ScaffoldConfig {
  projectName: string;
  language: Language;
  database: Database;
  auth: AuthProvider;
  packageManager: PackageManager;
  runInstall: boolean;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function scaffold(config: ScaffoldConfig) {
  const projectName = slugifyProjectName(config.projectName);
  const dest = path.resolve(process.cwd(), projectName);

  const templateDir = path.resolve(__dirname, "../templates/nextjs-ts");

  if (await fs.pathExists(dest)) {
    throw new Error(`Folder "${projectName}" sudah ada.`);
  }

  if (!(await fs.pathExists(templateDir))) {
    throw new Error(`Template tidak ditemukan: ${templateDir}`);
  }

  await fs.copy(templateDir, dest);
  await writePackageJson(dest, projectName);
  await writeCherryConfig(dest, config);

  if (config.runInstall) {
    await runInstall(dest, config.packageManager);
  }
}

async function writePackageJson(dest: string, projectName: string) {
  const packageJsonPath = path.join(dest, "package.json");

  if (!(await fs.pathExists(packageJsonPath))) {
    return;
  }

  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = projectName;

  await fs.writeJson(packageJsonPath, packageJson, {
    spaces: 2
  });
}

async function writeCherryConfig(dest: string, config: ScaffoldConfig) {
  const content = `export const cherryConfig = {
  projectName: "${slugifyProjectName(config.projectName)}",
  language: "${config.language}",
  database: "${config.database}",
  auth: "${config.auth}"
} as const;
`;

  await fs.writeFile(path.join(dest, "cherry.config.ts"), content);
}