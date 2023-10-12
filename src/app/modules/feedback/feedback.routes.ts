import express from 'express'
import { FeedbackController } from './feedback.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'
import validateRequest from '../../middlewares/validateRequest'
import { FeedbackValidation } from './feedback.validation'

// Define your routes here
const router = express.Router()

// create a feedback
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(FeedbackValidation.createFeedbackZodSchema),
  FeedbackController.createFeedback,
)

// get all feedbacks
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.getAllFeedbacks,
)

// get single feedback
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.getFeedback,
)

// delete a feedback
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FeedbackController.deleteFeedback,
)

export const FeedbackRoutes = router
