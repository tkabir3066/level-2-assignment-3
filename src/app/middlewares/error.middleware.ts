import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorDetails: any = {};

  // Mongoose Validation Error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Validation failed";

    const errors: Record<string, any> = {};
    for (const field in err.errors) {
      const validationError = err.errors[field];

      errors[field] = {
        message: validationError.message,
        name: validationError.name,
        properties: validationError,
        kind: validationError.kind,
        path: validationError.path,
        value: validationError.value,
      };
    }

    errorDetails = {
      name: err.name,
      errors,
    };
  }

  res.status(statusCode).json({
    message,
    success: false,
    error: errorDetails || err,
  });
};

export default globalErrorHandler;
