import fs from "fs-extra";
import path from "node:path";

const ALL_FEATURES = ["landing", "catalog", "checkout", "admin", "cms"];

export async function applyFeatures(dest: string, selectedFeatures: string[]) {
  for (const feature of ALL_FEATURES) {
    if (!selectedFeatures.includes(feature)) {
      await fs.remove(path.join(dest, "src/app", feature));
      await fs.remove(path.join(dest, "src/app/api", feature));
    }
  }
}