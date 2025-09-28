'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Shield, Zap } from 'lucide-react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [session, router])

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (session) {
    return null // Will redirect to dashboard
  }

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Welcome to <span className="text-primary">StudyHub</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Participate in research studies and contribute to scientific knowledge.
          Join thousands of participants helping researchers understand human behavior,
          cognition, and user experience.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/auth/signin">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <Card className="text-center">
          <CardHeader>
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <CardTitle>Contribute to Science</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your participation directly contributes to research that advances
              our understanding of human behavior and cognition.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Quick & Easy</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Most studies take just 5-15 minutes. Participate from anywhere,
              anytime, on any device.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <CardTitle>Privacy Protected</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your responses are anonymous and securely stored.
              We follow strict privacy guidelines and ethical research standards.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <CardTitle>Join the Community</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Connect with researchers and other participants.
              Track your contributions and impact over time.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* How It Works Section */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-foreground mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Browse Studies</h3>
            <p className="text-muted-foreground">
              Explore available research studies that match your interests and availability.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Participate</h3>
            <p className="text-muted-foreground">
              Complete studies by answering questions, performing tasks, or providing feedback.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground">Contribute</h3>
            <p className="text-muted-foreground">
              Your anonymous responses help researchers make important discoveries.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/50 rounded-lg p-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join our community of research participants and start contributing to science today.
        </p>
        <Link href="/auth/signin">
          <Button size="lg" className="px-8">
            Start Participating
          </Button>
        </Link>
      </div>
    </div>
  )
}
