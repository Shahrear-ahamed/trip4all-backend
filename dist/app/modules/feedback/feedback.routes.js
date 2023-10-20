'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FeedbackRoutes = void 0
const express_1 = __importDefault(require('express'))
const feedback_controller_1 = require('./feedback.controller')
const auth_1 = __importDefault(require('../../middlewares/auth'))
const userRole_1 = require('../../../enum/userRole')
const validateRequest_1 = __importDefault(
  require('../../middlewares/validateRequest'),
)
const feedback_validation_1 = require('./feedback.validation')
// Define your routes here
const router = express_1.default.Router()
// create a feedback
router.post(
  '/',
  (0, auth_1.default)(userRole_1.ENUM_USER_ROLE.USER),
  (0, validateRequest_1.default)(
    feedback_validation_1.FeedbackValidation.createFeedbackZodSchema,
  ),
  feedback_controller_1.FeedbackController.createFeedback,
)
// get all feedbacks
router.get(
  '/',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  feedback_controller_1.FeedbackController.getAllFeedbacks,
)
// get single feedback
router.get(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  feedback_controller_1.FeedbackController.getFeedback,
)
// delete a feedback
router.delete(
  '/:id',
  (0, auth_1.default)(
    userRole_1.ENUM_USER_ROLE.SUPER_ADMIN,
    userRole_1.ENUM_USER_ROLE.ADMIN,
  ),
  feedback_controller_1.FeedbackController.deleteFeedback,
)
exports.FeedbackRoutes = router
