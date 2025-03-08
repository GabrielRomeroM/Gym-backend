import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  validate,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; // Middleware de autenticación
import { validateUser, validateLogin } from "../middlewares/validationMiddleware.js"; // Middleware de validación

// Crear enrutador
const userRoute = express.Router();

// Endpoints públicos
userRoute.post("/register", validateUser, createUser); // Registrar un nuevo usuario
userRoute.post("/login", validateLogin, validate); // Iniciar sesión

// Endpoints protegidos (requieren autenticación)
userRoute.get("/", authenticate, getUsers); // Obtener todos los usuarios
userRoute.delete("/:id", authenticate, deleteUser); // Eliminar un usuario por ID
userRoute.put("/:id", authenticate, validateUser, updateUser); // Actualizar un usuario por ID

export default userRoute;