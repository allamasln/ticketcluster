import express from 'express'

const router = express.Router()

router.post('/signin', (req, res) => {
  res.json({ message: 'Login' })
})

export { router as signinRouter }
