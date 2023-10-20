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
exports.ReviewController = void 0
const review_service_1 = require('./review.service')
// Your controller code here
const http_status_1 = __importDefault(require('http-status'))
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const panigation_1 = require('../../../constants/panigation')
const pick_1 = __importDefault(require('../../../shared/pick'))
// create review
const createReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const payload = req.body
    const result = yield review_service_1.ReviewService.createReview(
      id,
      payload,
    )
    // send response after create review
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Review created successfully',
      data: result,
    })
  }),
)
// get all review
const getAllReviews = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(
      req.query,
      panigation_1.paginationFields,
    )
    const result =
      yield review_service_1.ReviewService.getAllReviews(paginationOptions)
    // send response after create review
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'All reviews retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  }),
)
// get single review
const getAReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield review_service_1.ReviewService.getAReview(id)
    // send response after create review
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single review retrieved successfully',
      data: result,
    })
  }),
)
// update review
const updateReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const body = req.body
    const result = yield review_service_1.ReviewService.updateReview(id, body)
    // send response after create review
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Single review updated successfully',
      data: result,
    })
  }),
)
// delete review
const deleteReview = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield review_service_1.ReviewService.deleteReview(id)
    // send response after create review
    ;(0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Review deleted successfully',
      data: result,
    })
  }),
)
exports.ReviewController = {
  createReview,
  getAllReviews,
  getAReview,
  updateReview,
  deleteReview,
}
