import express from 'express';
const router = express.Router();
import { currentUser } from '../middlewares/curent-user';
import { requireAuth } from '../middlewares/require-auth';

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };