"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controllers/books.controller");
const error_middleware_1 = __importDefault(require("./app/middlewares/error.middleware"));
const borrow_control_1 = require("./app/controllers/borrow.control");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send({ message: "Welcome to the Library Management System" });
});
//middleware
app.use("/api/books", books_controller_1.booksRouter);
app.use("/api/borrows", borrow_control_1.borrowRouter);
// 404 route
app.use((req, res) => {
    res.status(404).json({ message: "404 not found", success: false });
});
//global error handler
app.use(error_middleware_1.default);
exports.default = app;
