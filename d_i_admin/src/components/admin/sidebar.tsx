"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { LayoutDashboard, CalendarDays, FileText, Users2, Settings, Tags } from 'lucide-react'

const nav = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
  { href: '/articles', label: 'Artículos', icon: FileText },
  { href: '/categories', label: 'Categorías', icon: Tags },
  { href: '/content', label: 'Content', icon: FileText },
  { href: '/suscriptores', label: 'Suscriptores', icon: Users2 },
  { href: '/users', label: 'Users', icon: Users2 },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <div className="h-full w-full lg:w-[280px] p-4">
      <div className="mb-6">
        <Link href="/dashboard" className="font-bold text-xl">DI Admin</Link>
      </div>
      <nav className="grid gap-1">
        {nav.map(item => {
          const Icon = item.icon
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
                active ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
