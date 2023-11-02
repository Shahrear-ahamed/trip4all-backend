import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enum/userRole'

// Define your routes here
const router = express.Router()

// api end points for auth

// sign-up
router.post(
  '/sign-up',
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp,
)

// sign-in
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signInZodSchema),
  AuthController.signIn,
)

// create user by admin
router.post(
  '/create-user',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AuthValidation.signUpZodSchema),
  AuthController.signUp,
)

// refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.getAccessToken,
)

// verify email
// router.get('/verify-email', AuthController.verifyEmail)

// change password
router.post(
  '/change-password',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.USER),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
)

export const AuthRoutes = router
