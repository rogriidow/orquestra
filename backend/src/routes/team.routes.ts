import { Router } from 'express';
import * as teamController from '../controllers/teamController';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createTeamSchema, updateTeamSchema } from '../utils/validators';

const router = Router();

router.use(authenticate); // All team routes require authentication

router.post('/', validate(createTeamSchema), teamController.createTeam);
router.get('/', teamController.getTeams);
router.get('/:id', teamController.getTeamById);
router.put('/:id', validate(updateTeamSchema), teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);
router.post('/:id/members', teamController.addMember);
router.delete('/:id/members/:memberId', teamController.removeMember);

export default router;
