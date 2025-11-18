import { Router } from 'express';
import * as appreciationController from '../controllers/appreciationController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { appreciationLanguageSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.get('/questions', appreciationController.getQuestions);
router.post('/submit', validate(appreciationLanguageSchema), appreciationController.submitQuestionnaire);
router.get('/profile/:userId', appreciationController.getProfile);

export default router;
