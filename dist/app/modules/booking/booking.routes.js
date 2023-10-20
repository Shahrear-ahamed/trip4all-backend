'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BookingRoutes = void 0
const express_1 = __importDefault(require('express'))
const booking_controller_1 = require('./booking.controller')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const booking_validation_1 = require('./booking.validation')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
// Define your routes here
const router = express_1.default.Router()
// create booking
router.post(
  '/',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.USER),
  (0, validateRequest_1.default)(
    booking_validation_1.BookingValidation.createBookingZodSchema,
  ),
  booking_controller_1.BookingController.createBooking,
)
// get all bookings
router.get(
  '/',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  booking_controller_1.BookingController.getAllBookings,
)
// get booking by id
router.get(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  booking_controller_1.BookingController.getBookingById,
)
// update booking
router.patch(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  (0, validateRequest_1.default)(
    booking_validation_1.BookingValidation.updateCategoryZodSchema,
  ),
  booking_controller_1.BookingController.updateBooking,
)
// delete booking
router.delete(
  '/:id',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  booking_controller_1.BookingController.deleteBooking,
)
// get all bookings by status
router.get(
  '/book-status/:status',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  booking_controller_1.BookingController.getAllBookingsByStatus,
)
// get my bookings
router.get(
  '/my-bookings',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.USER),
  booking_controller_1.BookingController.myBookings,
)
exports.BookingRoutes = router
