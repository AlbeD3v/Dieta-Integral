"use client";
import React from 'react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Topbar() {
  return (
    <header className="flex items-center justify-between gap-4 border-b px-4 py-3 lg:px-6">
      <div className="flex items-center gap-2 min-w-0">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search..." className="h-8 w-[200px] lg:w-[320px]" />
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarFallback>DI</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
