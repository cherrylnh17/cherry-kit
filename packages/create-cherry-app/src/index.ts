#!/usr/bin/env node

import * as p from "@clack/prompts";
import chalk from "chalk";
import { scaffold } from "./scaffold.js";
import { validateProjectName } from "./utils.js";
import type { ScaffoldConfig } from "./types.js";

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
              value: "none",
              label: "Tanpa auth"
            },
            {
              value: "email",
              label: "Email"
            },
            {
              value: "google-email",
              label: "Google + Email"
            }
          ]
        }),

      install: () =>
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

  await scaffold(config as ScaffoldConfig);
}

main().catch((error) => {
  p.cancel("Terjadi error.");

  if (error instanceof Error) {
    console.error(error.message);
  } else {
    console.error(error);
  }

  process.exit(1);
});