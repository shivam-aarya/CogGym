'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { StudyCard } from '@/components/study/study-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, Filter, Target, Clock, CheckCircle } from 'lucide-react'

// Mock data for now - will be replaced with API calls
const mockStudies = [
  {
    id: '1',
    title: 'UX Design Survey',
    description: 'Help researchers understand how people interact with digital interfaces. Your insights will contribute to better app and website design.',
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
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
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
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
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    content: {
      version: '1.0',
      title: 'Memory Research',
      sections: []
    },
    settings: { timeLimit: 20 },
    _count: { sessions: 203 }
  }
]

export default function DashboardPage() {
  const { data: session } = useSession()
  const [studies, setStudies] = useState(mockStudies)
  const [filter, setFilter] = useState('all')

  const completedStudies = 3 // Mock completed count

  const filteredStudies = studies.filter(study => {
    if (filter === 'new') return Date.now() - study.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000
    if (filter === 'quick') return (study.settings?.timeLimit || 0) <= 10
    if (filter === 'long') return (study.settings?.timeLimit || 0) > 15
    return true
  })

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}!
        </h1>
        <p className="text-lg text-muted-foreground flex items-center">
          Ready to contribute to research?
          <Target className="w-5 h-5 ml-2 text-primary" />
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Studies</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studies.length}</div>
            <p className="text-xs text-muted-foreground">
              Ready for participation
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Studies</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedStudies}</div>
            <p className="text-xs text-muted-foreground">
              Thanks for your contributions!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Contributed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">
              Across all studies
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Studies Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            📊 Available Studies
          </h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'All' },
                { key: 'new', label: 'New' },
                { key: 'quick', label: 'Quick (<10min)' },
                { key: 'long', label: 'Long (>15min)' }
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
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No studies match your current filter</p>
              <p className="text-sm">Try adjusting your filter options</p>
            </div>
          </div>
        )}

        <Separator className="my-8" />

        {/* Completed Studies Section */}
        <div>
          <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
            ✅ Your Completed Studies ({completedStudies})
          </h3>
          <Button variant="outline" className="mb-4">
            View Your Participation History
          </Button>
        </div>
      </div>
    </div>
  )
}