import { Schema, model, Document, Model } from 'mongoose'
import { Password } from '../services/password'

interface UserAttributes {
  email: string
  password: string
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument
}

interface UserDocument extends UserAttributes, Document {}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.build = (args: UserAttributes) => {
  return new User(args)
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await Password.toHash(this.password)

  next()
})

const User = model<UserDocument, UserModel>('User', userSchema)

export { User }
