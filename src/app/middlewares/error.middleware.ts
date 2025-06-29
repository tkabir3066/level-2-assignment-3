import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res) => {
  let statusCode = 500;
  let message = "Something went wrong!";

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: err instanceof mongoose.Error.ValidationError ? err : undefined,
  });
};

export default globalErrorHandler;
