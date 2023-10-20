'use strict'
// Your service code here
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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.FaqService = void 0
const prisma_1 = __importDefault(require('../../../shared/prisma'))
const ApiError_1 = __importDefault(require('../../../errors/ApiError'))
const http_status_1 = __importDefault(require('http-status'))
const paginationHelper_1 = require('../../../utils/paginationHelper')
const faq_constants_1 = require('./faq.constants')
// this routes for all user and public, because this will be shown in the frontend and home or faq page
// public faqs
const publicFaqs = limit =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.findMany({
      where: { isActive: true },
      take: limit,
    })
    return result
  })
// this routes for only super admin and admin because of using this routes they can find or update and delete
// create a new faq
const createFaq = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.create({
      data: payload,
    })
    return result
  })
// get faqs
const getFaqs = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // extract searchTerm for implement search query from filters
    const { searchTerm } = filters,
      filtersData = __rest(
        filters,
        // extract pagination options
        ['searchTerm'],
      )
    // extract pagination options
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      )
    // and conditions for search and filters
    const andConditions = []
    // search needs (OR) for searching in specified fields
    if (searchTerm) {
      andConditions.push({
        OR: faq_constants_1.faqSearchableFields.map(field => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
      })
    }
    // if user search with some properties
    if (Object.keys(filtersData).length) {
      andConditions.push({
        AND: Object.entries(filtersData).map(([field, value]) => ({
          [field]: {
            contains: value,
            mode: 'insensitive',
          },
        })),
      })
    }
    // where conditions for search and filters
    const whereConditions =
      andConditions.length > 0 ? { AND: andConditions } : {}
    // get  faqs by search and filters
    const result = yield prisma_1.default.faq.findMany({
      where: whereConditions,
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
    const total = yield prisma_1.default.faq.count({
      where: whereConditions,
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
// get single faq
const getSingleFaq = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.findUnique({
      where: { id },
    })
    if (!result)
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        'Faq not found',
      )
    return result
  })
// update faq
const updateFaq = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.faq.update({
      where: { id },
      data: payload,
    })
    return result
  })
// delete faq
const deleteFaq = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.faq.delete({
      where: { id },
    })
  })
exports.FaqService = {
  publicFaqs,
  createFaq,
  getFaqs,
  getSingleFaq,
  updateFaq,
  deleteFaq,
}
