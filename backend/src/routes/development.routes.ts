import { Router } from 'express';
import * as developmentController from '../controllers/developmentController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { developmentTrackSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(developmentTrackSchema), developmentController.createTrack);
router.get('/:userId', developmentController.getTracks);
router.put('/:id', developmentController.updateTrack);
router.post('/:id/complete', developmentController.completeTrack);

export default router;
