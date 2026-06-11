import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as p from "@clack/prompts";
import { runInstall } from "./install.js";
import type { ScaffoldConfig } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDir(src: string, dest: string) {
  if (!fs.existsSync(src)) {
    throw new Error(`Template tidak ditemukan: ${src}`);
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);

    /**
     * File _gitignore di template akan dicopy menjadi .gitignore
     * di project hasil generate.
     */
    const targetName = entry.name === "_gitignore" ? ".gitignore" : entry.name;
    const destPath = path.join(dest, targetName);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
      continue;
    }

    fs.copyFileSync(srcPath, destPath);
  }
}

function removeFileIfExists(filePath: string) {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { force: true });
  }
}

function cleanupLockFiles(projectDir: string) {
  removeFileIfExists(path.join(projectDir, "pnpm-lock.yaml"));
  removeFileIfExists(path.join(projectDir, "yarn.lock"));
  removeFileIfExists(path.join(projectDir, "bun.lockb"));
  removeFileIfExists(path.join(projectDir, "package-lock.json"));
}

function toTitleCase(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function replaceInFile(filePath: string, replacements: Record<string, string>) {
  let content = fs.readFileSync(filePath, "utf8");

  for (const [key, value] of Object.entries(replacements)) {
    content = content.replaceAll(key, value);
  }

  fs.writeFileSync(filePath, content);
}

function replaceTemplateVariables(projectDir: string, config: ScaffoldConfig) {
  const projectName = config.projectName.trim();
  const projectTitle = toTitleCase(projectName);

  const replacements = {
    "{{PROJECT_NAME}}": projectName,
    "{{PROJECT_TITLE}}": projectTitle,
  };

  /**
   * File yang kemungkinan mengandung placeholder.
   * Kalau file tidak ada, akan dilewati.
   */
  const filesToReplace = [
    "package.json",
    "README.md",
    "src/config/site.ts",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/components/navbar.tsx",
    "src/components/hero-section.tsx",
    "src/components/cta-section.tsx",
    "src/components/footer.tsx",
  ];

  for (const file of filesToReplace) {
    const filePath = path.join(projectDir, file);

    if (fs.existsSync(filePath)) {
      replaceInFile(filePath, replacements);
    }
  }
}

function getTemplateDir() {
  return path.resolve(__dirname, "..", "templates", "nextjs-ts");
}

export async function scaffold(config: ScaffoldConfig) {
  const projectName = config.projectName.trim();
  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    p.cancel(`Folder "${projectName}" sudah ada.`);
    process.exit(1);
  }

  const spinner = p.spinner();
  spinner.start("Membuat project");

  try {
    const templateDir = getTemplateDir();

    copyDir(templateDir, projectDir);
    replaceTemplateVariables(projectDir, config);
    cleanupLockFiles(projectDir);

    spinner.stop("Project berhasil dibuat");
  } catch (error) {
    spinner.stop("Gagal membuat project");

    /**
     * Kalau proses gagal di tengah jalan, folder hasil generate dihapus
     * supaya tidak meninggalkan project setengah jadi.
     */
    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true });
    }

    throw error;
  }

  if (config.install) {
    const installSpinner = p.spinner();
    installSpinner.start("Menginstall dependencies dengan npm");

    try {
      await runInstall(projectDir);
      installSpinner.stop("Dependencies berhasil diinstall");
    } catch {
      installSpinner.stop("Install dependencies gagal");

      p.note(
        `Project sudah dibuat, tapi npm install gagal.

Masuk ke folder project:

  cd ${projectName}

Lalu jalankan manual:

  npm install
  npm run dev`,
        "Install gagal"
      );

      return;
    }
  }

  if (config.install) {
    p.outro(`Selesai!

Masuk ke folder project:

  cd ${projectName}

Jalankan development server:

  npm run dev`);
  } else {
    p.outro(`Selesai!

Masuk ke folder project:

  cd ${projectName}

Install dependencies:

  npm install

Jalankan development server:

  npm run dev`);
  }
}