import fs from "fs-extra";
import path from "node:path";

export async function writeSupabaseConfig(dest: string) {
  const envContent = `# Supabase
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
SUPABASE_SERVICE_ROLE_KEY=""

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
`;

  await fs.writeFile(path.join(dest, ".env.example"), envContent);
}