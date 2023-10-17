import express from 'express'
import { FaqController } from './faq.controller'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { FaqValidation } from './faq.validation'
import { ENUM_USER_ROLE } from '../../../enum/userRole'

// Define your routes here
const router = express.Router()

// this routes for all user and public, because this will be shown in the frontend and home or faq page

// get faqs for home page
router.get('/home', FaqController.homeFaq)

// this routes for only super admin and admin because of using this routes they can find or update and delete

// get faqs with pagination (need this for admin panel)
router.get(
  '/',
  //   auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.getFaqs,
)

// create faq
router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FaqValidation.createFaqZodSchema),
  FaqController.createFaq,
)

// get single faq
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.getFaqs,
)

// update faq
router.put(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(FaqValidation.createFaqZodSchema),
  FaqController.getFaqs,
)

// delete faq
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FaqController.getFaqs,
)

export const FaqRoutes = router
