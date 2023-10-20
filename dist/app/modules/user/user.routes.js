'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.UserRoutes = void 0
const express_1 = __importDefault(require('express'))
const user_controller_1 = require('./user.controller')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const user_validation_1 = require('./user.validation')
// Define your routes here
const router = express_1.default.Router()
// get my profile
router.get(
  '/me',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  user_controller_1.UserController.getMyProfile,
)
// update my profile
router.put(
  '/me',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
    userRole_1.ENUM_USER_ROLE.USER,
  ),
  (0, validateRequest_1.default)(
    user_validation_1.ProfileValidation.updateProfileZodSchema,
  ),
  user_controller_1.UserController.updateMyProfile,
)
exports.UserRoutes = router
