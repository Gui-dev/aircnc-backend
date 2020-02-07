import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import socket from 'socket.io'
import http from 'http'

import database from './config/database'
import routes from './routes'

class App {

  constructor() {
    this.app = express()
    this.server = http.Server( this.app )
    this.io = socket( this.server )
    this.connectedUsers = {}

    this.database()
    this.socketIO()
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

  socketIO() {
    this.io.on( 'connection', socket => {      
      const { user_id } = socket.handshake.query 
      this.connectedUsers[ user_id ] = socket.id
    } )
  }

  middlewares() {
    this.app.use( express.json() )
    this.app.use( '/files', express.static( 
      path.resolve( __dirname, '..', 'uploads' )
    ) )
    this.app.use( cors() )

    this.app.use( ( request, response, next ) => {
      request.io = this.io
      request.connectedUsers =this.connectedUsers
      return next()
    } )
  }

  routes() {
    this.app.use( routes )
  }

}

export default new App().server
