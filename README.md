# Cherry Kit

Cherry Kit adalah starter kit generator untuk membuat website UMKM siap pakai berbasis Next.js.

## Tujuan

Project ini dibuat agar developer bisa membuat website UMKM dengan cepat menggunakan CLI.

Contoh penggunaan nanti:

```bash
npx create-cherry-app@latest
```

## Struktur Project

```txt
cherry-kit/
├── packages/
│   └── create-cherry-app/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── tsconfig.base.json
```

## Development

Install dependency:

```bash
npm install -g pnpm

pnpm install
```

Build semua package:

```bash
pnpm build
```

Build package tertentu:

```bash
pnpm --filter create-cherry-app build
```

## Package

- `create-cherry-app` — CLI generator untuk membuat website UMKM.