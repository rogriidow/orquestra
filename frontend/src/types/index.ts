export interface User {
  id: string;
  email: string;
  name: string;
  role: 'MAESTRO' | 'COLABORADOR' | 'ADMIN';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING_ONBOARDING';
  avatarUrl?: string;
  phone?: string;
  department?: string;
  position?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  leaderId: string;
  leader?: User;
  members?: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  teamId: string;
  userId: string;
  user?: User;
  joinedAt: string;
  onboardingCompletedAt?: string;
}

export interface EnergyAssessment {
  id: string;
  userId: string;
  produtiva: number;
  confortavel: number;
  renovacao: number;
  conexao: number;
  notes?: string;
  assessmentDate: string;
  createdAt: string;
}

export interface NeedsAssessment {
  id: string;
  userId: string;
  seguranca: number;
  social: number;
  estima: number;
  autorrealizacao: number;
  notes?: string;
  assessmentDate: string;
  createdAt: string;
}

export interface AppreciationLanguageProfile {
  id: string;
  userId: string;
  primary: string;
  secondary?: string;
  palavrasAfirmacao: number;
  tempoQualidade: number;
  presentes: number;
  atosServico: number;
  toqueFisico: number;
  completedAt: string;
  updatedAt: string;
}

export interface Ritual {
  id: string;
  title: string;
  description: string;
  category: 'ENERGIZACAO' | 'CONEXAO' | 'RECONHECIMENTO' | 'DESENVOLVIMENTO' | 'RENOVACAO';
  frequency: 'DIARIA' | 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'TRIMESTRAL';
  duration: number;
  participants: number;
  objectives: string[];
  benefits: string[];
  steps: string[];
  materials: string[];
  tips: string[];
  teamId?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Feedback360 {
  id: string;
  giverId: string;
  receiverId: string;
  type: 'POSITIVO' | 'CONSTRUTIVO' | 'NEUTRO';
  dimension: 'COMUNICACAO' | 'LIDERANCA' | 'TRABALHO_EQUIPE' | 'INOVACAO' | 'RESULTADO' | 'RELACIONAMENTO';
  content: string;
  isAnonymous: boolean;
  giver?: User;
  receiver?: User;
  createdAt: string;
}

export interface DevelopmentTrack {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: 'TECNICA' | 'COMPORTAMENTAL' | 'LIDERANCA' | 'ESTRATEGICA';
  status: 'NAO_INICIADA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'PAUSADA';
  progress: number;
  milestones: any[];
  resources: string[];
  startDate?: string;
  targetDate?: string;
  completedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recognition {
  id: string;
  giverId: string;
  receiverId: string;
  type: 'AGRADECIMENTO' | 'PARABENS' | 'DESTAQUE' | 'PREMIO';
  title: string;
  message: string;
  isPublic: boolean;
  giver?: User;
  receiver?: User;
  createdAt: string;
}

export interface PerformanceRadar {
  id: string;
  userId: string;
  resultados: number;
  qualidade: number;
  inovacao: number;
  colaboracao: number;
  autonomia: number;
  adaptabilidade: number;
  assessmentDate: string;
  createdAt: string;
}

export interface WellbeingRadar {
  id: string;
  userId: string;
  focusConcentracao: number;
  energiaFisica: number;
  equilibrioEmocional: number;
  motivacao: number;
  qualidadeSono: number;
  relacionamentos: number;
  assessmentDate: string;
  createdAt: string;
}
