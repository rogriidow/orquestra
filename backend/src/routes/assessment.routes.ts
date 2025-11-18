import { Router } from 'express';
import * as assessmentController from '../controllers/assessmentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { energyAssessmentSchema, needsAssessmentSchema, performanceRadarSchema, wellbeingRadarSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

// Energy Assessments
router.post('/energy', validate(energyAssessmentSchema), assessmentController.createEnergyAssessment);
router.get('/energy/:userId', assessmentController.getEnergyAssessments);
router.get('/energy/:userId/latest', assessmentController.getLatestEnergyAssessment);

// Needs Assessments
router.post('/needs', validate(needsAssessmentSchema), assessmentController.createNeedsAssessment);
router.get('/needs/:userId', assessmentController.getNeedsAssessments);
router.get('/needs/:userId/latest', assessmentController.getLatestNeedsAssessment);

// Performance Radar
router.post('/performance', validate(performanceRadarSchema), assessmentController.createPerformanceRadar);
router.get('/performance/:userId', assessmentController.getPerformanceRadars);

// Wellbeing Radar
router.post('/wellbeing', validate(wellbeingRadarSchema), assessmentController.createWellbeingRadar);
router.get('/wellbeing/:userId', assessmentController.getWellbeingRadars);

// Team Analytics
router.get('/team/:teamId/energy', assessmentController.getTeamEnergyOverview);

export default router;
