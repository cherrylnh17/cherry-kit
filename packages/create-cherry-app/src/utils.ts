export function validateProjectName(value: string) {
  if (!value || value.trim().length === 0) {
    return "Nama project wajib diisi.";
  }

  const name = value.trim();

  if (name.length > 214) {
    return "Nama project terlalu panjang.";
  }

  if (name.toLowerCase() !== name) {
    return "Gunakan huruf kecil, contoh: toko-batik.";
  }

  if (name.includes(" ")) {
    return "Nama project tidak boleh memakai spasi. Gunakan tanda strip, contoh: toko-batik.";
  }

  if (!/^[a-z0-9-_]+$/.test(name)) {
    return "Nama project hanya boleh berisi huruf kecil, angka, strip, atau underscore.";
  }

  if (name.startsWith(".") || name.startsWith("_")) {
    return "Nama project tidak boleh diawali titik atau underscore.";
  }

  return undefined;
}