#!/usr/bin/env node

import * as p from "@clack/prompts";
import chalk from "chalk";
import { scaffold } from "./scaffold.js";
import type { ScaffoldConfig } from "./scaffold.js";
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

  const scaffoldConfig: ScaffoldConfig = {
    projectName: config.projectName,
    language: config.language as ScaffoldConfig["language"],
    auth: config.auth as ScaffoldConfig["auth"],
    packageManager: config.packageManager as ScaffoldConfig["packageManager"],
    runInstall: config.runInstall
  };

  await scaffold(scaffoldConfig);

  spinner.stop("Project berhasil dibuat.");

 const devCommand =
  scaffoldConfig.packageManager === "npm"
    ? "npm run dev"
    : `${scaffoldConfig.packageManager} dev`;

  p.outro(`
Selesai.

Database default: Supabase

Langkah berikutnya:

  cd ${scaffoldConfig.projectName}
  cp .env.example .env
  ${devCommand}
`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});