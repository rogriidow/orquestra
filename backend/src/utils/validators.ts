import { z } from 'zod';

// Auth schemas
export const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  role: z.enum(['MAESTRO', 'COLABORADOR']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

// Team schemas
export const createTeamSchema = z.object({
  name: z.string().min(2, 'Nome da equipe deve ter pelo menos 2 caracteres'),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor deve ser um código hex válido').optional(),
  icon: z.string().optional(),
});

export const updateTeamSchema = createTeamSchema.partial();

// Energy assessment schema
export const energyAssessmentSchema = z.object({
  produtiva: z.number().min(0).max(10),
  confortavel: z.number().min(0).max(10),
  renovacao: z.number().min(0).max(10),
  conexao: z.number().min(0).max(10),
  notes: z.string().optional(),
});

// Needs assessment schema
export const needsAssessmentSchema = z.object({
  seguranca: z.number().min(0).max(10),
  social: z.number().min(0).max(10),
  estima: z.number().min(0).max(10),
  autorrealizacao: z.number().min(0).max(10),
  notes: z.string().optional(),
});

// Appreciation language schema
export const appreciationLanguageSchema = z.object({
  answers: z.array(z.string()).length(15, 'Questionário deve ter 15 respostas'),
});

// Ritual schema
export const createRitualSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  category: z.enum(['ENERGIZACAO', 'CONEXAO', 'RECONHECIMENTO', 'DESENVOLVIMENTO', 'RENOVACAO']),
  frequency: z.enum(['DIARIA', 'SEMANAL', 'QUINZENAL', 'MENSAL', 'TRIMESTRAL']),
  duration: z.number().min(1, 'Duração deve ser maior que 0'),
  participants: z.number().min(1).optional(),
  objectives: z.array(z.string()),
  benefits: z.array(z.string()),
  steps: z.array(z.string()),
  materials: z.array(z.string()).optional(),
  tips: z.array(z.string()).optional(),
  teamId: z.string().uuid().optional(),
});

// Feedback 360 schema
export const feedback360Schema = z.object({
  receiverId: z.string().uuid('ID do receptor inválido'),
  type: z.enum(['POSITIVO', 'CONSTRUTIVO', 'NEUTRO']),
  dimension: z.enum(['COMUNICACAO', 'LIDERANCA', 'TRABALHO_EQUIPE', 'INOVACAO', 'RESULTADO', 'RELACIONAMENTO']),
  content: z.string().min(10, 'Feedback deve ter pelo menos 10 caracteres'),
  isAnonymous: z.boolean().optional(),
});

// Development track schema
export const developmentTrackSchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  type: z.enum(['TECNICA', 'COMPORTAMENTAL', 'LIDERANCA', 'ESTRATEGICA']),
  status: z.enum(['NAO_INICIADA', 'EM_ANDAMENTO', 'CONCLUIDA', 'PAUSADA']).optional(),
  milestones: z.array(z.object({
    title: z.string(),
    completed: z.boolean(),
    date: z.string().optional(),
  })).optional(),
  resources: z.array(z.string()).optional(),
  startDate: z.string().optional(),
  targetDate: z.string().optional(),
});

// Recognition schema
export const recognitionSchema = z.object({
  receiverId: z.string().uuid('ID do receptor inválido'),
  type: z.enum(['AGRADECIMENTO', 'PARABENS', 'DESTAQUE', 'PREMIO']),
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
  isPublic: z.boolean().optional(),
});

// Performance radar schema
export const performanceRadarSchema = z.object({
  resultados: z.number().min(0).max(10),
  qualidade: z.number().min(0).max(10),
  inovacao: z.number().min(0).max(10),
  colaboracao: z.number().min(0).max(10),
  autonomia: z.number().min(0).max(10),
  adaptabilidade: z.number().min(0).max(10),
});

// Wellbeing radar schema
export const wellbeingRadarSchema = z.object({
  focusConcentracao: z.number().min(0).max(10),
  energiaFisica: z.number().min(0).max(10),
  equilibrioEmocional: z.number().min(0).max(10),
  motivacao: z.number().min(0).max(10),
  qualidadeSono: z.number().min(0).max(10),
  relacionamentos: z.number().min(0).max(10),
});
