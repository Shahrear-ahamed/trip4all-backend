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
exports.BlogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const blog_service_1 = require("./blog.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const panigation_1 = require("../../../constants/panigation");
const blog_constants_1 = require("./blog.constants");
// Your controller code here
// create a new blog
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //get user id and blog payload
    const profileId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id;
    const body = req.body;
    // create blog
    const result = yield blog_service_1.BlogService.createBlog(profileId, body);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Blog created successfully',
        data: result,
    });
}));
// get all blogs with pagination
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get filters
    const filters = (0, pick_1.default)(req.query, blog_constants_1.blogFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, panigation_1.paginationFields);
    // create blog
    const result = yield blog_service_1.BlogService.getAllBlogs(filters, paginationOptions);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'All blogs retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// get a blog by slug
const getBlogBySlug = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get blog slug
    const slugId = req.params.slug;
    // get blog
    const result = yield blog_service_1.BlogService.getBlogBySlug(slugId);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single blog by slug retrieved successfully',
        data: result,
    });
}));
// get a blog
const getABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get blog id
    const id = req.params.id;
    // create blog
    const result = yield blog_service_1.BlogService.getABlog(id);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single blog retrieved successfully',
        data: result,
    });
}));
// update a blog
const updateBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get blog id and payload
    const id = req.params.id;
    const payload = req.body;
    // create blog
    const result = yield blog_service_1.BlogService.updateBlog(id, payload);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog updated successfully',
        data: result,
    });
}));
// delete a blog
const deleteBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get blog id
    const id = req.params.id;
    // create blog
    const result = yield blog_service_1.BlogService.deleteBlog(id);
    // send response after create blog post
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    });
}));
exports.BlogController = {
    createBlog,
    getABlog,
    getBlogBySlug,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
