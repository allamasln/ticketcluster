import express from 'express'
import { config } from '../config'

const router = express.Router()

const { endpoints } = config

router.post(endpoints.signout, (req, res) => {
  req.session = null

  res.json({})
})

export { router as signoutRouter }
