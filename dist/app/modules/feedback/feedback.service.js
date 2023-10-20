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
exports.FeedbackService = void 0
// Your service code here
const luxon_1 = require('luxon')
const prisma_1 = __importDefault(require('../../../shared/prisma'))
const paginationHelper_1 = require('../../../utils/paginationHelper')
// create a new feedback
const createFeedback = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.create({
      data: payload,
    })
    return result
  })
// get all feedbacks
const getAllFeedbacks = (paginationOptions, dateRange) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // extract pagination options
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      )
    // Initialize where condition
    let whereCondition = {}
    // Apply date range filter if provided
    if (dateRange && dateRange.startDate && dateRange.endDate) {
      whereCondition = Object.assign(Object.assign({}, whereCondition), {
        createdAt: {
          gte: luxon_1.DateTime.fromJSDate(dateRange.startDate)
            .startOf('day')
            .toISO(),
          lte: luxon_1.DateTime.fromJSDate(dateRange.endDate)
            .endOf('day')
            .toISO(),
        },
      })
    }
    const result = yield prisma_1.default.feedback.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy:
        sortBy && sortOrder
          ? { [sortBy]: sortOrder }
          : {
              createdAt: 'desc',
            },
    })
    // get total count of faqs by search and filters
    const total = yield prisma_1.default.feedback.count({
      where: whereCondition,
    })
    const totalPage = Math.ceil(total / limit)
    return {
      meta: {
        page,
        limit,
        total,
        totalPage,
      },
      data: result,
    }
  })
// get single feedback
const getFeedback = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.feedback.findUnique({
      where: { id },
    })
    return result
  })
// delete feedback
const deleteFeedback = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.feedback.delete({
      where: { id },
    })
  })
exports.FeedbackService = {
  createFeedback,
  getFeedback,
  getAllFeedbacks,
  deleteFeedback,
}
