'use client'

import { useState } from 'react'
import { StudyCard } from '@/components/study/study-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter } from 'lucide-react'

// Mock data - external studies for demo purposes
// These can be replaced with database-fetched studies in the future
const mockStudies = [
  {
    id: '1',
    title: 'Phase Interface Study',
    description: 'Participate in a cognitive research study exploring human perception and decision-making through interactive phase-based tasks.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Phase Interface Study',
      description: 'Explore human perception and decision-making through interactive tasks.',
      sections: []
    },
    settings: {
      timeLimit: 15,
      externalUrl: 'https://phase-interface.web.app/'
    },
    _count: { sessions: 134 }
  },
  {
    id: '2',
    title: 'Multi-Grid Game Study',
    description: 'Help researchers understand spatial reasoning and problem-solving strategies by participating in interactive grid-based cognitive tasks.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Multi-Grid Game Study',
      description: 'Study spatial reasoning through grid-based tasks.',
      sections: []
    },
    settings: {
      timeLimit: 20,
      externalUrl: 'https://multi-grid-game-9ytj.vercel.app/'
    },
    _count: { sessions: 156 }
  },
  {
    id: '3',
    title: 'Player Behavior Research',
    description: 'Contribute to research on human-computer interaction and user engagement patterns through gameplay and interactive scenarios.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Player Behavior Research',
      description: 'Study human-computer interaction through gameplay.',
      sections: []
    },
    settings: {
      timeLimit: 25,
      externalUrl: 'https://player-app-fbf4c.web.app/'
    },
    _count: { sessions: 189 }
  },
  {
    id: '4',
    title: 'Human-Robot Interaction Study',
    description: 'Participate in cutting-edge research exploring how humans interact with and respond to robotic assistants in various contexts.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    content: {
      version: '1.0',
      title: 'Human-Robot Interaction Study',
      description: 'Explore human interaction with robotic assistants.',
      sections: []
    },
    settings: {
      timeLimit: 18,
      externalUrl: 'https://assisthri.web.app/'
    },
    _count: { sessions: 212 }
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
          Welcome to <span className="text-primary">CogGym</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
          CogGym is a large-scale, collaborative platform where artificial intelligence meets cognitive science.
          Our mission is to provide a unified benchmark for comparing human and machine intelligence, built from
          the most robust and insightful experiments in the history of cognitive science. We partner with leading
          research labs to curate and standardize hundreds of their foundational studies into a living, interactive library.
        </p>
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
