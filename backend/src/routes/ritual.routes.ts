import { Router } from 'express';
import * as ritualController from '../controllers/ritualController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createRitualSchema } from '../utils/validators';

const router = Router();

router.use(authenticate);

router.post('/', validate(createRitualSchema), ritualController.createRitual);
router.get('/', ritualController.getRituals);
router.get('/:id', ritualController.getRitualById);
router.put('/:id', ritualController.updateRitual);
router.delete('/:id', ritualController.deleteRitual);

export default router;
