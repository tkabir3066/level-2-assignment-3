"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrowZodSchema = void 0;
const zod_1 = require("zod");
const mongoose_1 = require("mongoose");
exports.createBorrowZodSchema = zod_1.z.object({
    book: zod_1.z.string().refine((val) => mongoose_1.Types.ObjectId.isValid(val), {
        message: "Invalid book ID",
    }),
    quantity: zod_1.z
        .number({
        required_error: "Quantity is required",
        invalid_type_error: "Quantity must be a number",
    })
        .int("Quantity must be an integer")
        .min(1, "Quantity must be at least 1"),
    dueDate: zod_1.z.string().refine((val) => new Date(val) > new Date(), {
        message: "Due date must be in the future",
    }),
});
