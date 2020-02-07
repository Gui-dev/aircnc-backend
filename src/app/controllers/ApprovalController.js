import Booking from './../models/Booking'

class ApprovalController {

  async store( request,  response ) {

    const { booking_id } = request.params

    try {
      const booking = await Booking.findById( booking_id ).populate( 'spot' )
      booking.approved = true
      await booking.save()

      const bookingUserSocket = request.connectedUsers[ booking.user ]

      if( bookingUserSocket ) {
        request.io.to( bookingUserSocket ).emit( 'booking_response', booking )
      } 

      return response.status( 201 ).json( booking )
    } catch (error) {
      return response.status( 400 ).json( { 
        message: 'Erro ao solicitar uma reserva'
      } )  
    }
    
  }
}

export default new ApprovalController()