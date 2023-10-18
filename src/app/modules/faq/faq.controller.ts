import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { FaqService } from './faq.service'
import { paginationFields } from '../../../constants/panigation'
import pick from '../../../shared/pick'
import { faqFilterableFields } from './faq.constants'
// Your controller code here

// this routes for all user and public, because this will be shown in the frontend and home or faq page

// get faqs for home page
const homeFaq = catchAsync(async (req, res) => {
  const limit = 6
  const result = await FaqService.publicFaqs(limit)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Home faqs retrieved successfully',
    data: result,
  })
})

// this routes for only super admin and admin because of using this routes they can find or update and delete

// create faq
const createFaq = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await FaqService.createFaq(payload)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq created successfully',
    data: result,
  })
})

// get all faqs
const getFaqs = catchAsync(async (req, res) => {
  const filters = pick(req.query, faqFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FaqService.getFaqs(filters, paginationOptions)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All faqs retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get single faq
const getSingleFaq = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await FaqService.getSingleFaq(id)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single faq retrieved successfully',
    data: result,
  })
})

// update faq
const updateFaq = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await FaqService.updateFaq(id, body)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single faq updated successfully',
    data: result,
  })
})

// delete faq
const deleteFaq = catchAsync(async (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  const result = await FaqService.deleteFaq(id)

  // send response after create faq
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faq deleted successfully',
    data: result,
  })
})

export const FaqController = {
  homeFaq,
  createFaq,
  getFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
}
