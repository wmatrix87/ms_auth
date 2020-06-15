import express from 'express';
const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  req.session = null;
  console.log('c')
  res.send({})
});

export { router as signoutRouter };