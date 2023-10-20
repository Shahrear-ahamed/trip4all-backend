import { ReviewService } from './review.service'
// Your controller code here
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../../constants/panigation'
import pick from '../../../shared/pick'

// create review
const createReview = catchAsync(async (req, res) => {
  const id = req.params.id
  const payload = req.body
  const result = await ReviewService.createReview(id, payload)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review created successfully',
    data: result,
  })
})

// get all review
const getAllReviews = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ReviewService.getAllReviews(paginationOptions)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All reviews retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get single review
const getAReview = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await ReviewService.getAReview(id)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single review retrieved successfully',
    data: result,
  })
})

// update review
const updateReview = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await ReviewService.updateReview(id, body)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single review updated successfully',
    data: result,
  })
})

// delete review
const deleteReview = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await ReviewService.deleteReview(id)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  })
})

// my reviews
const getMyReviews = catchAsync(async (req, res) => {
  const result = await ReviewService.getMyReviews(req?.user?.id)

  // send response after create review
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My reviews retrieved successfully',
    data: result,
  })
})

export const ReviewController = {
  createReview,
  getAllReviews,
  getAReview,
  updateReview,
  deleteReview,
  getMyReviews,
}
