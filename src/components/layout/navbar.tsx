'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🧠</span>
              <span className="text-xl font-bold text-foreground">CogGym</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/experiments">Experiments</Link>
            </Button>
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/api-docs">API Documentation</Link>
            </Button>
            <Button variant="ghost" asChild className="text-sm font-medium">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <div className="ml-2 pl-2 border-l">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}