import Booking from './../models/Booking'

class BookingController {

  async store( request, response ) {
    const { user_id } = request.headers
    const { spot_id } = request.params
    const { date } = request.body

    try {
      const booking = await Booking.create( {
        date,
        user: user_id,
        spot: spot_id
      } )

      await booking.populate( 'spot' ).populate( 'user' ).execPopulate()

      const ownerSocket = request.connectedUsers[ booking.spot.user ]

      if( ownerSocket ) {
        request.io.to( ownerSocket ).emit( 'booking_request', booking )
      }

      return response.status( 201 ).json( booking )
    } catch (error) {
      return response.status( 400 ).json( {
        message: 'Não foi possível fazer a reserva'
      } )
    }
  }

}

export default new BookingController()