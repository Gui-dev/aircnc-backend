import { Router } from 'express'
import multer from 'multer'
const routes = Router()

import uploadConfig from './../config/upload'
import Login from './../app/controllers/LoginController'
import Spot from './../app/controllers/SpotController'
import Dashboard from './../app/controllers/DashboardController'
import Booking from './../app/controllers/BookingController'
import Approval from './../app/controllers/ApprovalController'
import Rejection from './../app/controllers/RejectionController'

const upload = multer( uploadConfig )

routes.post( '/login', Login.store )

routes.get( '/spots', Spot.index )
routes.post( '/spots', upload.single( 'thumbnail' ), Spot.store )
routes.post( '/spots/:spot_id/bookings', Booking.store )

routes.get( '/dashboard', Dashboard.show )

routes.post( '/bookings/:booking_id/approvals', Approval.store )
routes.post( '/bookings/:booking_id/rejections', Rejection.store )

export default routes