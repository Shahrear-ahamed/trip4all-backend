import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { CategoryService } from './category.service'
// Your controller code here

// create a new category
const createCategory = catchAsync(async (req, res) => {
  const body = req.body

  // create category
  const result = await CategoryService.createCategory(body)

  // send response after create category
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  })
})

// get all categories
const getAllCategories = catchAsync(async (req, res) => {
  // get all categories
  const result = await CategoryService.getAllCategories()

  // send response after get all categories
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  })
})

// get category by id
const getCategoryById = catchAsync(async (req, res) => {
  const id = req.params.id

  // get category by id
  const result = await CategoryService.getCategoryById(id)

  // send response after get category by id
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category fetched successfully',
    data: result,
  })
})

// update category
const updateCategory = catchAsync(async (req, res) => {
  const id = req.params.id
  const body = req.body

  // update category
  const result = await CategoryService.updateCategory(id, body)

  // send response after update category
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  })
})

// delete category
const deleteCategory = catchAsync(async (req, res) => {
  const id = req.params.id

  // delete category
  const result = await CategoryService.deleteCategory(id)

  // send response after delete category
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  })
})

export const CategoryController = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
