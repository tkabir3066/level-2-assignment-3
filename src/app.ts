import express, { Application, Request, Response } from "express";
import { booksRouter } from "./app/controllers/books.controller";
import globalErrorHandler from "./app/middlewares/error.middleware";
import { borrowRouter } from "./app/controllers/borrow.control";

const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to the Library Management System" });
});

//middleware
app.use("/api/books", booksRouter);
app.use("/api/borrows", borrowRouter);

// 404 route
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "404 not found", success: false });
});

//global error handler

app.use(globalErrorHandler);
export default app;
