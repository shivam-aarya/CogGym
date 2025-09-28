'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, Users, Calendar, Shield, CheckCircle, AlertCircle } from 'lucide-react'

// Mock study data - will be replaced with API call
const mockStudy = {
  id: '1',
  title: 'User Experience Design Survey',
  description: 'Help researchers understand how people interact with digital interfaces. Your insights will contribute to better app and website design.',
  status: 'ACTIVE',
  createdAt: new Date('2024-01-15'),
  content: {
    version: '1.0',
    title: 'User Experience Design Survey',
    description: 'Help researchers understand how people interact with digital interfaces.',
    instructions: 'Please answer all questions honestly. Your responses are completely anonymous and will help improve digital interface design.',
    sections: []
  },
  settings: {
    timeLimit: 10,
    allowBack: true,
    showProgress: true
  },
  _count: { sessions: 127 }
}

export default function StudyDetailPage() {
  const params = useParams()
  const { data: session } = useSession()
  const [study, setStudy] = useState(mockStudy)
  const [hasConsented, setHasConsented] = useState(false)
  const [hasParticipated, setHasParticipated] = useState(false)

  const studyId = params.studyId as string

  useEffect(() => {
    // In real app, fetch study data based on studyId
    // setStudy(fetchStudyData(studyId))
  }, [studyId])

  const handleConsentChange = (consented: boolean) => {
    setHasConsented(consented)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-primary hover:text-primary/80">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Studies
        </Link>
      </div>

      {/* Study Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-foreground">{study.title}</h1>
          <Badge variant={study.status === 'ACTIVE' ? 'default' : 'secondary'}>
            {study.status}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          {study.description}
        </p>
      </div>

      {/* Study Details */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            📊 Study Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{study.settings.timeLimit} minutes</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Participants</p>
                <p className="text-sm text-muted-foreground">{study._count.sessions} people have joined</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Available until</p>
                <p className="text-sm text-muted-foreground">December 31, 2024</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Compensation</p>
                <p className="text-sm text-muted-foreground">Research contribution points</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Data */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Privacy & Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm">Your responses are completely anonymous</p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm">Data is encrypted and securely stored</p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm">You can withdraw your data anytime</p>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <p className="text-sm">No personally identifiable information collected</p>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      {study.content.instructions && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">
              {study.content.instructions}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Consent Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            📋 Consent to Participate
          </CardTitle>
          <CardDescription>
            Please read and agree to the following before participating
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1"
                onChange={(e) => handleConsentChange(e.target.checked)}
              />
              <span className="text-sm">
                I understand this is voluntary research and I can withdraw at any time
              </span>
            </label>

            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1"
                required
              />
              <span className="text-sm">
                I consent to my anonymous responses being used for research purposes
              </span>
            </label>
          </div>

          {!session && (
            <div className="bg-muted border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Sign in recommended</p>
                  <p className="text-sm text-muted-foreground">
                    While you can participate as a guest, signing in allows you to save your progress and track your contributions.
                  </p>
                  <Link href="/auth/signin" className="text-sm text-primary underline mt-1 inline-block">
                    Sign in here
                  </Link>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Section */}
      <div className="text-center">
        {hasParticipated ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">You have already completed this study</span>
            </div>
            <p className="text-muted-foreground">Thank you for your participation!</p>
            <Link href="/dashboard">
              <Button variant="outline">
                Return to Dashboard
              </Button>
            </Link>
          </div>
        ) : (
          <Link href={`/studies/${studyId}/participate`}>
            <Button
              size="lg"
              className="px-12"
              disabled={!hasConsented}
            >
              🚀 Start Study
            </Button>
          </Link>
        )}

        {!hasConsented && (
          <p className="text-sm text-muted-foreground mt-2">
            Please complete the consent section above to begin
          </p>
        )}
      </div>
    </div>
  )
}