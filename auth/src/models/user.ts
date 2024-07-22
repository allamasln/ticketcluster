import { Schema, model, Document, Model } from 'mongoose'

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
const User = model<UserDocument, UserModel>('User', userSchema)

export { User }
