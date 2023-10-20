import express from 'express'
import { ReviewController } from './review.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'
import validateRequest from '../../middlewares/validateRequest'
import { ReviewValidation } from './review.validation'

// Define your routes here
const router = express.Router()

// create a new review
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
)

// get all reviews for admin, super admin but for user only get his/her reviews
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.getAllReviews,
)

// get single review
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  ReviewController.getAReview,
)

// update review
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.updateReview,
)

// delete review
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ReviewController.deleteReview,
)

// my reviews
router.get(
  '/my-reviews',
  auth(ENUM_USER_ROLE.USER),
  ReviewController.getMyReviews,
)

export const ReviewRoutes = router
