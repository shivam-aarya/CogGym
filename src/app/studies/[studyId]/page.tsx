'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Clock, Users, Calendar, Shield, CheckCircle, ExternalLink } from 'lucide-react'
import { hasParticipated } from '@/lib/anonymous-session'

// Mock study data - will be replaced with API call
// In production, this would fetch based on studyId
const mockStudies: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Phase Interface Study',
    description: 'Participate in a cognitive research study exploring human perception and decision-making through interactive phase-based tasks.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Phase Interface Study',
      description: 'Explore human perception and decision-making through interactive tasks.',
      instructions: 'You will be redirected to an external study platform. Please complete all tasks honestly and to the best of your ability.',
      sections: []
    },
    settings: {
      timeLimit: 15,
      externalUrl: 'https://phase-interface.web.app/'
    },
    _count: { sessions: 234 }
  },
  '2': {
    id: '2',
    title: 'Multi-Grid Game Study',
    description: 'Help researchers understand spatial reasoning and problem-solving strategies by participating in interactive grid-based cognitive tasks.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Multi-Grid Game Study',
      description: 'Study spatial reasoning through grid-based tasks.',
      instructions: 'You will be redirected to an external study platform. Follow the on-screen instructions carefully.',
      sections: []
    },
    settings: {
      timeLimit: 20,
      externalUrl: 'https://multi-grid-game-9ytj.vercel.app/'
    },
    _count: { sessions: 156 }
  },
  '3': {
    id: '3',
    title: 'Player Behavior Research',
    description: 'Contribute to research on human-computer interaction and user engagement patterns through gameplay and interactive scenarios.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Player Behavior Research',
      description: 'Study human-computer interaction through gameplay.',
      instructions: 'You will be redirected to an external study platform. Complete the interactive scenarios as naturally as possible.',
      sections: []
    },
    settings: {
      timeLimit: 25,
      externalUrl: 'https://player-app-fbf4c.web.app/'
    },
    _count: { sessions: 189 }
  },
  '4': {
    id: '4',
    title: 'Human-Robot Interaction Study',
    description: 'Participate in cutting-edge research exploring how humans interact with and respond to robotic assistants in various contexts.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Human-Robot Interaction Study',
      description: 'Explore human interaction with robotic assistants.',
      instructions: 'You will be redirected to an external study platform. Interact with the robotic assistant as you naturally would.',
      sections: []
    },
    settings: {
      timeLimit: 18,
      externalUrl: 'https://assisthri.web.app/'
    },
    _count: { sessions: 312 }
  }
}

export default function StudyDetailPage() {
  const params = useParams()
  const studyId = params.studyId as string
  const [study, setStudy] = useState(mockStudies[studyId] || mockStudies['1'])
  const [hasConsented, setHasConsented] = useState(false)
  const alreadyParticipated = hasParticipated(studyId)
  const isExternal = !!study.settings?.externalUrl

  useEffect(() => {
    // In real app, fetch study data based on studyId
    // const fetchedStudy = await fetch(`/api/studies/${studyId}`).then(r => r.json())
    // setStudy(fetchedStudy)
    setStudy(mockStudies[studyId] || mockStudies['1'])
  }, [studyId])

  const handleConsentChange = (consented: boolean) => {
    setHasConsented(consented)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/" className="flex items-center text-primary hover:text-primary/80">
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
        </CardContent>
      </Card>

      {/* Action Section */}
      <div className="text-center">
        {alreadyParticipated ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-6 h-6" />
              <span className="text-lg font-medium">You have already completed this study</span>
            </div>
            <p className="text-muted-foreground">Thank you for your participation!</p>
            <Link href="/">
              <Button variant="outline">
                Return to Studies
              </Button>
            </Link>
          </div>
        ) : isExternal ? (
          <a
            href={study.settings.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (hasConsented) {
                // Mark as participated when they click to launch external study
                // In a real app, this would be tracked better
                console.log('Launching external study:', study.settings.externalUrl)
              }
            }}
          >
            <Button
              size="lg"
              className="px-12 flex items-center space-x-2"
              disabled={!hasConsented}
            >
              <span>🚀 Launch External Study</span>
              <ExternalLink className="w-5 h-5" />
            </Button>
          </a>
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

        {!hasConsented && !alreadyParticipated && (
          <p className="text-sm text-muted-foreground mt-2">
            Please complete the consent section above to begin
          </p>
        )}

        {isExternal && hasConsented && !alreadyParticipated && (
          <p className="text-sm text-muted-foreground mt-2">
            You will be redirected to an external research platform
          </p>
        )}
      </div>
    </div>
  )
}