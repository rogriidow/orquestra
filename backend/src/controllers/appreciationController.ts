import { Response, NextFunction } from 'express';
import { PrismaClient, AppreciationLanguage } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Appreciation Language Questions (15 questions)
export const getQuestions = (req: AuthRequest, res: Response) => {
  const questions = [
    { id: 1, text: 'Prefiro receber elogios verbais ou por escrito?', options: ['PALAVRAS_AFIRMACAO', 'PALAVRAS_AFIRMACAO'] },
    { id: 2, text: 'Valorizo quando alguém dedica tempo exclusivo para conversar comigo.', options: ['TEMPO_QUALIDADE'] },
    { id: 3, text: 'Aprecio quando recebo pequenos presentes ou lembranças.', options: ['PRESENTES'] },
    { id: 4, text: 'Me sinto valorizado quando alguém me ajuda com minhas tarefas.', options: ['ATOS_SERVICO'] },
    { id: 5, text: 'Gosto de cumprimentos como apertos de mão ou abraços (quando apropriado).', options: ['TOQUE_FISICO'] },
    { id: 6, text: 'Palavras de reconhecimento me motivam muito.', options: ['PALAVRAS_AFIRMACAO'] },
    { id: 7, text: 'Prefiro ter conversas profundas a presentes.', options: ['TEMPO_QUALIDADE'] },
    { id: 8, text: 'Símbolos de reconhecimento (troféus, certificados) são importantes para mim.', options: ['PRESENTES'] },
    { id: 9, text: 'Valorizo quando alguém assume tarefas para me ajudar.', options: ['ATOS_SERVICO'] },
    { id: 10, text: 'Gestos físicos de apoio me fazem sentir valorizado.', options: ['TOQUE_FISICO'] },
    { id: 11, text: 'Elogios públicos são muito importantes para mim.', options: ['PALAVRAS_AFIRMACAO'] },
    { id: 12, text: 'Atenção total durante uma conversa me faz sentir valorizado.', options: ['TEMPO_QUALIDADE'] },
    { id: 13, text: 'Presentes personalizados mostram que alguém se importa.', options: ['PRESENTES'] },
    { id: 14, text: 'Ações práticas valem mais que palavras.', options: ['ATOS_SERVICO'] },
    { id: 15, text: 'Um tapinha nas costas ou high-five me energiza.', options: ['TOQUE_FISICO'] },
  ];

  res.json({
    status: 'success',
    data: { questions },
  });
};

export const submitQuestionnaire = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { answers } = req.body; // Array of 15 AppreciationLanguage values

    // Calculate scores
    const scores = {
      PALAVRAS_AFIRMACAO: answers.filter((a: string) => a === 'PALAVRAS_AFIRMACAO').length,
      TEMPO_QUALIDADE: answers.filter((a: string) => a === 'TEMPO_QUALIDADE').length,
      PRESENTES: answers.filter((a: string) => a === 'PRESENTES').length,
      ATOS_SERVICO: answers.filter((a: string) => a === 'ATOS_SERVICO').length,
      TOQUE_FISICO: answers.filter((a: string) => a === 'TOQUE_FISICO').length,
    };

    // Find primary and secondary
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const primary = sortedScores[0][0] as AppreciationLanguage;
    const secondary = sortedScores[1][0] as AppreciationLanguage;

    // Upsert profile
    const profile = await prisma.appreciationLanguageProfile.upsert({
      where: { userId: userId! },
      update: {
        primary,
        secondary,
        palavrasAfirmacao: scores.PALAVRAS_AFIRMACAO,
        tempoQualidade: scores.TEMPO_QUALIDADE,
        presentes: scores.PRESENTES,
        atosServico: scores.ATOS_SERVICO,
        toqueFisico: scores.TOQUE_FISICO,
      },
      create: {
        userId: userId!,
        primary,
        secondary,
        palavrasAfirmacao: scores.PALAVRAS_AFIRMACAO,
        tempoQualidade: scores.TEMPO_QUALIDADE,
        presentes: scores.PRESENTES,
        atosServico: scores.ATOS_SERVICO,
        toqueFisico: scores.TOQUE_FISICO,
      },
    });

    res.json({
      status: 'success',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const profile = await prisma.appreciationLanguageProfile.findUnique({
      where: { userId },
    });

    res.json({
      status: 'success',
      data: { profile },
    });
  } catch (error) {
    next(error);
  }
};
