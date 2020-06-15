import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password} from '../services/password';


const router = express.Router();

router.post('/api/users/signin', [
    body('email')
      .isEmail()
      .withMessage('email not valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .notEmpty()
      .withMessage('enter password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credential');
    }

    const passwordMatch = await Password.compare(existingUser.password, password);
    if (!passwordMatch) {
      throw new BadRequestError('Invalid credential');
    }

    const userJwt = jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);

    // @ts-ignore
    req.session = { jwt: userJwt };

    res.status(200).send(existingUser);
});

export { router as signinRouter };