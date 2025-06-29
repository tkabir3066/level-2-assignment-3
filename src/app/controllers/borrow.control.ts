import express, { NextFunction, Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";
import { createBorrowZodSchema } from "../utils/borrow-zod-Schema";

export const borrowRouter = express.Router();

//create borrow details
borrowRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = createBorrowZodSchema.parse(req.body);
      const { book, quantity, dueDate } = validatedData;

      //   Business logic handled via Book static method
      await Book.borrowBook(book, quantity);

      const borrowRecord = await Borrow.create({ book, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrowRecord,
      });
    } catch (error) {
      next(error);
    }
  }
);

//get borrow summary

borrowRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const summary = await Borrow.aggregate([
        {
          $group: {
            _id: "$book",
            totalQuantity: { $sum: "$quantity" },
          },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "_id",
            as: "bookDetails",
          },
        },
        {
          $unwind: "$bookDetails",
        },
        {
          $project: {
            _id: 0,
            book: {
              title: "$bookDetails.title",
              isbn: "$bookDetails.isbn",
            },
            totalQuantity: 1,
          },
        },
      ]);

      res.status(200).json({
        success: true,
        message: "Borrowed books summary retrieved successfully",
        data: summary,
      });
    } catch (error) {
      next(error);
    }
  }
);
