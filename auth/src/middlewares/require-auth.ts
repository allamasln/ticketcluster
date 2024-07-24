import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../errors/unauthorized-error'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string
  email: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.session?.jwt) throw new UnauthorizedError()

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!,
    ) as UserPayload

    req.user = payload

    next()
  } catch (err) {
    throw new UnauthorizedError()
  }
}
