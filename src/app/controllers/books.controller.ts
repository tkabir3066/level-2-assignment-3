import express, { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";

export const booksRouter = express.Router();

//create a book
booksRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;

      const newBook = await Book.create(body);

      res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: newBook,
      });

      next();
    } catch (error) {
      next(error);
    }
  }
);

//get all books

booksRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        filter,
        sortBy = "createdAt",
        sort = "desc",
        limit = 10,
      } = req.query;

      const filteredBooks = filter ? { genre: filter } : {};
      const books = await Book.find(filteredBooks)
        .sort({ [sortBy as string]: sort === "asc" ? 1 : -1 })
        .limit(Number(limit));
      res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get Book by ID

booksRouter.get(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookId = req.params.bookId;

      const book = await Book.findById(bookId);
      if (!book) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
);
booksRouter.patch(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const bookId = req.params.bookId;

      const updatedBook = await Book.findByIdAndUpdate(bookId, body, {
        new: true,
      });

      if (!updatedBook) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: updatedBook,
      });
    } catch (error) {
      next(error);
    }
  }
);

//delete a book
booksRouter.delete(
  "/:bookId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId } = req.params;

      const deletedBook = await Book.findByIdAndDelete(bookId);

      if (!deletedBook) {
        res.status(404).json({
          success: false,
          message: "Book not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }
);
