import { ErrorRequestHandler } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: any = {};

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errorDetails = Object.entries(err.errors).map(([field, val]: any) => ({
      field,
      message: val.message,
    }));
  }

  res.status(statusCode).json({
    message,
    success: false,
    statusCode,
    errors: errorDetails,
    error: err,
  });
};

export default globalErrorHandler;
