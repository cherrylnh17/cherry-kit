import fs from "fs-extra";
import path from "node:path";

export type AuthProvider = "both" | "google" | "email";

export async function writeAuthConfig(dest: string, auth: AuthProvider) {
  const content = `export const authConfig = {
  provider: "${auth}",
  google: ${auth === "google" || auth === "both"},
  email: ${auth === "email" || auth === "both"}
} as const;
`;

  await fs.ensureDir(path.join(dest, "src/config"));
  await fs.writeFile(path.join(dest, "src/config/auth.ts"), content);
}