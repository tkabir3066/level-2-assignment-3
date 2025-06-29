"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookZodSchema = void 0;
const zod_1 = require("zod");
exports.bookZodSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1, "Title is required"),
    author: zod_1.z.string().trim().min(1, "Author is required"),
    genre: zod_1.z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ]),
    isbn: zod_1.z.string().trim().min(1, "ISBN is required"),
    description: zod_1.z.string().optional(),
    copies: zod_1.z
        .number()
        .int("Copies must be an integer")
        .min(0, "Copies must be a non-negative number"),
    available: zod_1.z.boolean().optional(),
});
