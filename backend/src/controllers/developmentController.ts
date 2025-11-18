import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createTrack = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.body.userId || req.user?.userId;
    const { title, description, type, milestones, resources, startDate, targetDate } = req.body;

    const track = await prisma.developmentTrack.create({
      data: {
        userId: userId!,
        title,
        description,
        type,
        milestones: milestones || [],
        resources: resources || [],
        startDate: startDate ? new Date(startDate) : null,
        targetDate: targetDate ? new Date(targetDate) : null,
      },
    });

    res.status(201).json({
      status: 'success',
      data: { track },
    });
  } catch (error) {
    next(error);
  }
};

export const getTracks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;

    const tracks = await prisma.developmentTrack.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({
      status: 'success',
      data: { tracks },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTrack = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (data.startDate) data.startDate = new Date(data.startDate);
    if (data.targetDate) data.targetDate = new Date(data.targetDate);

    const track = await prisma.developmentTrack.update({
      where: { id },
      data,
    });

    res.json({
      status: 'success',
      data: { track },
    });
  } catch (error) {
    next(error);
  }
};

export const completeTrack = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const track = await prisma.developmentTrack.update({
      where: { id },
      data: {
        status: 'CONCLUIDA',
        progress: 100,
        completedDate: new Date(),
      },
    });

    res.json({
      status: 'success',
      data: { track },
    });
  } catch (error) {
    next(error);
  }
};
