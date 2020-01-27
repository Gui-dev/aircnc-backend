const { Router } = require( 'express' )
import { Router } from 'express'

const routes = Router()

routes.get( '/users', ( req, res ) => {
  res.send( 'Hello World' )
} )

export default routes