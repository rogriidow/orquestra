import { Router } from 'express';
import * as feedbackController from '../controllers/feedbackController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { feedback360Schema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(feedback360Schema), feedbackController.createFeedback);
router.get('/received', feedbackController.getReceivedFeedback);
router.get('/given', feedbackController.getGivenFeedback);

export default router;
