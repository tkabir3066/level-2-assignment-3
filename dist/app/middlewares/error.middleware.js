"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const globalErrorHandler = (err, req, res) => {
    let statusCode = 500;
    let message = "Something went wrong!";
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
    }
    res.status(statusCode).json({
        message,
        success: false,
        error: err instanceof mongoose_1.default.Error.ValidationError ? err : undefined,
    });
};
exports.default = globalErrorHandler;
