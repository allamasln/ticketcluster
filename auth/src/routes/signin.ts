import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { Password } from '../services/password'
import { validateRequest } from '../middlewares/validate-request'
import { BadRequestError } from '../errors/bad-request-error'
import { config } from '../config'

const router = express.Router()

const {
  endpoints,
  validation: { email, password },
} = config

router.post(
  endpoints.signin,
  [
    body('email').isEmail().withMessage(email.validErrorMessage),
    body('password')
      .trim()
      .notEmpty()
      .withMessage(password.requiredErrorMessage),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })

    if (!existingUser)
      throw new BadRequestError('Invalid credentials')

    const passwordsMatch = await Password.compare(
      password,
      existingUser.password,
    )

    if (!passwordsMatch)
      throw new BadRequestError('Invalid credentials')

    const token = existingUser.generateJWT()

    req.session = { jwt: token }

    res.status(200).json(existingUser)
  },
)

export { router as signinRouter }
