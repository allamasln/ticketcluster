import express from 'express'

const router = express.Router()

router.post('/signout', (req, res) => {
  res.json({ message: 'Logout' })
})

export { router as signoutRouter }
