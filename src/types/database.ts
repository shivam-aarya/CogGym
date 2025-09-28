import { User, Study, StudyResponse, StudySession } from '@prisma/client';

export type DatabaseUser = User;
export type DatabaseStudy = Study;
export type DatabaseStudyResponse = StudyResponse;
export type DatabaseStudySession = StudySession;

export type StudyWithSessions = Study & {
  sessions: StudySession[];
  responses: StudyResponse[];
};

export type UserWithSessions = User & {
  sessions: StudySession[];
  responses: StudyResponse[];
};

export type SessionWithResponses = StudySession & {
  responses: StudyResponse[];
  user: User;
  study: Study;
};

export enum StudyStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED'
}

export enum SessionStatus {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED'
}