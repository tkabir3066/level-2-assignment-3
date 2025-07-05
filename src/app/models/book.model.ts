import { model, Schema } from "mongoose";
import { BookStaticMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, BookStaticMethods>(
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
  { versionKey: false, timestamps: true }
);

bookSchema.static(
  "borrowBook",
  async function (bookId: string, quantity: number) {
    const book = await this.findById(bookId);
    if (!book) throw new Error("Book not found");

    if (book.copies < quantity) {
      throw new Error("Not enough copies available");
    }

    book.copies -= quantity;
    if (book.copies === 0) {
      book.available = false;
    }

    return await book.save();
  }
);

//pre hook
bookSchema.pre("find", function (next) {
  next();
});

//post hook

bookSchema.post("save", function (doc, next) {
  console.log("%s has been saved", doc.title);

  next();
});

const Book = model<IBook, BookStaticMethods>("Book", bookSchema);

export default Book;
