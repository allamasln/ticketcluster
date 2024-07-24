import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import {
  signupRouter,
  signinRouter,
  signoutRouter,
  currentUserRouter,
} from './routes'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)

const BASE_PATH = '/api/users'

app.use(express.json())
app.use(cookieSession({ signed: false, secure: true }))

app.use(BASE_PATH, currentUserRouter)
app.use(BASE_PATH, signupRouter)
app.use(BASE_PATH, signinRouter)
app.use(BASE_PATH, signoutRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
