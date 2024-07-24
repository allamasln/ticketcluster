import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { Password } from '../services/password'

const router = express.Router()

router.post(
  '/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser) throw new BadRequestError('Invalid credentials')

    const passwordsMatch = await Password.compare(
      password,
      existingUser.password,
    )

    if (!passwordsMatch) throw new BadRequestError('Invalid credentials')

    const token = existingUser.generateJWT()

    req.session = { jwt: token }

    res.status(200).json(existingUser)
  },
)

export { router as signinRouter }
