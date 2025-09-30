'use client'

import { useState } from 'react'
import { StudyCard } from '@/components/study/study-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Filter, X, ChevronDown } from 'lucide-react'

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
    tags: {
      cognitiveProcess: ['multimodal reasoning', 'decision making'],
      modality: ['visual', 'interactive'],
      studyLength: 'quick'
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
    tags: {
      cognitiveProcess: ['multimodal reasoning', 'decision making'],
      modality: ['visual', 'interactive'],
      studyLength: 'medium'
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
    tags: {
      cognitiveProcess: ['social reasoning', 'decision making', 'metacognition'],
      modality: ['visual', 'interactive'],
      studyLength: 'medium'
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
    tags: {
      cognitiveProcess: ['social reasoning', 'physical reasoning', 'language'],
      modality: ['visual', 'text', 'interactive'],
      studyLength: 'medium'
    },
    _count: { sessions: 212 }
  }
]

export default function Home() {
  const [studies] = useState(mockStudies)
  const [filtersExpanded, setFiltersExpanded] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<{
    cognitiveProcess: string[]
    modality: string[]
    studyLength: string[]
  }>({
    cognitiveProcess: [],
    modality: [],
    studyLength: []
  })

  const toggleFilter = (category: 'cognitiveProcess' | 'modality' | 'studyLength', value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }))
  }

  const clearFilters = () => {
    setSelectedFilters({
      cognitiveProcess: [],
      modality: [],
      studyLength: []
    })
  }

  const filteredStudies = studies.filter(study => {
    const hasActiveFilters =
      selectedFilters.cognitiveProcess.length > 0 ||
      selectedFilters.modality.length > 0 ||
      selectedFilters.studyLength.length > 0

    if (!hasActiveFilters) return true

    const matchesCognitive = selectedFilters.cognitiveProcess.length === 0 ||
      selectedFilters.cognitiveProcess.some(filter =>
        study.tags?.cognitiveProcess?.includes(filter)
      )

    const matchesModality = selectedFilters.modality.length === 0 ||
      selectedFilters.modality.some(filter =>
        study.tags?.modality?.includes(filter)
      )

    const matchesLength = selectedFilters.studyLength.length === 0 ||
      selectedFilters.studyLength.includes(study.tags?.studyLength || '')

    return matchesCognitive && matchesModality && matchesLength
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Available Studies</h2>
            <p className="text-muted-foreground mt-2">Choose a study to get started</p>
          </div>
          <div className="flex items-center gap-2">
            {(selectedFilters.cognitiveProcess.length > 0 ||
              selectedFilters.modality.length > 0 ||
              selectedFilters.studyLength.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiltersExpanded(!filtersExpanded)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedFilters.cognitiveProcess.length > 0 ||
                selectedFilters.modality.length > 0 ||
                selectedFilters.studyLength.length > 0) && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
                  {selectedFilters.cognitiveProcess.length + selectedFilters.modality.length + selectedFilters.studyLength.length}
                </span>
              )}
              <ChevronDown className={`w-4 h-4 transition-transform ${filtersExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        {/* Collapsible Filter Section */}
        {filtersExpanded && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Cognitive Process Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Cognitive Process</h3>
                  <div className="flex flex-wrap gap-2">
                    {['multimodal reasoning', 'social reasoning', 'physical reasoning', 'language', 'decision making', 'metacognition'].map((process) => (
                      <Button
                        key={process}
                        variant={selectedFilters.cognitiveProcess.includes(process) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter('cognitiveProcess', process)}
                        className="capitalize"
                      >
                        {process}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Modality Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Modality</h3>
                  <div className="flex flex-wrap gap-2">
                    {['visual', 'text', 'audio', 'interactive'].map((modality) => (
                      <Button
                        key={modality}
                        variant={selectedFilters.modality.includes(modality) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter('modality', modality)}
                        className="capitalize"
                      >
                        {modality}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Study Length Filters */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Study Length</h3>
                  <div className="flex flex-wrap gap-2">
                    {['quick', 'medium', 'long'].map((length) => (
                      <Button
                        key={length}
                        variant={selectedFilters.studyLength.includes(length) ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => toggleFilter('studyLength', length)}
                        className="capitalize"
                      >
                        {length === 'quick' ? '< 15 min' : length === 'medium' ? '15-30 min' : '> 30 min'}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
