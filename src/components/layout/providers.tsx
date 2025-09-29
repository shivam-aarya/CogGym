'use client'

import { ThemeProvider } from './theme-provider'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      themes={['light', 'dark', 'warm', 'slate', 'purple', 'sage', 'dark-warm', 'dark-slate', 'dark-purple', 'dark-sage', 'system']}
    >
      {children}
    </ThemeProvider>
  )
}