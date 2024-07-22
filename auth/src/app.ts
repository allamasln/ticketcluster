import express from 'express'

import {
  signupRouter,
  signinRouter,
  signoutRouter,
  currentUserRouter,
} from './routes'

import { errorHandler } from './middlewares/error-handler'

const app = express()
const BASE_PATH = '/api/users'

app.use(express.json())

app.use(BASE_PATH, currentUserRouter)
app.use(BASE_PATH, signupRouter)
app.use(BASE_PATH, signinRouter)
app.use(BASE_PATH, signoutRouter)

app.use(errorHandler)

export { app }
