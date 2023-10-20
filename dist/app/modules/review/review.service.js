"use strict";
// Your service code here
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
exports.ReviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../utils/paginationHelper");
// create a new review
const createReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.create({
        data: {
            profileId: id,
            serviceId: payload.serviceId,
            comment: payload.comment,
            rating: payload.rating,
        },
    });
    return result;
});
// create a new review
const getAllReviews = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // pagination options extraction
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    // get the search query
    const result = yield prisma_1.default.review.findMany({
        skip,
        take: limit,
        where: {},
        orderBy: {
            createdAt: 'desc',
        },
    });
    // total reviews
    const total = yield prisma_1.default.review.count({
        where: {},
    });
    const totalPage = Math.ceil(total / limit);
    // return the result
    return {
        meta: {
            total,
            page,
            limit,
            totalPage,
        },
        data: result,
    };
});
// create a new review
const getAReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
    });
    return result;
});
// update a review
const updateReview = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.update({
        where: {
            id,
        },
        data: {
            serviceId: payload.serviceId,
            comment: payload.comment,
            rating: payload.rating,
        },
    });
    return result;
});
// delete a review
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.review.delete({
        where: {
            id,
        },
    });
});
// my reviews
const getMyReviews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        where: {
            profileId: id,
        },
    });
    return result;
});
exports.ReviewService = {
    createReview,
    getAllReviews,
    getAReview,
    updateReview,
    deleteReview,
    getMyReviews,
};
