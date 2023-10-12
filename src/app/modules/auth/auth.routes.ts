import express from 'express'
import { AuthController } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'

// Define your routes here
const router = express.Router()

// api end points for auth

// sign-up
router.post('/sign-up', AuthController.signUp)

// sign-in
router.post(
  '/sign-in',
  validateRequest(AuthValidation.signInValidation),
  AuthController.signIn,
)

export const AuthRoutes = router
