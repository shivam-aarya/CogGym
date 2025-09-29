'use client'

import { StudyQuestion } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'

interface QuestionRendererProps {
  question: StudyQuestion
  value: unknown
  onChange: (value: unknown) => void
  required?: boolean
}

interface BaseConfig {
  type: string
}

interface TextConfig extends BaseConfig {
  placeholder?: string
  maxLength?: number
}

interface NumberConfig extends BaseConfig {
  min?: number
  max?: number
}

interface ChoiceOption {
  id: string
  label: string
  value: string
}

interface ChoiceConfig extends BaseConfig {
  options?: ChoiceOption[]
  allowOther?: boolean
  otherPlaceholder?: string
}

interface ScaleConfig extends BaseConfig {
  min: number
  max: number
  minLabel?: string
  maxLabel?: string
  showNumbers?: boolean
  step?: number
}

export function QuestionRenderer({ question, value, onChange, required = false }: QuestionRendererProps) {

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
      case 'email':
        const textConfig = question.config as TextConfig
        return (
          <Input
            type={question.type === 'email' ? 'email' : 'text'}
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={textConfig.placeholder}
            maxLength={textConfig.maxLength}
            required={required}
            className="w-full"
          />
        )

      case 'textarea':
        const textareaConfig = question.config as TextConfig
        return (
          <Textarea
            value={(value as string) || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={textareaConfig.placeholder}
            maxLength={textareaConfig.maxLength}
            required={required}
            className="w-full min-h-[100px]"
          />
        )

      case 'number':
        const numberConfig = question.config as NumberConfig
        return (
          <Input
            type="number"
            value={(value as string) || ''}
            onChange={(e) => onChange(Number(e.target.value))}
            min={numberConfig.min}
            max={numberConfig.max}
            required={required}
            className="w-full"
          />
        )

      case 'single-choice':
        const singleChoiceConfig = question.config as ChoiceConfig
        return (
          <RadioGroup
            value={(value as string) || ''}
            onValueChange={(val) => onChange(val)}
            className="space-y-3"
          >
            {singleChoiceConfig.options?.map((option: ChoiceOption) => (
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
        const multipleChoiceConfig = question.config as ChoiceConfig
        const selectedValues = (value as string[]) || []

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
            {multipleChoiceConfig.options?.map((option: ChoiceOption) => (
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
        const scaleConfig = question.config as ScaleConfig
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {scaleConfig.minLabel && <span>{scaleConfig.minLabel}</span>}
              {scaleConfig.maxLabel && <span>{scaleConfig.maxLabel}</span>}
            </div>
            <RadioGroup
              value={(value as number)?.toString() || ''}
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
        const sliderConfig = question.config as ScaleConfig
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              {sliderConfig.minLabel && <span>{sliderConfig.minLabel}</span>}
              {sliderConfig.maxLabel && <span>{sliderConfig.maxLabel}</span>}
            </div>
            <Slider
              value={[(value as number) || sliderConfig.min]}
              onValueChange={(vals) => onChange(vals[0])}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step || 1}
              className="w-full"
            />
            <div className="text-center text-sm text-gray-600">
              Current value: {(value as number) || sliderConfig.min}
            </div>
          </div>
        )

      case 'date':
        return (
          <Input
            type="date"
            value={(value as string) || ''}
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
              checked={(value as boolean) || false}
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
            Question type &quot;{question.type}&quot; not yet implemented
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
                    <Image
                      src={media.url}
                      alt={media.alt || 'Study media'}
                      width={media.width || 800}
                      height={media.height || 600}
                      className="max-w-full h-auto rounded"
                      style={{
                        width: media.width ? `${media.width}px` : 'auto',
                        height: media.height ? `${media.height}px` : 'auto'
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
      </CardContent>
    </Card>
  )
}