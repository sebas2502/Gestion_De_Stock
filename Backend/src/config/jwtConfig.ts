import dotenv from "dotenv";
import { SignOptions } from "jsonwebtoken";

dotenv.config();

export const jwtSecret: string = process.env.JWT_SECRET || "secret123";

export const jwtOptions: SignOptions = {
  expiresIn: "1D",
};
