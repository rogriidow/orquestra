import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

// Energy Assessments
export const createEnergyAssessment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { produtiva, confortavel, renovacao, conexao, notes } = req.body;

    const assessment = await prisma.energyAssessment.create({
      data: {
        userId: userId!,
        produtiva,
        confortavel,
        renovacao,
        conexao,
        notes,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { assessment },
    });
  } catch (error) {
    next(error);
  }
};

export const getEnergyAssessments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const assessments = await prisma.energyAssessment.findMany({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
      take: Number(limit),
    });

    res.json({
      status: 'success',
      data: { assessments },
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestEnergyAssessment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const assessment = await prisma.energyAssessment.findFirst({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json({
      status: 'success',
      data: { assessment },
    });
  } catch (error) {
    next(error);
  }
};

// Needs Assessments
export const createNeedsAssessment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { seguranca, social, estima, autorrealizacao, notes } = req.body;

    const assessment = await prisma.needsAssessment.create({
      data: {
        userId: userId!,
        seguranca,
        social,
        estima,
        autorrealizacao,
        notes,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { assessment },
    });
  } catch (error) {
    next(error);
  }
};

export const getNeedsAssessments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { limit = 10 } = req.query;

    const assessments = await prisma.needsAssessment.findMany({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
      take: Number(limit),
    });

    res.json({
      status: 'success',
      data: { assessments },
    });
  } catch (error) {
    next(error);
  }
};

export const getLatestNeedsAssessment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const assessment = await prisma.needsAssessment.findFirst({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json({
      status: 'success',
      data: { assessment },
    });
  } catch (error) {
    next(error);
  }
};

// Performance Radar
export const createPerformanceRadar = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { resultados, qualidade, inovacao, colaboracao, autonomia, adaptabilidade } = req.body;

    const radar = await prisma.performanceRadar.create({
      data: {
        userId: userId!,
        resultados,
        qualidade,
        inovacao,
        colaboracao,
        autonomia,
        adaptabilidade,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { radar },
    });
  } catch (error) {
    next(error);
  }
};

export const getPerformanceRadars = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const radars = await prisma.performanceRadar.findMany({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json({
      status: 'success',
      data: { radars },
    });
  } catch (error) {
    next(error);
  }
};

// Wellbeing Radar
export const createWellbeingRadar = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { focusConcentracao, energiaFisica, equilibrioEmocional, motivacao, qualidadeSono, relacionamentos } = req.body;

    const radar = await prisma.wellbeingRadar.create({
      data: {
        userId: userId!,
        focusConcentracao,
        energiaFisica,
        equilibrioEmocional,
        motivacao,
        qualidadeSono,
        relacionamentos,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { radar },
    });
  } catch (error) {
    next(error);
  }
};

export const getWellbeingRadars = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const radars = await prisma.wellbeingRadar.findMany({
      where: { userId },
      orderBy: { assessmentDate: 'desc' },
    });

    res.json({
      status: 'success',
      data: { radars },
    });
  } catch (error) {
    next(error);
  }
};

// Team Analytics
export const getTeamEnergyOverview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.params;

    // Get team members
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!team) {
      return res.status(404).json({
        status: 'error',
        message: 'Equipe não encontrada',
      });
    }

    const memberIds = team.members.map((m) => m.userId);

    // Get latest assessments for each member
    const assessments = await Promise.all(
      memberIds.map((userId) =>
        prisma.energyAssessment.findFirst({
          where: { userId },
          orderBy: { assessmentDate: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        })
      )
    );

    // Calculate averages
    const validAssessments = assessments.filter((a) => a !== null);
    const averages = {
      produtiva: validAssessments.reduce((sum, a) => sum + a!.produtiva, 0) / validAssessments.length || 0,
      confortavel: validAssessments.reduce((sum, a) => sum + a!.confortavel, 0) / validAssessments.length || 0,
      renovacao: validAssessments.reduce((sum, a) => sum + a!.renovacao, 0) / validAssessments.length || 0,
      conexao: validAssessments.reduce((sum, a) => sum + a!.conexao, 0) / validAssessments.length || 0,
    };

    res.json({
      status: 'success',
      data: {
        team: {
          id: team.id,
          name: team.name,
        },
        assessments: validAssessments,
        averages,
      },
    });
  } catch (error) {
    next(error);
  }
};
