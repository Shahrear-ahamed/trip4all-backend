'use strict'
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected)
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next())
    })
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FeedbackController = void 0
const http_status_1 = __importDefault(require('http-status'))
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const feedback_service_1 = require('./feedback.service')
const pick_1 = __importDefault(require('../../../shared/pick'))
const panigation_1 = require('../../../constants/panigation')
// Your controller code here
// create a new feedback
const createFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body
    const result =
      yield feedback_service_1.FeedbackService.createFeedback(payload)
    // send response after create feedback
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.CREATED,
      success: true,
      message: 'Feedback created successfully',
      data: result,
    })
  }),
)
// get a feedback
const getFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield feedback_service_1.FeedbackService.getFeedback(id)
    // send response after create feedback
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback retrieved successfully',
      data: result,
    })
  }),
)
// get all feedbacks
const getAllFeedbacks = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // date time range
    const { startDate, endDate } = req.query
    // Convert query parameters to Date objects
    const startDateObj = startDate ? new Date(startDate.toString()) : null
    const endDateObj = endDate ? new Date(endDate.toString()) : null
    // Use an object to represent the date range
    const dateRange = {
      startDate: startDateObj,
      endDate: endDateObj,
    }
    // pagination options
    const paginationOptions = (0, pick_1.default)(
      req.query,
      panigation_1.paginationFields,
    )
    const result = yield feedback_service_1.FeedbackService.getAllFeedbacks(
      paginationOptions,
      dateRange,
    )
    // send response after create feedback
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback retrieved successfully',
      data: result,
    })
  }),
)
// delete a feedback
const deleteFeedback = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield feedback_service_1.FeedbackService.deleteFeedback(id)
    // send response after create feedback
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Feedback deleted successfully',
      data: result,
    })
  }),
)
exports.FeedbackController = {
  createFeedback,
  getFeedback,
  getAllFeedbacks,
  deleteFeedback,
}
