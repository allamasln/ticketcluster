import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { User } from '../models/user'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'

const router = express.Router()

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 16 })
      .withMessage('Password must be between 4 and 16 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })

    if (existingUser) throw new BadRequestError('Error to create user')

    const user = User.build({ email, password })
    await user.save()

    const token = user.generateJWT()

    req.session = { jwt: token }

    res.status(201).json(user)
  },
)

export { router as signupRouter }
