"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server = (0, http_1.createServer)(app_1.default);
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    throw new Error("MONGODB_URL is not defined in the environment variables");
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(MONGO_URI);
            console.log("Mongodb connected successfully");
            server = app_1.default.listen(PORT, () => {
                console.log(`App is listening on port:${PORT}`);
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
main();
exports.default = server;
