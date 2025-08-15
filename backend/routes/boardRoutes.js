import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import { fetchBoards, updateBoards } from '../controllers/boardController.js';

const router = express.Router();

//router.use(verifyToken);
router.route('/fetch').get(fetchBoards);
router.route('/update').put(updateBoards);

export { router };
