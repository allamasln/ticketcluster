import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'
import { config } from '../config'

const router = express.Router()

const {
  endpoints,
  validation: { email, password },
} = config

router.post(
  endpoints.signup,
  [
    body('email').isEmail().withMessage(email.validErrorMessage),
    body('password')
      .trim()
      .isLength({
        min: password.minLength,
        max: password.maxLength,
      })
      .withMessage(password.lengthErrorMessage),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser)
      throw new BadRequestError('Error to create user')

    const user = User.build({ email, password })
    await user.save()

    const token = user.generateJWT()

    req.session = { jwt: token }

    res.status(201).json(user)
  },
)

export { router as signupRouter }
