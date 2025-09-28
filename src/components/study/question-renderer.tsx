'use client'

import { useState } from 'react'
import { StudyQuestion, QuestionConfig } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'

interface QuestionRendererProps {
  question: StudyQuestion
  value: any
  onChange: (value: any) => void
  required?: boolean
}

export function QuestionRenderer({ question, value, onChange, required = false }: QuestionRendererProps) {
  const [errors, setErrors] = useState<string[]>([])

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
      case 'email':
        const textConfig = question.config as any
        return (
          <Input
            type={question.type === 'email' ? 'email' : 'text'}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={textConfig.placeholder}
            maxLength={textConfig.maxLength}
            required={required}
            className="w-full"
          />
        )

      case 'textarea':
        const textareaConfig = question.config as any
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={textareaConfig.placeholder}
            maxLength={textareaConfig.maxLength}
            required={required}
            className="w-full min-h-[100px]"
          />
        )

      case 'number':
        const numberConfig = question.config as any
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            min={numberConfig.min}
            max={numberConfig.max}
            required={required}
            className="w-full"
          />
        )

      case 'single-choice':
        const singleChoiceConfig = question.config as any
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={(val) => onChange(val)}
            className="space-y-3"
          >
            {singleChoiceConfig.options?.map((option: any) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
            {singleChoiceConfig.allowOther && (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="cursor-pointer">Other:</Label>
                <Input
                  placeholder={singleChoiceConfig.otherPlaceholder || "Please specify..."}
                  disabled={value !== 'other'}
                  className="flex-1"
                />
              </div>
            )}
          </RadioGroup>
        )

      case 'multiple-choice':
        const multipleChoiceConfig = question.config as any
        const selectedValues = value || []

        const handleCheckboxChange = (optionValue: string, checked: boolean) => {
          let newValues = [...selectedValues]
          if (checked) {
            if (!newValues.includes(optionValue)) {
              newValues.push(optionValue)
            }
          } else {
            newValues = newValues.filter(v => v !== optionValue)
          }
          onChange(newValues)
        }

        return (
          <div className="space-y-3">
            {multipleChoiceConfig.options?.map((option: any) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={(checked) => handleCheckboxChange(option.value, checked as boolean)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        )

      case 'rating-scale':
      case 'likert':
        const scaleConfig = question.config as any
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {scaleConfig.minLabel && <span>{scaleConfig.minLabel}</span>}
              {scaleConfig.maxLabel && <span>{scaleConfig.maxLabel}</span>}
            </div>
            <RadioGroup
              value={value?.toString() || ''}
              onValueChange={(val) => onChange(Number(val))}
              className="flex space-x-4 justify-center"
            >
              {Array.from({ length: scaleConfig.max - scaleConfig.min + 1 }, (_, i) => {
                const val = scaleConfig.min + i
                return (
                  <div key={val} className="flex flex-col items-center space-y-1">
                    <RadioGroupItem value={val.toString()} id={val.toString()} />
                    <Label htmlFor={val.toString()} className="text-xs cursor-pointer">
                      {scaleConfig.showNumbers ? val : ''}
                    </Label>
                  </div>
                )
              })}
            </RadioGroup>
          </div>
        )

      case 'slider':
        const sliderConfig = question.config as any
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {sliderConfig.minLabel && <span>{sliderConfig.minLabel}</span>}
              {sliderConfig.maxLabel && <span>{sliderConfig.maxLabel}</span>}
            </div>
            <Slider
              value={[value || sliderConfig.min]}
              onValueChange={(vals) => onChange(vals[0])}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step || 1}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600">
              Current value: {value || sliderConfig.min}
            </div>
          </div>
        )

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className="w-full"
          />
        )

      case 'consent':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={question.id}
              checked={value || false}
              onCheckedChange={(checked) => onChange(checked)}
              required={required}
            />
            <Label htmlFor={question.id} className="cursor-pointer">
              {question.title}
            </Label>
          </div>
        )

      default:
        return (
          <div className="text-gray-500 italic">
            Question type "{question.type}" not yet implemented
          </div>
        )
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span>{question.title}</span>
          {question.required && (
            <span className="text-red-500 text-sm ml-2">*</span>
          )}
        </CardTitle>
        {question.description && (
          <CardDescription>{question.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {question.media && question.media.length > 0 && (
          <div className="space-y-2">
            {question.media.map((media, index) => (
              <div key={index}>
                {media.type === 'image' && (
                  <div className="space-y-1">
                    <img
                      src={media.url}
                      alt={media.alt || 'Study media'}
                      className="max-w-full h-auto rounded"
                      style={{
                        width: media.width || 'auto',
                        height: media.height || 'auto'
                      }}
                    />
                    {media.caption && (
                      <p className="text-sm text-gray-600">{media.caption}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {renderQuestionInput()}

        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}