export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  PARTICIPANT = 'PARTICIPANT',
  RESEARCHER = 'RESEARCHER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface UserPermissions {
  canTakeStudies: boolean;
  canCreateStudies: boolean;
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canAccessAdminPanel: boolean;
}

export interface GuestSession {
  id: string;
  studyId: string;
  responses: any[];
  startedAt: Date;
  expiresAt: Date;
}