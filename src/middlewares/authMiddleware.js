import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  // Extraer el token del encabezado "Authorization"
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Añade el usuario decodificado al objeto `req`
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};