#!/usr/bin/env node

import * as p from "@clack/prompts";
import chalk from "chalk";
import { scaffold } from "./scaffold.js";
import { validateProjectName } from "./utils.js";

async function main() {
  console.clear();

  p.intro(chalk.red("create-cherry-app"));

  const config = await p.group(
    {
      projectName: () =>
        p.text({
          message: "Nama project?",
          placeholder: "toko-batik",
          validate(value) {
            return validateProjectName(value);
          }
        }),

      language: () =>
        p.select({
          message: "Pilih bahasa:",
          options: [
            {
              value: "ts",
              label: "TypeScript",
              hint: "rekomendasi"
            },
            {
              value: "js",
              label: "JavaScript"
            }
          ]
        }),

      database: () =>
        p.select({
          message: "Pilih database:",
          options: [
            {
              value: "sqlite",
              label: "SQLite",
              hint: "lokal/dev ringan"
            },
            {
              value: "mysql",
              label: "MySQL"
            },
            {
              value: "supabase",
              label: "Supabase",
              hint: "PostgreSQL"
            }
          ]
        }),

      auth: () =>
        p.select({
          message: "Pilih auth:",
          options: [
            {
              value: "both",
              label: "Google + Email"
            },
            {
              value: "google",
              label: "Google saja"
            },
            {
              value: "email",
              label: "Email saja"
            }
          ]
        }),

      packageManager: () =>
        p.select({
          message: "Pilih package manager:",
          options: [
            {
              value: "pnpm",
              label: "pnpm",
              hint: "rekomendasi"
            },
            {
              value: "npm",
              label: "npm"
            },
            {
              value: "yarn",
              label: "yarn"
            }
          ]
        }),

      runInstall: () =>
        p.confirm({
          message: "Install dependencies sekarang?",
          initialValue: true
        })
    },
    {
      onCancel: () => {
        p.cancel("Dibatalkan.");
        process.exit(0);
      }
    }
  );

  const spinner = p.spinner();

  spinner.start("Membuat project...");
  await scaffold(config);
  spinner.stop("Project berhasil dibuat.");

  p.outro(`
Selesai.

Langkah berikutnya:

  cd ${config.projectName}
  cp .env.example .env
  ${config.packageManager} dev
`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});