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
exports.FaqController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const faq_service_1 = require("./faq.service");
const panigation_1 = require("../../../constants/panigation");
const pick_1 = __importDefault(require("../../../shared/pick"));
const faq_constants_1 = require("./faq.constants");
// Your controller code here
// this routes for all user and public, because this will be shown in the frontend and home or faq page
// get faqs for home page
const homeFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = 6;
    const result = yield faq_service_1.FaqService.publicFaqs(limit);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Home faqs retrieved successfully',
        data: result,
    });
}));
// this routes for only super admin and admin because of using this routes they can find or update and delete
// create faq
const createFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield faq_service_1.FaqService.createFaq(payload);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faq created successfully',
        data: result,
    });
}));
// get all faqs
const getFaqs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, faq_constants_1.faqFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, panigation_1.paginationFields);
    const result = yield faq_service_1.FaqService.getFaqs(filters, paginationOptions);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All faqs retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get single faq
const getSingleFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faq_service_1.FaqService.getSingleFaq(id);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single faq retrieved successfully',
        data: result,
    });
}));
// update faq
const updateFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield faq_service_1.FaqService.updateFaq(id, body);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single faq updated successfully',
        data: result,
    });
}));
// delete faq
const deleteFaq = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield faq_service_1.FaqService.deleteFaq(id);
    // send response after create faq
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Faq deleted successfully',
        data: result,
    });
}));
exports.FaqController = {
    homeFaq,
    createFaq,
    getFaqs,
    getSingleFaq,
    updateFaq,
    deleteFaq,
};
