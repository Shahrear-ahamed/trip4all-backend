import express from 'express'
import { BookingController } from './booking.controller'
import validateRequest from '../../middlewares/validateRequest'
import { BookingValidation } from './booking.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'

// Define your routes here
const router = express.Router()

// create booking
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.createBookingZodSchema),
  BookingController.createBooking,
)

// get all bookings
router.get('/', auth(ENUM_USER_ROLE.ADMIN), BookingController.getAllBookings)

// get booking by id
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getBookingById,
)

// update booking
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(BookingValidation.updateCategoryZodSchema),
  BookingController.updateBooking,
)

// delete booking
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  BookingController.deleteBooking,
)

// get all bookings by status
router.get(
  '/book-status/:status',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  BookingController.getAllBookingsByStatus,
)

// get my bookings
router.get(
  '/my-bookings',
  auth(ENUM_USER_ROLE.USER),
  BookingController.myBookings,
)

export const BookingRoutes = router
