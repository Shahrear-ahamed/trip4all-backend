"use strict";
// Define your validations here
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
// create blog zod schema validation
const createBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().max(255),
        body: zod_1.z.string(),
        tagId: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().url().optional(),
    }),
});
// update blog zod schema validation
const updateBlogZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().max(255).optional(),
        body: zod_1.z.string().optional(),
        tagIds: zod_1.z.string().optional(),
        thumbnail: zod_1.z.string().url().optional(),
    }),
});
exports.BlogValidation = {
    createBlogZodSchema,
    updateBlogZodSchema,
};
