import express from 'express'

const router = express.Router()

router.get('/currentuser', (req, res) => {
  res.json({ message: 'Rafa' })
})

export { router as currentUserRouter }
