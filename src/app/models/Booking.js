import { model, Schema } from 'mongoose'

const Booking = new Schema( {
  date: String,
  approved: Boolean,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  spot: {
    type: Schema.Types.ObjectId,
    ref: 'Spot'
  }
}, {
  timestamps: true
} )

export default model( 'Booking', Booking )