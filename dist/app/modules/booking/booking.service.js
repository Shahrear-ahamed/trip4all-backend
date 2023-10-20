'use strict'
// Your service code here
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.BookingService = void 0
const prisma_1 = __importDefault(require('../../../shared/prisma'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const paginationHelper_1 = require('../../../utils/paginationHelper')
// create new booking
const createBooking = (profileId, bookingData) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const cartId = yield prisma_1.default.cart.findUnique({
      where: {
        profileId,
      },
    })
    if (!cartId) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Cart not found',
      )
    }
    const service = yield prisma_1.default.service.findUnique({
      where: {
        id: bookingData.serviceId,
      },
    })
    if (!service) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Service not found',
      )
    }
    const booking = yield prisma_1.default.booking.create({
      data: {
        cartId: cartId.id,
        profileId,
        serviceId: bookingData.serviceId,
        date: service.availableDate,
      },
    })
    return booking
  })
const updateBooking = (bookingId, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: payload.status,
      },
    })
    return booking
  })
// get all bookings by status
const getAllBookingsByStatus = (status, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // extract pagination options
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      )
    const result = yield prisma_1.default.booking.findMany({
      where: {
        status,
      },
      skip,
      take: limit,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
    })
    // get total count of faqs by pagination options
    const total = yield prisma_1.default.booking.count({
      where: {
        status,
      },
    })
    const totalPage = Math.ceil(total / limit)
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: result,
    }
  })
// get all bookings
const getAllBookings = paginationOptions =>
  __awaiter(void 0, void 0, void 0, function* () {
    // extract pagination options
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      )
    const result = yield prisma_1.default.booking.findMany({
      skip,
      take: limit,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
    })
    // get total count of faqs by pagination options
    const total = yield prisma_1.default.booking.count()
    const totalPage = Math.ceil(total / limit)
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: result,
    }
  })
// get single booking by id
const getBookingById = bookingId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.findUnique({
      where: {
        id: bookingId,
      },
    })
    return booking
  })
const deleteBooking = bookingId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.delete({
      where: {
        id: bookingId,
      },
    })
    return booking
  })
const myBookings = profileId =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
      where: {
        profileId,
      },
    })
    return result
  })
exports.BookingService = {
  createBooking,
  getAllBookingsByStatus,
  getAllBookings,
  updateBooking,
  deleteBooking,
  getBookingById,
  myBookings,
}
