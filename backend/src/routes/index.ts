import { Router } from 'express';
import authRoutes from './auth.routes';
import teamRoutes from './team.routes';
import assessmentRoutes from './assessment.routes';
import appreciationRoutes from './appreciation.routes';
import ritualRoutes from './ritual.routes';
import feedbackRoutes from './feedback.routes';
import developmentRoutes from './development.routes';
import recognitionRoutes from './recognition.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/teams', teamRoutes);
router.use('/assessments', assessmentRoutes);
router.use('/appreciation', appreciationRoutes);
router.use('/rituals', ritualRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/development', developmentRoutes);
router.use('/recognition', recognitionRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Orquestra de Potenciais API',
    version: '1.0.0',
  });
});

export default router;
