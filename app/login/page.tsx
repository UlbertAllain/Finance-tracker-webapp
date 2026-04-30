"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LogIn, Mail, Lock, Loader2, Wallet, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("Email atau password salah");
      } else if (err.code === "auth/user-not-found") {
        setError("Akun tidak ditemukan");
      } else {
        setError("Terjadi kesalahan: " + err.code);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ==================== KIRI: BRANDING (HIDDEN DI HP) ==================== */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#050505] overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 w-full p-12 flex flex-col justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <Wallet className="text-emerald-400" size={24} />
            </div>
            {/* FIX: TAMBAHKAN text-white */}
            <span className="text-2xl font-bold text-white">FinTrack</span>
          </div>

          {/* Text Utama */}
          <div>
            {/* FIX: TAMBAHKAN text-white */}
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
              Kelola keuanganmu <br />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                tanpa ribet.
              </span>
            </h1>
            {/* FIX: UBAH text-gray-500 JADI text-gray-400 BIAR LEBIH TERANG */}
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Catat pemasukan, pantau pengeluaran, dan export laporan keuanganmu langsung ke Excel dalam hitungan detik.
            </p>
          </div>

          {/* Fake Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <p className="text-2xl font-bold text-emerald-400">10k+</p>
              <p className="text-xs text-gray-500 mt-1">Transaksi</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <p className="text-2xl font-bold text-emerald-400">99%</p>
              <p className="text-xs text-gray-500 mt-1">Uptime</p>
            </div>
            <div className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <p className="text-2xl font-bold text-emerald-400">Gratis</p>
              <p className="text-xs text-gray-500 mt-1">Selamanya</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== KANAN: FORM LOGIN ==================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          
          {/* Logo Mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            {/* FIX: TAMBAHKAN text-white */}
            <span className="text-xl font-bold text-white">FinTrack</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            {/* FIX: TAMBAHKAN text-white */}
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">Masuk</h2>
            {/* FIX: UBAH text-gray-500 JADI text-gray-400 */}
            <p className="text-gray-400">
              Selamat datang kembali! Masukkan kredensial kamu.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-center gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full shrink-0" />
                {error}
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-300">Password</label>
              </div>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

            {/* Button Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 group mt-2"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Masuk ke Dashboard
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Belum punya akun?{" "}
            <Link href="/register" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}