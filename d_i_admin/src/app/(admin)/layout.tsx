import type { Metadata } from 'next'
import '../globals.css'
import React from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { Topbar } from '@/components/admin/topbar'

export const metadata: Metadata = {
  title: 'DI Admin',
  description: 'Panel de administración Dieta Integral'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] lg:grid-rows-1 lg:grid-cols-[280px_1fr] bg-background text-foreground">
      <aside className="border-b lg:border-b-0 lg:border-r">
        <Sidebar />
      </aside>
      <div className="flex flex-col min-w-0">
        <Topbar />
        <main className="p-4 lg:p-6 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
