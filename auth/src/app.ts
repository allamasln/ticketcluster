import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import {
  signupRouter,
  signinRouter,
  signoutRouter,
  currentUserRouter,
} from './routes'

import { config } from './config'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true)

const { baseUrl } = config.endpoints

app.use(express.json())
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  }),
)

app.use(currentUserRouter)
app.use(signupRouter)
app.use(signinRouter)
app.use(signoutRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
