import express from 'express'
import { BlogController } from './blog.controller'
import validateRequest from '../../middlewares/validateRequest'
import { BlogValidation } from './blog.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'

// Define your routes here
const router = express.Router()

// create a blog router
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.createBlogZodSchema),
  BlogController.createBlog,
)

// get all blogs router
router.get('/', BlogController.getAllBlogs)

//for read blog by slug
router.get('/:slug', BlogController.getBlogBySlug)

// get a blog router update this blog
router.get('/:id', BlogController.getABlog)

// update a blog router
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(BlogValidation.updateBlogZodSchema),
  BlogController.updateBlog,
)

// delete a blog router
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BlogController.deleteBlog,
)

export const BlogRoutes = router
