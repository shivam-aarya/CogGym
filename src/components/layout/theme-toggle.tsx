'use client'

import * as React from 'react'
import { Moon, Sun, Monitor, Palette, Heart, Leaf, Sparkles, Waves } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const themes = [
    { key: 'light', label: 'Light', icon: Sun, description: 'Classic bright theme' },
    { key: 'dark', label: 'Dark', icon: Moon, description: 'Deep dramatic theme' },
    { key: 'warm', label: 'Warm', icon: Heart, description: 'Soft & cozy' },
    { key: 'slate', label: 'Slate', icon: Waves, description: 'Gentle & professional' },
    { key: 'purple', label: 'Purple', icon: Sparkles, description: 'Creative & calm' },
    { key: 'sage', label: 'Sage', icon: Leaf, description: 'Nature & focus' }
  ]

  const darkThemes = [
    { key: 'dark-warm', label: 'Dark Warm', icon: Heart, description: 'Cozy & inviting dark' },
    { key: 'dark-slate', label: 'Dark Slate', icon: Waves, description: 'Cool & professional dark' },
    { key: 'dark-purple', label: 'Dark Purple', icon: Sparkles, description: 'Creative & moody dark' },
    { key: 'dark-sage', label: 'Dark Sage', icon: Leaf, description: 'Earthy & focused dark' }
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="px-3">
          <Palette className="h-[1.1rem] w-[1.1rem] mr-1" />
          <span className="text-xs hidden sm:inline">Theme</span>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Choose your theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themes.map(({ key, label, icon: Icon, description }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </div>
            </div>
            {theme === key && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          Dark Variants
        </DropdownMenuLabel>

        {darkThemes.map(({ key, label, icon: Icon, description }) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setTheme(key)}
            className="cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center">
              <Icon className="mr-2 h-4 w-4" />
              <div className="flex flex-col">
                <span className="font-medium">{label}</span>
                <span className="text-xs text-muted-foreground">{description}</span>
              </div>
            </div>
            {theme === key && <span className="text-primary">✓</span>}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setTheme('system')} className="cursor-pointer">
          <Monitor className="mr-2 h-4 w-4" />
          <div className="flex flex-col">
            <span className="font-medium">System</span>
            <span className="text-xs text-muted-foreground">Follow your device</span>
          </div>
          {theme === 'system' && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}