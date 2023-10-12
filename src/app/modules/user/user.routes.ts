import express from 'express'
import { UserController } from './user.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'
import validateRequest from '../../middlewares/validateRequest'
import { ProfileValidation } from './user.validation'

// Define your routes here
const router = express.Router()

// get my profile
router.get(
  '/me',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  UserController.getMyProfile,
)

// update my profile
router.put(
  '/me',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(ProfileValidation.updateProfileZodSchema),
  UserController.updateMyProfile,
)

export const UserRoutes = router
