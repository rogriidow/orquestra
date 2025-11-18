import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createRitual = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, category, frequency, duration, participants, objectives, benefits, steps, materials, tips, teamId } = req.body;

    const ritual = await prisma.ritual.create({
      data: {
        title,
        description,
        category,
        frequency,
        duration,
        participants,
        objectives,
        benefits,
        steps,
        materials: materials || [],
        tips: tips || [],
        teamId,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { ritual },
    });
  } catch (error) {
    next(error);
  }
};

export const getRituals = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId, category } = req.query;

    const where: any = { isActive: true };

    if (teamId) {
      where.OR = [
        { teamId: teamId as string },
        { teamId: null }, // Global rituals
      ];
    } else {
      where.teamId = null; // Only global rituals
    }

    if (category) {
      where.category = category;
    }

    const rituals = await prisma.ritual.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { rituals },
    });
  } catch (error) {
    next(error);
  }
};

export const getRitualById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const ritual = await prisma.ritual.findUnique({
      where: { id },
    });

    if (!ritual) {
      return res.status(404).json({
        status: 'error',
        message: 'Ritual não encontrado',
      });
    }

    res.json({
      status: 'success',
      data: { ritual },
    });
  } catch (error) {
    next(error);
  }
};

export const updateRitual = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const ritual = await prisma.ritual.update({
      where: { id },
      data,
    });

    res.json({
      status: 'success',
      data: { ritual },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRitual = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await prisma.ritual.update({
      where: { id },
      data: { isActive: false },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
