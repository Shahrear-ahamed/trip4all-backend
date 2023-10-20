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
exports.ServiceController = void 0
const http_status_1 = __importDefault(require('http-status'))
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const service_service_1 = require('./service.service')
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const panigation_1 = require('../../../constants/panigation')
const pick_1 = __importDefault(require('../../../shared/pick'))
// Your controller code here
const createService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body
    const result = yield service_service_1.ServiceService.createService(body)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.CREATED,
      message: 'Create service successfully',
      data: result,
    })
  }),
)
const getServiceById = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield service_service_1.ServiceService.getServiceById(id)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Retrieved service successfully',
      data: result,
    })
  }),
)
const getAllServices = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(
      req.query,
      panigation_1.paginationFields,
    )
    const result =
      yield service_service_1.ServiceService.getAllServices(paginationOptions)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Retrieved all service successfully',
      data: result,
    })
  }),
)
const updateService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const body = req.body
    const result = yield service_service_1.ServiceService.updateService(
      id,
      body,
    )
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Update service successfully',
      data: result,
    })
  }),
)
const deleteService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id
    const result = yield service_service_1.ServiceService.deleteService(id)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Delete service successfully',
      data: result,
    })
  }),
)
const homeService = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_service_1.ServiceService.homeService()
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Retrieved home service successfully',
      data: result,
    })
  }),
)
// get service by status
const getServiceByStatus = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status
    const result =
      yield service_service_1.ServiceService.getServiceByStatus(status)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: `Retrieved ${status} service successfully`,
      data: result,
    })
  }),
)
exports.ServiceController = {
  createService,
  updateService,
  deleteService,
  getServiceById,
  getAllServices,
  homeService,
  getServiceByStatus,
}
