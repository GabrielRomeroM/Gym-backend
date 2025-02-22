import dontenv from "dotenv";

dontenv.config();

export const PORT = process.env.PORT || 3001;
export const MONGODB_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;