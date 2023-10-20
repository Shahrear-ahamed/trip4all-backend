"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const booking_service_1 = require("./booking.service");
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const panigation_1 = require("../../../constants/panigation");
// Your controller code here
// Your controller code here
const createBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profileId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const body = req.body;
    const result = yield booking_service_1.BookingService.createBooking(profileId, body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Create booking successfully',
        data: result,
    });
}));
// get all bookings
const getAllBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, panigation_1.paginationFields);
    const result = yield booking_service_1.BookingService.getAllBookings(paginationOptions);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved all bookings successfully',
        data: result,
    });
}));
const getBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield booking_service_1.BookingService.getBookingById(body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved service successfully',
        data: result,
    });
}));
const updateBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield booking_service_1.BookingService.updateBooking(id, body);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Update service successfully',
        data: result,
    });
}));
const deleteBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield booking_service_1.BookingService.deleteBooking(id);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Delete service successfully',
        data: result,
    });
}));
// get service by status
const getAllBookingsByStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.status;
    const paginationOptions = (0, pick_1.default)(req.query, panigation_1.paginationFields);
    const result = yield booking_service_1.BookingService.getAllBookingsByStatus(status, paginationOptions);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: `Retrieved ${status} service successfully`,
        data: result,
    });
}));
// my bookings
const myBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const profileId = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id;
    const result = yield booking_service_1.BookingService.myBookings(profileId);
    // send response
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Retrieved my bookings successfully',
        data: result,
    });
}));
exports.BookingController = {
    createBooking,
    updateBooking,
    getAllBookingsByStatus,
    getAllBookings,
    getBookingById,
    deleteBooking,
    myBookings,
};
