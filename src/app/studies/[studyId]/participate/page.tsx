'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { QuestionRenderer } from '@/components/study/question-renderer'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Save } from 'lucide-react'

// Mock study data with sample questions
const mockStudyContent = {
  version: '1.0',
  title: 'User Experience Design Survey',
  description: 'Help researchers understand how people interact with digital interfaces.',
  instructions: 'Please answer all questions honestly. Your responses are completely anonymous.',
  sections: [
    {
      id: 'demographics',
      title: 'About You',
      instructions: 'Tell us a bit about yourself to help us understand our participants.',
      questions: [
        {
          id: 'age',
          type: 'number',
          title: 'What is your age?',
          description: 'Please enter your age in years.',
          required: true,
          config: { type: 'number', min: 18, max: 100 }
        },
        {
          id: 'experience',
          type: 'single-choice',
          title: 'How would you rate your technical experience?',
          description: 'Consider your overall comfort with technology and digital interfaces.',
          required: true,
          config: {
            type: 'single-choice',
            options: [
              { id: '1', label: 'Beginner - I\'m not very comfortable with technology', value: 'beginner' },
              { id: '2', label: 'Intermediate - I can handle most tech tasks', value: 'intermediate' },
              { id: '3', label: 'Advanced - I\'m very comfortable with technology', value: 'advanced' },
              { id: '4', label: 'Expert - I work in a technical field', value: 'expert' }
            ]
          }
        }
      ]
    },
    {
      id: 'usage',
      title: 'Technology Usage',
      instructions: 'Tell us about how you use technology in your daily life.',
      questions: [
        {
          id: 'devices',
          type: 'multiple-choice',
          title: 'Which devices do you use regularly?',
          description: 'Select all that apply.',
          required: true,
          config: {
            type: 'multiple-choice',
            options: [
              { id: '1', label: 'Smartphone', value: 'smartphone' },
              { id: '2', label: 'Laptop/Desktop Computer', value: 'computer' },
              { id: '3', label: 'Tablet', value: 'tablet' },
              { id: '4', label: 'Smart TV', value: 'smart-tv' },
              { id: '5', label: 'Smart Watch', value: 'smart-watch' }
            ],
            allowOther: true,
            otherPlaceholder: 'Please specify other devices...'
          }
        },
        {
          id: 'satisfaction',
          type: 'rating-scale',
          title: 'How satisfied are you with most apps and websites you use?',
          description: 'Rate your overall satisfaction with digital interfaces.',
          required: true,
          config: {
            type: 'rating-scale',
            min: 1,
            max: 5,
            minLabel: 'Very Unsatisfied',
            maxLabel: 'Very Satisfied',
            showNumbers: true
          }
        }
      ]
    },
    {
      id: 'feedback',
      title: 'Your Thoughts',
      instructions: 'Share your thoughts and experiences.',
      questions: [
        {
          id: 'improvements',
          type: 'textarea',
          title: 'What improvements would you like to see in digital interfaces?',
          description: 'Think about apps, websites, or any digital tools you use regularly.',
          required: false,
          config: {
            type: 'textarea',
            placeholder: 'Share your thoughts on what could be improved...',
            maxLength: 500
          }
        },
        {
          id: 'frustrations',
          type: 'slider',
          title: 'How often do you feel frustrated when using apps or websites?',
          description: 'Move the slider to indicate frequency.',
          required: true,
          config: {
            type: 'slider',
            min: 0,
            max: 10,
            minLabel: 'Never',
            maxLabel: 'Always',
            step: 1
          }
        }
      ]
    }
  ],
  settings: {
    allowBack: true,
    showProgress: true,
    timeLimit: 10,
    autoSave: true
  }
}

export default function StudyParticipatePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()

  const studyId = params.studyId as string
  const [studyContent] = useState(mockStudyContent)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, any>>({})
  const [startTime] = useState(Date.now())
  const [lastSaveTime, setLastSaveTime] = useState(Date.now())
  const [isCompleted, setIsCompleted] = useState(false)

  const currentSection = studyContent.sections[currentSectionIndex]
  const currentQuestion = currentSection?.questions[currentQuestionIndex]

  // Calculate progress
  const totalQuestions = studyContent.sections.reduce((sum, section) => sum + section.questions.length, 0)
  const answeredQuestions = Object.keys(responses).length
  const progress = (answeredQuestions / totalQuestions) * 100

  // Auto-save responses
  useEffect(() => {
    if (studyContent.settings.autoSave && Date.now() - lastSaveTime > 30000) { // Save every 30 seconds
      // In real app, save to database
      console.log('Auto-saving responses:', responses)
      setLastSaveTime(Date.now())
    }
  }, [responses, lastSaveTime, studyContent.settings.autoSave])

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const canGoNext = () => {
    if (!currentQuestion) return false

    if (currentQuestion.required) {
      const response = responses[currentQuestion.id]
      return response !== undefined && response !== null && response !== ''
    }
    return true
  }

  const handleNext = () => {
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else if (currentSectionIndex < studyContent.sections.length - 1) {
      setCurrentSectionIndex(prev => prev + 1)
      setCurrentQuestionIndex(0)
    } else {
      // Study completed
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1)
      setCurrentQuestionIndex(studyContent.sections[currentSectionIndex - 1].questions.length - 1)
    }
  }

  const handleComplete = async () => {
    // In real app, submit responses to database
    console.log('Submitting study responses:', {
      studyId,
      userId: session?.user?.id,
      responses,
      completedAt: new Date(),
      duration: Date.now() - startTime
    })

    router.push(`/studies/${studyId}/complete`)
  }

  const getCurrentQuestionNumber = () => {
    let questionNumber = 1
    for (let i = 0; i < currentSectionIndex; i++) {
      questionNumber += studyContent.sections[i].questions.length
    }
    questionNumber += currentQuestionIndex
    return questionNumber
  }

  if (isCompleted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl text-center">
        <Card>
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">🎉 Thank You!</h1>
            <p className="text-lg text-gray-600 mb-6">
              You've successfully completed the study! Your responses have been securely saved.
            </p>
            <div className="space-y-4">
              <Button onClick={handleComplete} size="lg">
                Submit Responses
              </Button>
              <p className="text-sm text-gray-500">
                Submitting will finalize your participation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!currentQuestion) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{studyContent.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{Math.round((Date.now() - startTime) / 60000)} min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Save className="w-4 h-4" />
              <span>Auto-saved</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Question {getCurrentQuestionNumber()} of {totalQuestions}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </div>

      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {currentSection.title}
        </h2>
        {currentSection.instructions && (
          <p className="text-gray-600">{currentSection.instructions}</p>
        )}
      </div>

      {/* Question */}
      <div className="mb-8">
        <QuestionRenderer
          question={currentQuestion}
          value={responses[currentQuestion.id]}
          onChange={(value) => handleResponseChange(currentQuestion.id, value)}
          required={currentQuestion.required}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        <div className="text-sm text-gray-500">
          {studyContent.settings.allowBack ? 'You can go back to previous questions' : 'Forward only'}
        </div>

        <Button
          onClick={handleNext}
          disabled={!canGoNext()}
          className="flex items-center space-x-2"
        >
          <span>
            {currentSectionIndex === studyContent.sections.length - 1 &&
             currentQuestionIndex === currentSection.questions.length - 1
              ? 'Complete' : 'Continue'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Required field notice */}
      {currentQuestion.required && !responses[currentQuestion.id] && (
        <p className="text-center text-sm text-red-600 mt-4">
          This question is required to continue
        </p>
      )}
    </div>
  )
}