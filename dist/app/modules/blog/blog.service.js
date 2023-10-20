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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const blog_constants_1 = require("./blog.constants");
const paginationHelper_1 = require("../../../utils/paginationHelper");
// create a new blog
const createBlog = (profileId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.create({
        data: {
            profileId,
            title: payload.title,
            slug: payload.slug,
            body: payload.body,
            tagId: payload.tagId,
            thumbnail: payload.thumbnail,
        },
    });
    // return after creation
    return result;
});
// get a blog by slug
const getBlogBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findUnique({
        where: {
            slug,
        },
    });
    // find next blog and previous blog
    const nextBlog = yield prisma_1.default.blog.findFirst({
        where: {
            createdAt: {
                gt: result === null || result === void 0 ? void 0 : result.createdAt,
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
    const previousBlog = yield prisma_1.default.blog.findFirst({
        where: {
            createdAt: {
                lt: result === null || result === void 0 ? void 0 : result.createdAt,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    const blogReturn = Object.assign(Object.assign({}, result), { nextBlog: nextBlog === null || nextBlog === void 0 ? void 0 : nextBlog.slug, previousBlog: previousBlog === null || previousBlog === void 0 ? void 0 : previousBlog.slug });
    // return after find a blog
    return blogReturn;
});
// get a blog
const getABlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.findUnique({
        where: {
            id,
        },
    });
    // return after find a blog
    return result;
});
// all blogs
const getAllBlogs = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // extract searchTerm for implement search query from filters
    const { searchTerm } = filters, filtersData = __rest(filters
    // extract pagination options
    , ["searchTerm"]);
    // extract pagination options
    const { limit, page, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    // and conditions for search and filters
    const andConditions = [];
    // search needs (OR) for searching in some specified fields
    if (searchTerm) {
        andConditions.push({
            OR: blog_constants_1.blogSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // filter data for search in specified fields using (AND)
    if (Object.keys(filtersData).length) {
        andConditions.push({
            AND: Object.entries(filtersData).map(([field, value]) => ({
                [field]: {
                    contains: value,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // where condition for search and filters
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    // get all blog posts
    const result = yield prisma_1.default.blog.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: 'desc' },
    });
    // total count blogs after search and filter or not
    const total = yield prisma_1.default.blog.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / 10);
    // return after find all blogs with pagination
    return {
        meta: {
            limit,
            page,
            total,
            totalPage,
        },
        data: result,
    };
});
// update a blog
const updateBlog = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.blog.update({
        where: {
            id,
        },
        data: {
            title: payload.title,
            body: payload.body,
            thumbnail: payload.thumbnail,
        },
    });
    // return after update
    return result;
});
// delete a blog
const deleteBlog = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // fully delete a blog
    return yield prisma_1.default.blog.delete({
        where: {
            id,
        },
    });
});
exports.BlogService = {
    createBlog,
    getABlog,
    getBlogBySlug,
    getAllBlogs,
    updateBlog,
    deleteBlog,
};
