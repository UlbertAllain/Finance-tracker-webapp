"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserPlus, Mail, Lock, User, Loader2, Wallet, ArrowRight } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email sudah terdaftar");
      } else if (err.code === "auth/weak-password") {
        setError("Password terlalu lemah (minimal 6 karakter)");
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
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        
        <div className="relative z-10 w-full p-12 flex flex-col justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20">
              <Wallet className="text-emerald-400" size={24} />
            </div>
            <span className="text-2xl font-bold text-white">FinTrack</span>
          </div>

          {/* Text Utama */}
          <div>
            <h1 className="text-4xl xl:text-5xl font-bold leading-tight mb-6 text-white">
              Mulai kelola uangmu <br />
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                sekarang juga.
              </span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Daftar gratis, tanpa ribet. Cukup email dan password, kamu sudah bisa mulai mencatat semua transaksi harianmu.
            </p>
          </div>

          {/* Fake Benefits */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                <UserPlus size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Setup dalam 30 detik</p>
                <p className="text-xs text-gray-500 mt-0.5">Tidak perlu verifikasi email yang bertele-tele</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 rounded-xl p-4">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Data Terenkripsi</p>
                <p className="text-xs text-gray-500 mt-0.5">Keamanan setara bank digital, dijamin aman</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== KANAN: FORM REGISTER ==================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-[#0a0a0a]">
        <div className="w-full max-w-md">
          
          {/* Logo Mobile */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            <span className="text-xl font-bold text-white">FinTrack</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-white">Buat Akun</h2>
            <p className="text-gray-400">
              Isi data di bawah ini untuk memulai.
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

            {/* Input Nama */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Nama Lengkap</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Timotius"
                  required
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all"
                />
              </div>
            </div>

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
              <label className="block text-sm font-medium text-gray-300">Password (min. 6 karakter)</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-400 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  minLength={6}
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
                  Buat Akun Baru
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}