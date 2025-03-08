import { verifyToken } from "../utils/verifyToken.js";

export const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token); // Usa la función de utils/verifyToken.js
    req.user = decoded; // Añade el usuario decodificado al objeto `req`
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};