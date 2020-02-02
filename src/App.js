import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'

import database from './config/database'
import routes from './routes'

class App {

  constructor() {
    this.app = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database() {
    mongoose.connect( database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    } )
    .then( () => console.log( 'Conectado com sucesso' ) )
    .catch( error => console.log( error ) )
  }

  middlewares() {
    this.app.use( express.json() )
    this.app.use( '/files', express.static( 
      path.resolve( __dirname, '..', 'uploads' )
    ) )
    this.app.use( cors() )
  }

  routes() {
    this.app.use( routes )
  }

}

export default new App().app
