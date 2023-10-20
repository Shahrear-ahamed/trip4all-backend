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
exports.TagController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const tag_service_1 = require("./tag.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const panigation_1 = require("../../../constants/panigation");
// Your controller code here
// create tag
const createTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield tag_service_1.TagService.createTag(payload);
    // send response after create tag
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tag created successfully',
        data: result,
    });
}));
// get all tags
const getAllTags = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, panigation_1.paginationFields);
    const result = yield tag_service_1.TagService.getAllTags(paginationOptions);
    // send response after create tag
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All tags retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get single tag
const getATag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tag_service_1.TagService.getATag(id);
    // send response after create tag
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single tag retrieved successfully',
        data: result,
    });
}));
// update tag
const updateTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = req.body;
    const result = yield tag_service_1.TagService.updateTag(id, body);
    // send response after create tag
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single tag updated successfully',
        data: result,
    });
}));
// delete tag
const deleteTag = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield tag_service_1.TagService.deleteTag(id);
    // send response after create tag
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Tag deleted successfully',
        data: result,
    });
}));
exports.TagController = {
    createTag,
    getAllTags,
    getATag,
    updateTag,
    deleteTag,
};
