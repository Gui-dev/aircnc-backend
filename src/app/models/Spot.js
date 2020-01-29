import { model, Schema } from 'mongoose'

const Spot = new Schema( {
  thumbnail: String,
  company: String,
  price: Number,
  techs: [ String ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
} )

export default model( 'Spot', Spot )