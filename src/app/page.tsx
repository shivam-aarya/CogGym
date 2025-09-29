'use client'

import { useState } from 'react'
import { StudyCard } from '@/components/study/study-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Target, Shield, Zap, Filter } from 'lucide-react'

// Mock data - will be replaced with API calls
const mockStudies = [
  {
    id: '1',
    title: 'UX Design Survey',
    description: 'Help researchers understand how people interact with digital interfaces. Your insights will contribute to better app and website design.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'UX Design Survey',
      description: 'Help researchers understand how people interact with digital interfaces.',
      sections: []
    },
    settings: { timeLimit: 10 },
    _count: { sessions: 127 }
  },
  {
    id: '2',
    title: 'Decision Making Study',
    description: 'Participate in research about how people make choices under different conditions.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Decision Making Study',
      sections: []
    },
    settings: { timeLimit: 15 },
    _count: { sessions: 89 }
  },
  {
    id: '3',
    title: 'Memory Research',
    description: 'Contribute to cognitive science research by participating in memory-related tasks.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Memory Research',
      sections: []
    },
    settings: { timeLimit: 20 },
    _count: { sessions: 203 }
  }
]

export default function Home() {
  const [studies] = useState(mockStudies)
  const [filter, setFilter] = useState('all')

  const filteredStudies = studies.filter(study => {
    if (filter === 'new') return Date.now() - study.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
    if (filter === 'quick') return (study.settings?.timeLimit || 0) <= 10
    if (filter === 'long') return (study.settings?.timeLimit || 0) > 15
    return true
  })

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-foreground mb-6">
          Welcome to <span className="text-primary">StudyHub</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Participate anonymously in research studies and contribute to scientific knowledge.
          Help researchers understand human behavior, cognition, and user experience.
        </p>
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
              Your responses are completely anonymous and securely stored.
              We follow strict privacy guidelines and ethical research standards.
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <CardTitle>No Login Required</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Jump right in and participate in any study anonymously.
              No account creation or personal information needed.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Available Studies Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Available Studies</h2>
            <p className="text-muted-foreground mt-2">Choose a study to get started</p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'new', label: 'New' },
                { key: 'quick', label: 'Quick' },
                { key: 'long', label: 'In-depth' }
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant={filter === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(key)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <StudyCard key={study.id} study={study} />
          ))}
        </div>

        {filteredStudies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No studies match your current filter</p>
            <p className="text-sm text-muted-foreground mt-2">Try adjusting your filter options</p>
          </div>
        )}
      </div>
    </div>
  )
}
