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
  timestamps: true,
  toJSON: {
    virtuals: true
  }
} )

Spot.virtual( 'thumbnail_url' ).get( function() {
  return `http://192.168.0.103:3333/files/${this.thumbnail}`
} )

export default model( 'Spot', Spot )