import express from 'express'
import { CategoryController } from './category.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CategoryValidation } from './category.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'

// Define your routes here
const router = express.Router()

// create category
router.post(
  '/',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.createCategory,
)

// get all categories
router.get('/', auth(ENUM_USER_ROLE.ADMIN), CategoryController.getAllCategories)

// get category by id
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.getCategoryById,
)

// update category
router.put(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createCategoryZodSchema),
  CategoryController.updateCategory,
)

// delete category
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteCategory,
)

export const CategoryRoutes = router
