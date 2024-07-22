import express from 'express'
import 'express-async-errors'

import {
  signupRouter,
  signinRouter,
  signoutRouter,
  currentUserRouter,
} from './routes'

import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
const BASE_PATH = '/api/users'

app.use(express.json())

app.use(BASE_PATH, currentUserRouter)
app.use(BASE_PATH, signupRouter)
app.use(BASE_PATH, signinRouter)
app.use(BASE_PATH, signoutRouter)

app.all('*', () => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
