import express from 'express';
import { body } from 'express-validator';
import { createRoom, getRooms, getRoom } from '../controllers/roomController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.post('/', authenticateToken, [
  body('name')
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage('Room name must be between 3 and 50 characters')
    .matches(/^[a-zA-Z0-9-_\s]+$/)
    .withMessage('Room name can only contain letters, numbers, spaces, hyphens, and underscores'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description cannot exceed 200 characters')
], createRoom);

router.get('/', getRooms);
router.get('/:roomId', getRoom);

export default router;