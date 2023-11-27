import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { BlogService } from './blog.service'
import pick from '../../../shared/pick'
import { paginationFields } from '../../../constants/panigation'
import { blogFilterableFields } from './blog.constants'
// Your controller code here

// create a new blog
const createBlog = catchAsync(async (req, res) => {
  //get user id and blog payload
  const profileId = req?.user?.id
  const body = req.body

  // create blog
  const result = await BlogService.createBlog(profileId, body)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  })
})

// get all blogs with pagination
const getAllBlogs = catchAsync(async (req, res) => {
  // get filters
  const filters = pick(req.query, blogFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)

  // create blog
  const result = await BlogService.getAllBlogs(filters, paginationOptions)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All blogs retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

// get a blog by slug
const getBlogBySlug = catchAsync(async (req, res) => {
  // get blog slug
  const slugId = req.params.slug

  // get blog
  const result = await BlogService.getBlogBySlug(slugId)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog by slug retrieved successfully',
    data: result,
  })
})

// get a blog
const getABlog = catchAsync(async (req, res) => {
  // get blog id
  const id = req.params.id

  // create blog
  const result = await BlogService.getABlog(id)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single blog retrieved successfully',
    data: result,
  })
})

// update a blog
const updateBlog = catchAsync(async (req, res) => {
  // get blog id and payload
  const id = req.params.id
  const payload = req.body

  // create blog
  const result = await BlogService.updateBlog(id, payload)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  })
})

// delete a blog
const deleteBlog = catchAsync(async (req, res) => {
  // get blog id
  const id = req.params.id

  // create blog
  const result = await BlogService.deleteBlog(id)

  // send response after create blog post
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  })
})

export const BlogController = {
  createBlog,
  getABlog,
  getBlogBySlug,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
