import { z } from "zod";
import { Types } from "mongoose";

export const createBorrowZodSchema = z.object({
  book: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid book ID",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int("Quantity must be an integer")
    .min(1, "Quantity must be at least 1"),
  dueDate: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Due date must be in the future",
  }),
});
