import User from './../models/User'

class LoginController {

  async store( request, response ) {
    const { email } = request.body

    try {
      let user = await User.findOne( { email } )

      if( !user ) {
        user = await User.create( { email } )
      }
      
      return response.status( 201 ).json( user )
    } catch (error) {
      return response.status( 400 ).json( {
        message: 'Erro ao cadastrar usuário'
      } )
    }    
  }

}

export default new LoginController()