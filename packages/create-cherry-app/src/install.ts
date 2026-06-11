import { execa } from "execa";

export async function runInstall(projectDir: string) {
  await execa("npm", ["install"], {
    cwd: projectDir,
    stdio: "inherit"
  });
}