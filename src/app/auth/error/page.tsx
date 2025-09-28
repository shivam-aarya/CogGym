'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, ArrowLeft } from 'lucide-react'

const errorMessages = {
  Configuration: 'There is a problem with the server configuration.',
  AccessDenied: 'You do not have permission to sign in.',
  Verification: 'The sign in link is no longer valid. It may have expired.',
  Default: 'An unexpected error occurred during sign in.',
}

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') as keyof typeof errorMessages

  const errorMessage = error ? errorMessages[error] || errorMessages.Default : errorMessages.Default

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <CardTitle className="text-2xl">Authentication Error</CardTitle>
            <CardDescription>
              There was a problem signing you in
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <p className="text-muted-foreground">{errorMessage}</p>

            <div className="space-y-3">
              <Link href="/auth/signin">
                <Button className="w-full">
                  Try Again
                </Button>
              </Link>

              <Link href="/">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>If this problem persists, please contact support.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}