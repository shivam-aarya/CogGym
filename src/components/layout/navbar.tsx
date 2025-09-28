'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from './theme-toggle'

export function Navbar() {
  const { data: session, status } = useSession()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🧪</span>
              <span className="text-xl font-bold text-foreground">StudyHub</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/studies"
                  className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Studies
                </Link>
                {session.user.role === 'RESEARCHER' && (
                  <Link
                    href="/admin"
                    className="text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                )}
              </>
            )}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Section */}
            {status === 'loading' ? (
              <div className="animate-pulse h-8 w-20 bg-muted rounded"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">{session.user.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {session.user.role}
                  </Badge>
                </div>
                <Button
                  onClick={() => signOut()}
                  variant="outline"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => signIn()}
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}