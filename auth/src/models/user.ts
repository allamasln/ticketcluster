import { Schema, model, Document, Model } from 'mongoose'
import { Password } from '../services/password'
import jwt from 'jsonwebtoken'

interface UserAttributes {
  email: string
  password: string
}

interface UserModel extends Model<UserDocument> {
  build(attrs: UserAttributes): UserDocument
}

interface UserDocument extends UserAttributes, Document {
  generateJWT(): string
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        delete ret.password
        delete ret.__v
      },
    },
  },
)

userSchema.statics.build = (args: UserAttributes) => {
  return new User(args)
}

userSchema.pre('save', async function (next) {
  if (this.isModified('password'))
    this.password = await Password.toHash(this.password)

  next()
})

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this.id, email: this.email },
    process.env.JWT_SECRET!, // `!` Checked at bootstrap
  )
}

const User = model<UserDocument, UserModel>('User', userSchema)

export { User }
