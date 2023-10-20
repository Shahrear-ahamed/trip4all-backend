"use strict";
// Define your validations here
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagValidation = void 0;
const zod_1 = require("zod");
// create tag zod schema validation
const createTagZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3),
    }),
});
// update tag zod schema validation
const updateTagZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3),
    }),
});
exports.TagValidation = {
    createTagZodSchema,
    updateTagZodSchema,
};
