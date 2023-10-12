import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { FeedbackService } from './feedback.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/panigation'
import { IDateRange } from './feedback.interfaces'
// Your controller code here

// create a new feedback
const createFeedback = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await FeedbackService.createFeedback(payload)

  // send response after create feedback
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Feedback created successfully',
    data: result,
  })
})

// get a feedback
const getFeedback = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await FeedbackService.getFeedback(id)

  // send response after create feedback
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieved successfully',
    data: result,
  })
})

// get all feedbacks
const getAllFeedbacks = catchAsync(async (req, res) => {
  // date time range
  const { startDate, endDate } = req.query

  // Convert query parameters to Date objects
  const startDateObj = startDate ? new Date(startDate.toString()) : null
  const endDateObj = endDate ? new Date(endDate.toString()) : null

  // Use an object to represent the date range
  const dateRange: IDateRange = {
    startDate: startDateObj,
    endDate: endDateObj,
  }

  // pagination options
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FeedbackService.getAllFeedbacks(
    paginationOptions,
    dateRange,
  )

  // send response after create feedback
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback retrieved successfully',
    data: result,
  })
})

// delete a feedback
const deleteFeedback = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await FeedbackService.deleteFeedback(id)

  // send response after create feedback
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feedback deleted successfully',
    data: result,
  })
})

export const FeedbackController = {
  createFeedback,
  getFeedback,
  getAllFeedbacks,
  deleteFeedback,
}
