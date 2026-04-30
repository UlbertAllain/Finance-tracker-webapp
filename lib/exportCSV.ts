import { Transaction } from "@/hooks/useTransaction";

export function exportToCSV(transactions: Transaction[]) {
  if (transactions.length === 0) return;

  // Header kolom Excel
  const headers = ["Tanggal", "Judul", "Kategori", "Tipe", "Jumlah (Rp)"];

  // Convert data transaksi jadi baris CSV
  const rows = transactions.map((t) => {
    // FORMAT TANGGAL DIPERPENDEK: 2024-05-01 (Aman banget di Excel, gak bakal ####)
    const d = new Date(t.date);
    const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    
    // FORMAT ANGKA: 1.500.000 (Dipisah titik biar gak kepanjangan di Excel)
    const amount = t.amount.toLocaleString("id-ID");

    return [
      `${date}`,        // Gak pake kutip lagi biar Excel langsung kenali sebagai tanggal
      `"${t.title}"`,
      `"${t.category}"`,
      `"${t.type === "INCOME" ? "Pemasukan" : "Pengeluaran"}"`,
      `"${amount}"`,    // Dibungkus kutip supaya titik pemisah ribuan gak kebaca delimiter
    ].join(";");
  });

  // Gabungkan header + baris data
  const csvContent = [headers.join(";"), ...rows].join("\n");

  // Buat blob dan trigger download
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  
  // Nama file
  const now = new Date();
  const monthYear = now.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
  link.download = `FinTrack_${monthYear.replace(/\s+/g, "_")}.csv`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}