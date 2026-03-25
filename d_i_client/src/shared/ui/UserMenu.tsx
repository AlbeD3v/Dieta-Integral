"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (status === 'loading') {
    return <div className="w-8 h-8 rounded-full bg-foreground/8 animate-pulse" />;
  }

  if (!session?.user) {
    return (
      <Link
        href="/iniciar-sesion"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#1B4332]/20 px-3.5 py-1.5 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#1B4332] hover:bg-[#1B4332]/5 transition-colors"
      >
        <User className="w-3.5 h-3.5" />
        Entrar
      </Link>
    );
  }

  const user = session.user;
  const avatarSrc = user.image || undefined;
  const initials = (user.name || user.email || '?').charAt(0).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-[#1B4332]/15 transition-all"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {avatarSrc ? (
          <Image
            src={avatarSrc}
            alt={user.name || 'Avatar'}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#1B4332] flex items-center justify-center text-white text-xs font-bold">
            {initials}
          </div>
        )}
        <ChevronDown className={`w-3 h-3 text-foreground/50 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border/60 bg-background shadow-lg py-1.5 z-50">
          <div className="px-4 py-2.5 border-b border-border/40">
            <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Mi panel
          </Link>

          <button
            onClick={() => { setOpen(false); signOut({ callbackUrl: '/' }); }}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-foreground/80 hover:bg-foreground/5 hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}
