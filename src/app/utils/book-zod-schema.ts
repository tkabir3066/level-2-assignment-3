import { z } from "zod";

export const bookZodSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  author: z.string().trim().min(1, "Author is required"),
  genre: z.enum([
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
  ]),
  isbn: z.string().trim().min(1, "ISBN is required"),
  description: z.string().optional(),
  copies: z
    .number()
    .int("Copies must be an integer")
    .min(0, "Copies must be a non-negative number"),
  available: z.boolean().optional(),
});
