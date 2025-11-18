import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

export const createFeedback = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const giverId = req.user?.userId;
    const { receiverId, type, dimension, content, isAnonymous } = req.body;

    const feedback = await prisma.feedback360.create({
      data: {
        giverId: giverId!,
        receiverId,
        type,
        dimension,
        content,
        isAnonymous: isAnonymous || false,
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

    // Hide giver info if anonymous
    if (feedback.isAnonymous) {
      (feedback as any).giver = null;
    }

    res.status(201).json({
      status: 'success',
      data: { feedback },
    });
  } catch (error) {
    next(error);
  }
};

export const getReceivedFeedback = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const feedbacks = await prisma.feedback360.findMany({
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

    // Hide giver info for anonymous feedbacks
    const processedFeedbacks = feedbacks.map((f) => {
      if (f.isAnonymous) {
        return { ...f, giver: null };
      }
      return f;
    });

    res.json({
      status: 'success',
      data: { feedbacks: processedFeedbacks },
    });
  } catch (error) {
    next(error);
  }
};

export const getGivenFeedback = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const feedbacks = await prisma.feedback360.findMany({
      where: { giverId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
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
      data: { feedbacks },
    });
  } catch (error) {
    next(error);
  }
};
