import Spot from './../models/Spot'
import User from './../models/User'
import fs from 'fs'

class SpotController {


  async index( request, response ) {
    const { tech } = request.query

    try {
      const spots = await Spot.find( { techs: tech } )

      if( !spots ) {
        return response.status( 404 ).json( {
          message: 'Não foi encontrado nenhum Spot com essa combinção'
        } )
      }

      return response.status( 201 ).json( spots )
    } catch (error) {
      return response.status( 400 ).json( {
        message: 'Erro ao retornar os Spots'
      } )
    }
  }

  async store( request, response ) {

    const { filename } = request.file
    const { company, price, techs } = request.body
    const { user_id } = request.headers

    const techsArray = techs.split( ',' ).map( tech => tech.trim() )

    try {
      const user = await User.findById( user_id )

      if( !user ) {

        fs.unlinkSync( request.file.path )
        return response.status( 400 ).json( {
          message: 'Esse usuário não existe'
        } )
      }

      const spot = await Spot.create( {
        thumbnail: filename,
        company,
        price,
        techs: techsArray,
        user: user_id
      } )
      return response.status( 201 ).json( spot )
    } catch (error) {

      fs.unlinkSync( request.file.path )
      return response.status( 400 ).json( {
        message: 'Erro ao cadastrar o Spot'
      } )
    }
    
  }

}

export default new SpotController()