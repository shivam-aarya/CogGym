export interface StudyContent {
  version: string;
  title: string;
  description?: string;
  instructions?: string;
  sections: StudySection[];
  settings: StudySettings;
}

export interface StudySection {
  id: string;
  title?: string;
  instructions?: string;
  questions: StudyQuestion[];
  conditions?: ConditionalLogic[];
}

export interface StudyQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  config: QuestionConfig;
  validation?: ValidationRule[];
  media?: MediaContent[];
}

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'single-choice'
  | 'multiple-choice'
  | 'rating-scale'
  | 'slider'
  | 'ranking'
  | 'date'
  | 'time'
  | 'file-upload'
  | 'matrix'
  | 'demographic'
  | 'consent'
  | 'likert'
  | 'semantic-diff';

export type QuestionConfig =
  | TextConfig
  | ChoiceConfig
  | ScaleConfig
  | RankingConfig
  | MatrixConfig
  | FileConfig;

export interface TextConfig {
  type: 'text' | 'textarea' | 'email';
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
}

export interface ChoiceConfig {
  type: 'single-choice' | 'multiple-choice';
  options: ChoiceOption[];
  allowOther?: boolean;
  otherPlaceholder?: string;
  randomizeOrder?: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
  value: string;
}

export interface ScaleConfig {
  type: 'rating-scale' | 'slider' | 'likert';
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  step?: number;
  showNumbers?: boolean;
}

export interface RankingConfig {
  type: 'ranking';
  items: RankingItem[];
  maxSelections?: number;
}

export interface RankingItem {
  id: string;
  label: string;
  description?: string;
}

export interface MatrixConfig {
  type: 'matrix';
  rows: string[];
  columns: string[];
  scaleType: 'rating' | 'choice';
}

export interface FileConfig {
  type: 'file-upload';
  acceptedTypes: string[];
  maxSize: number;
  multiple?: boolean;
}

export interface StudySettings {
  allowBack: boolean;
  showProgress: boolean;
  timeLimit?: number;
  randomizeQuestions?: boolean;
  randomizeSections?: boolean;
  autoSave: boolean;
  completionMessage?: string;
  redirectUrl?: string;
  externalUrl?: string; // URL for external studies hosted elsewhere
}

export interface MediaContent {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ConditionalLogic {
  condition: string;
  action: 'show' | 'hide' | 'skip' | 'require';
  target: string;
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

export interface StudyResponse {
  questionId: string;
  value: any;
  timestamp: Date;
  duration?: number;
  metadata?: Record<string, any>;
}

// Helper function to check if a study is external
export function isExternalStudy(study: { settings?: StudySettings }): boolean {
  return !!(study.settings?.externalUrl);
}