import request from 'supertest'
import { config } from '../config'
import { app } from '../app'

export const signupRequest = (email: string, password: string) => {
  return request(app).post(config.endpoints.signup).send({ email, password })
}

export const signinRequest = (email: string, password: string) => {
  return request(app).post(config.endpoints.signin).send({ email, password })
}
