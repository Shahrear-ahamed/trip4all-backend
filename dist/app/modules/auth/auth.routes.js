'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.AuthRoutes = void 0
const express_1 = __importDefault(require('express'))
const auth_controller_1 = require('./auth.controller')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const auth_validation_1 = require('./auth.validation')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
// Define your routes here
const router = express_1.default.Router()
// api end points for auth
// sign-up
router.post(
  '/sign-up',
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.signUpZodSchema,
  ),
  auth_controller_1.AuthController.signUp,
)
// sign-in
router.post(
  '/sign-in',
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.signInZodSchema,
  ),
  auth_controller_1.AuthController.signIn,
)
// create user by admin
router.post(
  '/create-user',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.ADMIN),
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.signUpZodSchema,
  ),
  auth_controller_1.AuthController.signUp,
)
// refresh token
router.post(
  '/refresh-token',
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.refreshTokenZodSchema,
  ),
  auth_controller_1.AuthController.getAccessToken,
)
// verify email
// change password
router.post(
  '/change-password',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  (0, validateRequest_1.default)(
    auth_validation_1.AuthValidation.changePasswordZodSchema,
  ),
  auth_controller_1.AuthController.changePassword,
)
exports.AuthRoutes = router
