import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createRecognition = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const giverId = req.user?.userId;
    const { receiverId, type, title, message, isPublic } = req.body;

    const recognition = await prisma.recognition.create({
      data: {
        giverId: giverId!,
        receiverId,
        type,
        title,
        message,
        isPublic: isPublic !== undefined ? isPublic : true,
      },
      include: {
        giver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: { recognition },
    });
  } catch (error) {
    next(error);
  }
};

export const getReceivedRecognitions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId || req.user?.userId;

    const recognitions = await prisma.recognition.findMany({
      where: { receiverId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        giver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      status: 'success',
      data: { recognitions },
    });
  } catch (error) {
    next(error);
  }
};

export const getPublicRecognitions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit = 20 } = req.query;

    const recognitions = await prisma.recognition.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      include: {
        giver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    res.json({
      status: 'success',
      data: { recognitions },
    });
  } catch (error) {
    next(error);
  }
};
