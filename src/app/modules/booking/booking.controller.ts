import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BookingService } from './booking.service'
import httpStatus from 'http-status'
import { Status } from '@prisma/client'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/panigation'
// Your controller code here

// Your controller code here
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const profileId = req?.user?.id
  const body = req.body
  const result = await BookingService.createBooking(profileId, body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Create booking successfully',
    data: result,
  })
})

// get all bookings
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields)
  const result = await BookingService.getAllBookings(paginationOptions)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved all bookings successfully',
    data: result,
  })
})

const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const body = req.body
  const result = await BookingService.getBookingById(body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved service successfully',
    data: result,
  })
})

const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const body = req.body
  const result = await BookingService.updateBooking(id, body)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update service successfully',
    data: result,
  })
})

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await BookingService.deleteBooking(id)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete service successfully',
    data: result,
  })
})

// get service by status
const getAllBookingsByStatus = catchAsync(
  async (req: Request, res: Response) => {
    const status = req.params.status
    const paginationOptions = pick(req.query, paginationFields)
    const result = await BookingService.getAllBookingsByStatus(
      status as Status,
      paginationOptions,
    )

    // send response
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: `Retrieved ${status} service successfully`,
      data: result,
    })
  },
)

// my bookings
const myBookings = catchAsync(async (req: Request, res: Response) => {
  const profileId = req?.user?.id
  const result = await BookingService.myBookings(profileId)

  // send response
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved my bookings successfully',
    data: result,
  })
})

export const BookingController = {
  createBooking,
  updateBooking,
  getAllBookingsByStatus,
  getAllBookings,
  getBookingById,
  deleteBooking,
  myBookings,
}
