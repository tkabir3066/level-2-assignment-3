"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    let errorDetails = {};
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        errorDetails = Object.entries(err.errors).map(([field, val]) => ({
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
exports.default = globalErrorHandler;
