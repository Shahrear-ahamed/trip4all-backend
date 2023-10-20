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
exports.CategoryService = void 0
const prisma_1 = __importDefault(require('../../../shared/prisma'))
const createCategory = body =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Your code here
    const category = yield prisma_1.default.category.create({
      data: body,
    })
    return category
  })
const getAllCategories = () =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Your code here
    const categories = yield prisma_1.default.category.findMany()
    return categories
  })
const getCategoryById = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Your code here
    const category = yield prisma_1.default.category.findUnique({
      where: {
        id,
      },
    })
    return category
  })
const updateCategory = (id, body) =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Your code here
    const category = yield prisma_1.default.category.update({
      where: {
        id,
      },
      data: body,
    })
    return category
  })
const deleteCategory = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    // Your code here
    const category = yield prisma_1.default.category.delete({
      where: {
        id,
      },
    })
    return category
  })
exports.CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
