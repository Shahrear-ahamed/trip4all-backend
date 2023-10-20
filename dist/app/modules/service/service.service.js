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
exports.ServiceService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../utils/paginationHelper");
const createService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.create({
        data: body,
    });
    return result;
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
    });
    return result;
});
const getAllServices = (paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // extract pagination options
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const result = yield prisma_1.default.service.findMany({
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
        skip,
        take: limit,
        orderBy: sortBy && sortOrder
            ? { [sortBy]: sortOrder }
            : {
                createdAt: 'desc',
            },
    });
    // get total count of faqs by search and filters
    const total = yield prisma_1.default.faq.count({});
    const totalPage = Math.ceil(total / limit);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
const updateService = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: body,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('id', id);
    return yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
});
const homeService = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield prisma_1.default.category.findMany({
        take: 4,
        orderBy: {
            createdAt: 'desc',
        },
    });
    console.log('categories', categories);
    // give me single services of each category
    const result = yield Promise.all(categories.map((category) => __awaiter(void 0, void 0, void 0, function* () {
        const service = yield prisma_1.default.service.findFirst({
            where: {
                categoryId: category.id,
            },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                availableDate: true,
                slots: true,
                thumbnail: true,
                status: true,
            },
        });
        return {
            catId: category.id,
            catName: category.name,
            service,
        };
    })));
    return result;
});
// service by status
const getServiceByStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findMany({
        take: 3,
        where: {
            status,
        },
        include: {
            category: {
                select: {
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
    return result;
});
exports.ServiceService = {
    createService,
    updateService,
    deleteService,
    getServiceById,
    getAllServices,
    homeService,
    getServiceByStatus,
};
