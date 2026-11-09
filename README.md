# Personal Finance Tracker

Aplikasi pencatatan pemasukan dan pengeluaran pribadi. Dashboard menampilkan saldo, ringkasan transaksi, visualisasi grafik, daftar transaksi, serta ekspor CSV.

## Fungsionalitas

- Halaman registrasi, login, dan dashboard.
- Tambah, edit, dan hapus transaksi.
- Ringkasan pemasukan, pengeluaran, dan saldo.
- Grafik transaksi menggunakan Recharts.
- Ekspor data ke CSV.
- Navigasi responsif untuk mobile.

## Teknologi

Next.js 16, React 19, TypeScript, Firebase, Recharts, Tailwind CSS 4, dan Framer Motion.

## Setup

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`. Integrasi Firebase dikonfigurasi melalui `lib/firebase.ts`; pastikan project Firebase, metode sign-in, dan aturan akses data disesuaikan dengan environment milikmu sebelum menguji akun.

## Organisasi source

```text
app/                       Pages: auth dan dashboard
context/AuthContext.tsx    State autentikasi
hooks/useTransaction.ts    Operasi dan kalkulasi transaksi
components/dashboard/      Grafik, list, modal, sidebar
lib/exportCSV.ts           Ekspor CSV
lib/firebase.ts            Firebase setup
```

## Pemeriksaan

```bash
npm run lint
npm run build
```

Belum ada skrip unit test dalam manifest. Sebelum digunakan dengan data finansial nyata, tinjau Firebase Security Rules, isolasi data per pengguna, dan perilaku CRUD pada akses tidak sah.
