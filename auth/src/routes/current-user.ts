import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';

router.get('/api/users/currentuser', (req, res) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (e) {
    res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };