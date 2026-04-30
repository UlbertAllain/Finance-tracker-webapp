"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { Transaction } from "@/hooks/useTransaction";

const incomeCategories = ["Gaji", "Freelance", "Investasi", "Lainnya"];
const expenseCategories = ["Makanan", "Transport", "Belanja", "Tagihan", "Hiburan", "Kesehatan", "Lainnya"];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: Omit<Transaction, "id">) => Promise<void>;
  onEdit?: (id: string, data: Omit<Transaction, "id">) => Promise<void>;
  editingData?: Transaction | null; // DATA YANG AKAN DIEDIT
}

export default function AddTransactionModal({ isOpen, onClose, onAdd, onEdit, editingData }: ModalProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"INCOME" | "EXPENSE">("EXPENSE");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);

  const isEdit = !!editingData; // Cek lagi mode edit atau bukan

  // Kalau mode edit & data berubah, isi form dengan data lama
  useEffect(() => {
    if (editingData) {
      setTitle(editingData.title);
      setAmount(editingData.amount.toString());
      setType(editingData.type);
      setCategory(editingData.category);
      setDate(new Date(editingData.date).toISOString().split("T")[0]);
    } else {
      // Kalau tambah baru, reset form
      setTitle("");
      setAmount("");
      setType("EXPENSE");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  }, [editingData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;
    setLoading(true);

    const payload = {
      title,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    try {
      if (isEdit && onEdit && editingData) {
        await onEdit(editingData.id, payload); // PANGGIL FUNGSI EDIT
      } else {
        await onAdd(payload); // PANGGIL FUNGSI TAMBAH
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const categories = type === "INCOME" ? incomeCategories : expenseCategories;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#111111] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold">{isEdit ? "Edit Transaksi" : "Tambah Transaksi"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl">
            <button
              type="button"
              onClick={() => { setType("EXPENSE"); setCategory(""); }}
              className={`py-2 text-sm rounded-lg transition-colors ${
                type === "EXPENSE" ? "bg-red-500/20 text-red-400 font-medium" : "text-gray-500"
              }`}
            >
              Pengeluaran
            </button>
            <button
              type="button"
              onClick={() => { setType("INCOME"); setCategory(""); }}
              className={`py-2 text-sm rounded-lg transition-colors ${
                type === "INCOME" ? "bg-emerald-500/20 text-emerald-400 font-medium" : "text-gray-500"
              }`}
            >
              Pemasukan
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Judul</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Makan siang di warteg"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Jumlah (Rp)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="25000"
              required
              min="1"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50 appearance-none"
            >
              <option value="" className="bg-[#111111]">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-[#111111]">{cat}</option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tanggal</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 text-black font-medium rounded-xl hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : isEdit ? "Simpan Perubahan" : "Simpan Transaksi"}
          </button>
        </form>
      </div>
    </div>
  );
}