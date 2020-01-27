import { model, Schema } from 'mongoose'

const User = new Schema( {
  email: String
} )

export default model( 'User', User )