import { Router } from 'express';
import * as recognitionController from '../controllers/recognitionController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { recognitionSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(recognitionSchema), recognitionController.createRecognition);
router.get('/received/:userId?', recognitionController.getReceivedRecognitions);
router.get('/public', recognitionController.getPublicRecognitions);

export default router;
