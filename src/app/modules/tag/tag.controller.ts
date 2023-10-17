import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { TagService } from './tag.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/panigation'
// Your controller code here

// create tag
const createTag = catchAsync(async (req, res) => {
  const payload = req.body
  const result = await TagService.createTag(payload)

  // send response after create tag
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag created successfully',
    data: result,
  })
})

// get all tags
const getAllTags = catchAsync(async (req, res) => {
  const paginationOptions = pick(req.query, paginationFields)

  const result = await TagService.getAllTags(paginationOptions)

  // send response after create tag
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All tags retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get single tag
const getATag = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await TagService.getATag(id)

  // send response after create tag
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single tag retrieved successfully',
    data: result,
  })
})

// update tag
const updateTag = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body

  const result = await TagService.updateTag(id, body)

  // send response after create tag
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single tag updated successfully',
    data: result,
  })
})

// delete tag
const deleteTag = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await TagService.deleteTag(id)

  // send response after create tag
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Tag deleted successfully',
    data: result,
  })
})

export const TagController = {
  createTag,
  getAllTags,
  getATag,
  updateTag,
  deleteTag,
}
