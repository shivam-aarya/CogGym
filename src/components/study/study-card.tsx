'use client'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, Star, Zap, ExternalLink } from 'lucide-react'

interface StudySettings {
  timeLimit?: number
  externalUrl?: string
}

interface StudyContent {
  version: string
  title: string
  description?: string
  sections: unknown[]
}

interface StudyCardProps {
  study: {
    id: string
    title: string
    description?: string
    status: string
    createdAt: Date
    content: StudyContent
    settings?: StudySettings
    _count?: {
      sessions: number
    }
  }
}

export function StudyCard({ study }: StudyCardProps) {
  const content = study.content
  const settings = study.settings
  const duration = settings?.timeLimit || 10
  const participantCount = study._count?.sessions || 0
  const isExternal = !!settings?.externalUrl

  const getBadgeVariant = () => {
    if (isExternal) return { icon: ExternalLink, text: 'External', variant: 'outline' as const }
    if (duration <= 10) return { icon: Zap, text: 'Quick', variant: 'default' as const }
    if (participantCount > 100) return { icon: Star, text: 'Popular', variant: 'secondary' as const }
    if (Date.now() - study.createdAt.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return { icon: Star, text: 'New', variant: 'destructive' as const }
    }
    return null
  }

  const badgeInfo = getBadgeVariant()

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{study.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {study.description || content?.description || 'No description available'}
            </CardDescription>
          </div>
          {badgeInfo && (
            <Badge variant={badgeInfo.variant} className="ml-2 shrink-0">
              <badgeInfo.icon className="w-3 h-3 mr-1" />
              {badgeInfo.text}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{participantCount} joined</span>
          </div>
        </div>

        <div className="pt-2">
          <Link href={`/studies/${study.id}`}>
            <Button className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}