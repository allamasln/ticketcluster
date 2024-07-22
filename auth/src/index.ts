import mongoose from 'mongoose'
import { app } from './app'

const PORT = 3000

const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
    console.log('MongoDB connected')

    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

start()
