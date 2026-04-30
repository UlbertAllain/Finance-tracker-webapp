"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
  Download,
  Smartphone,
  Shield,
  ArrowRight,
} from "lucide-react";

// Komponen kecil untuk item fitur
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors">
    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
      {icon}
    </div>
    <h3 className="text-base font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  // FIX: PINDAHKAN router.push KE SINI
  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Kalau masih cek auth atau udah punya user, jangan render apa-apa
  if (loading || user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* NAVBAR */}
      <nav className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            <span className="text-lg text-white font-bold">FinTrack</span>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="px-5 py-2.5 bg-white/5 text-sm text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            Masuk
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-28 md:pt-32 md:pb-36">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400">100% Gratis & Open Source</span>
          </div>

          <h1 className="text-4xl md:text-6xl text-white font-bold tracking-tight mb-6">
            Kelola Uang Kamu <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Dengan Mudah
            </span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Catat pemasukan & pengeluaran harian, lihat grafik interaktif, 
            dan export datanya langsung ke Excel. Tanpa ribet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push("/register")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-black font-semibold rounded-xl hover:bg-emerald-400 transition-colors"
            >
              Mulai Sekarang
              <ArrowRight size={18} />
            </button>
            <button
              onClick={() => router.push("/login")}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 text-white font-medium rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              Sudah Punya Akun?
            </button>
          </div>
        </div>
      </section>

      {/* FITUR SECTION */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-emerald-400 text-sm font-medium mb-2">FITUR UTAMA</p>
            <h2 className="text-3xl md:text-4xl text-emerald-400 font-bold">Semua yang Kamu Butuhkan</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
            <FeatureCard 
              icon={<TrendingUp size={24} />}
              title="Catat Transaksi"
              desc="Tambah pemasukan dan pengeluaran dengan kategori yang terstruktur. Edit dan hapus kapan saja."
            />
            <FeatureCard 
              icon={<PieChartIcon size={24} />}
              title="Grafik Interaktif"
              desc="Visualisasi keuanganmu dengan Bar Chart dan Pie Chart yang real-time update."
            />
            <FeatureCard 
              icon={<Download size={24} />}
              title="Export ke Excel"
              desc="Butuh laporan buat bon atau arsip? Export data transaksimu langsung jadi file CSV."
            />
            <FeatureCard 
              icon={<Smartphone size={24} />}
              title="Responsif di HP"
              desc="Desain mobile-first. Mencatat keuangan di angkot atau warung kopi jadi lancar jaya."
            />
            <FeatureCard 
              icon={<Shield size={24} />}
              title="Data Aman"
              desc="Disimpan aman di Firebase Cloud. Kamu login pakai email & password, jadi cuma kamu yang bisa akses."
            />
            <FeatureCard 
              icon={<TrendingDown size={24} />}
              title="Filter & Sortir"
              desc="Pisahkan transaksi masuk dan keluar dengan satu klik. Gak pusing nyari data."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} FinTrack. Dibuat dengan Next.js & Firebase.
          </p>
          <p className="text-sm text-gray-600">
            Dibuat oleh <span className="text-gray-400 font-medium">Timotius F.</span>
          </p>
        </div>
      </footer>
    </div>
  );
}