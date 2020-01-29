import { model, Schema } from 'mongoose'

const User = new Schema( {
  email: {
    type: String,
    unique: true
  }
}, {
  timestamps: true
} )

export default model( 'User', User )