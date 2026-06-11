import { execa } from "execa";
import type { PackageManager } from "./scaffold.js";

export async function runInstall(dest: string, packageManager: PackageManager) {
  await execa(packageManager, ["install"], {
    cwd: dest,
    stdio: "inherit"
  });
}