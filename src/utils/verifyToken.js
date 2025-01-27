import jwt from "jsonwebtoken";

export function verifyToken(token) {
    try {
       const decoded = jwt.verify(token, JWT_SECRET);
       return decoded
    } catch (error) {
        throw new Error("Token invalid");
    }
}