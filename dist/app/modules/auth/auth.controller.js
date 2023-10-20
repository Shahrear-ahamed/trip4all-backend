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
exports.AuthController = void 0
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'))
const auth_service_1 = require('./auth.service')
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'))
const http_status_1 = __importDefault(require('http-status'))
const setCookie_1 = require('../../../shared/setCookie')
// Your controller code here
// sign up user controller
const signUp = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body
    console.log(body)
    const result = yield auth_service_1.AuthService.signUp(body)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.CREATED,
      message:
        'Register successfully, we send you an email to verify your account',
      data: result,
    })
  }),
)
// sign in user controller
const signIn = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body
    const _a = yield auth_service_1.AuthService.signIn(body),
      { refreshToken } = _a,
      result = __rest(_a, ['refreshToken'])
    // set refresh token to cookie
    setCookie_1.Cookie.setCookie(res, refreshToken, 7)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Login successfully',
      data: result,
    })
  }),
)
// refresh token and send access token controller
const getAccessToken = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken
    const result = yield auth_service_1.AuthService.getAccessToken(refreshToken)
    // set refresh token to cookie
    setCookie_1.Cookie.setCookie(res, refreshToken, 7)
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Login successfully',
      data: result,
    })
  }),
)
// change password controller
const changePassword = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    var _b
    const body = req.body
    const profileId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id
    const result = yield auth_service_1.AuthService.changePassword(
      profileId,
      body,
    )
    // send response
    ;(0, sendResponse_1.default)(res, {
      success: true,
      statusCode: http_status_1.default.OK,
      message: 'Password changed successfully',
      data: result,
    })
  }),
)
exports.AuthController = {
  signUp,
  signIn,
  getAccessToken,
  changePassword,
}
