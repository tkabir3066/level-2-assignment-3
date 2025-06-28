import mongoose, { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies must be a non-negative number"],
      validate: {
        validator: Number.isInteger,
        message: "Copies must be an integer",
      },
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Book = model("Book", bookSchema);

export default Book;
