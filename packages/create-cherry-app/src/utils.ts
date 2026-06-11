export function slugifyProjectName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validateProjectName(value: string) {
  const name = slugifyProjectName(value);

  if (!name) {
    return "Nama project tidak boleh kosong.";
  }

  if (name.length < 2) {
    return "Nama project terlalu pendek.";
  }

  if (!/^[a-z0-9-_]+$/.test(name)) {
    return "Gunakan huruf kecil, angka, dash, atau underscore.";
  }

  return undefined;
}