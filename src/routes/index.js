import { Router } from 'express'
import multer from 'multer'
const routes = Router()

import uploadConfig from './../config/upload'
import Login from './../app/controllers/LoginController'
import Spot from './../app/controllers/SpotController'
import Dashboard from './../app/controllers/DashboardController'
import Booking from './../app/controllers/BookingController'

const upload = multer( uploadConfig )

routes.post( '/login', Login.store )

routes.get( '/spots', Spot.index )
routes.post( '/spots', upload.single( 'thumbnail' ), Spot.store )

routes.get( '/dashboard', Dashboard.show )

routes.post( '/spots/:spot_id/bookings', Booking.store )

export default routes