import Spot from './../models/Spot'

class DashboardController {

  async show( request, response ) {

    const { user_id } = request.headers

    try {
      const spots = await Spot.find( { user: user_id } )

      if( !spots ) {
        return response.status( 404 ).json( {
          message: 'Não foi encontrado nenhum usuário'
        } )
      }

      return response.status( 201 ).json( spots )
    } catch (error) {
      return response.status( 400 ).json( {
        message: 'Erro ao buscar usuários'
      } )
    }
  }
}

export default new DashboardController()