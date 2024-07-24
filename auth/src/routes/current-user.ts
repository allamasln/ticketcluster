import express from 'express'
import { requireAuth } from '../middlewares/require-auth'
import { config } from '../config'

const router = express.Router()

const { endpoints } = config

router.get(endpoints.currentUser, requireAuth, (req, res) => {
  res.json({ currentUser: req.user })
})

export { router as currentUserRouter }
