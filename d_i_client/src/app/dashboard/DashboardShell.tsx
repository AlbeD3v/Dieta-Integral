"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard, UserCircle, TrendingUp, BookOpen,
  LogOut, Menu, X, ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Inicio', icon: LayoutDashboard },
  { href: '/dashboard/perfil', label: 'Mi perfil', icon: UserCircle },
  { href: '/dashboard/progreso', label: 'Progreso', icon: TrendingUp },
  { href: '/dashboard/contenido', label: 'Contenido', icon: BookOpen },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const user = session?.user;

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-black/6 flex flex-col
        transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
        lg:translate-x-0 lg:static lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-black/6">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/imagen_logo_svg.svg" alt="DI" width={28} height={28} className="w-7 h-7" />
            <span className="font-brand text-sm font-bold tracking-wider uppercase text-[#1B4332]">
              Mi Panel
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 text-[#475569]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User card */}
        {user && (
          <div className="px-4 py-4 border-b border-black/6">
            <div className="flex items-center gap-3">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || ''}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full ring-2 ring-[#1B4332]/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#1B4332] flex items-center justify-center text-white font-bold text-sm">
                  {(user.name || 'U')[0].toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#0F172A] truncate">{user.name}</p>
                <p className="text-xs text-[#94A3B8] truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = pathname === item.href ||
              (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1B4332]/8 text-[#1B4332] shadow-sm'
                    : 'text-[#475569] hover:bg-black/4 hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-[#1B4332]' : ''}`} />
                {item.label}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto opacity-40" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-black/6">
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-[#475569] hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar (mobile) */}
        <header className="lg:hidden h-14 bg-white border-b border-black/6 flex items-center px-4 gap-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg hover:bg-black/5"
          >
            <Menu className="w-5 h-5 text-[#475569]" />
          </button>
          <span className="font-brand text-sm font-bold tracking-wider uppercase text-[#1B4332]">Mi Panel</span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
