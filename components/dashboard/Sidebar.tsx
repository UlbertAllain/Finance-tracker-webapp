"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, Wallet, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <>
      {/* BACKDROP (Muncul di HP kalau sidebar terbuka) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#111111] border-r border-white/5 flex flex-col p-6 z-50 transition-transform duration-300 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Header: Logo + Close Button (Close cuma muncul di HP) */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            <span className="text-lg text-white font-bold">FinTrack</span>
          </div>
          
          <button onClick={onClose} className="md:hidden text-gray-500 hover:text-white">
            <X size={22} />
          </button>
        </div>

        {/* User Info */}
        <div className="mt-auto">
          <div className="bg-white/[0.03] rounded-xl p-4 mb-4">
            <p className="text-sm text-white font-medium truncate">{user?.email}</p>
            <p className="text-xs text-gray-500 mt-1">Free Plan</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/5 rounded-xl transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}