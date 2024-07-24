import express from 'express'
import { requireAuth } from '../middlewares/require-auth'

const router = express.Router()

router.get('/currentuser', requireAuth, (req, res) => {
  res.json({ currentUser: req.user })
})

export { router as currentUserRouter }
