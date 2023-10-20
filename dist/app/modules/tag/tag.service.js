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
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.TagService = void 0
const prisma_1 = __importDefault(require('../../../shared/prisma'))
const paginationHelper_1 = require('../../../utils/paginationHelper')
const createTag = tag =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.tag.create({
      data: {
        name: tag.name,
      },
    })
    return result
  })
const getAllTags = paginationOptions =>
  __awaiter(void 0, void 0, void 0, function* () {
    // pagination options extraction
    const { page, limit, skip } =
      paginationHelper_1.paginationHelpers.calculatePagination(
        paginationOptions,
      )
    // get the search query
    const result = yield prisma_1.default.tag.findMany({
      skip,
      take: limit,
      where: {},
      orderBy: {
        createdAt: 'desc',
      },
    })
    // total tags
    const total = yield prisma_1.default.tag.count({
      where: {},
    })
    const totalPage = Math.ceil(total / limit)
    // return the result
    return {
      meta: {
        total,
        page,
        limit,
        totalPage,
      },
      data: result,
    }
  })
const getATag = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.tag.findUnique({
      where: {
        id,
      },
    })
    return result
  })
const updateTag = (id, tag) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.tag.update({
      where: {
        id,
      },
      data: {
        name: tag.name,
      },
    })
    return result
  })
const deleteTag = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.tag.delete({
      where: {
        id,
      },
    })
  })
exports.TagService = {
  createTag,
  getAllTags,
  getATag,
  updateTag,
  deleteTag,
}
