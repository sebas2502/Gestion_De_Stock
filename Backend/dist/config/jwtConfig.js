"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtOptions = exports.jwtSecret = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.jwtSecret = process.env.JWT_SECRET || "secret123";
exports.jwtOptions = {
    expiresIn: "1D",
};
