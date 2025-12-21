"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = AuthMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_1 = require("../config/jwtConfig");
const AppError_1 = require("../errors/AppError");
function AuthMiddleware(req, res, next) {
    const header = req.headers.authorization;
    if (!header) {
        throw new AppError_1.AppError("Token requerido", 401);
    }
    const token = header.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwtConfig_1.jwtSecret);
        req.user = decoded;
        //console.log("TOKEN HEADER:", req.headers.authorization);
        //console.log("USER DECODIFICADO:", decoded);
        next();
    }
    catch {
        throw new AppError_1.AppError("Token inválido", 401); // ✅ antes respondía
    }
}
