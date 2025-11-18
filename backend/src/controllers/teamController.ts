import { Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError, ForbiddenError } from '../utils/errors';

const prisma = new PrismaClient();

export const createTeam = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { name, description, color, icon } = req.body;

    const team = await prisma.team.create({
      data: {
        name,
        description,
        color: color || '#6366f1',
        icon,
        leaderId: userId!,
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                position: true,
                department: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: { team },
    });
  } catch (error) {
    next(error);
  }
};

export const getTeams = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const teams = await prisma.team.findMany({
      where: {
        leaderId: userId,
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                position: true,
                department: true,
              },
            },
          },
        },
      },
    });

    res.json({
      status: 'success',
      data: { teams },
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const team = await prisma.team.findUnique({
      where: { id },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                position: true,
                department: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundError('Equipe não encontrada');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenError('Você não tem permissão para acessar esta equipe');
    }

    res.json({
      status: 'success',
      data: { team },
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;
    const { name, description, color, icon } = req.body;

    const existingTeam = await prisma.team.findUnique({
      where: { id },
    });

    if (!existingTeam) {
      throw new NotFoundError('Equipe não encontrada');
    }

    if (existingTeam.leaderId !== userId) {
      throw new ForbiddenError('Você não tem permissão para editar esta equipe');
    }

    const team = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
        color,
        icon,
      },
      include: {
        leader: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatarUrl: true,
                position: true,
                department: true,
              },
            },
          },
        },
      },
    });

    res.json({
      status: 'success',
      data: { team },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundError('Equipe não encontrada');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenError('Você não tem permissão para deletar esta equipe');
    }

    await prisma.team.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const addMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { userId: memberId } = req.body;
    const userId = req.user?.userId;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundError('Equipe não encontrada');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenError('Você não tem permissão para adicionar membros a esta equipe');
    }

    const member = await prisma.teamMember.create({
      data: {
        teamId: id,
        userId: memberId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
            position: true,
            department: true,
          },
        },
      },
    });

    res.status(201).json({
      status: 'success',
      data: { member },
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, memberId } = req.params;
    const userId = req.user?.userId;

    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundError('Equipe não encontrada');
    }

    if (team.leaderId !== userId) {
      throw new ForbiddenError('Você não tem permissão para remover membros desta equipe');
    }

    await prisma.teamMember.deleteMany({
      where: {
        teamId: id,
        userId: memberId,
      },
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
