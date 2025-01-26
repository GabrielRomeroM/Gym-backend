import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
  validate,
} from "../controllers/userController.js";

// Crear enrutador
const userRoute = express.Router();

// Endpoints
userRoute.post("/create", createUser); // Ruta de creación con POST
userRoute.get("/get", getUsers); // Ruta para obtener todos los usuarios con GET
userRoute.delete("/delete/:id", deleteUser); // Ruta para eliminar un usuario por ID con DELETE
userRoute.put("/update/:id", updateUser); // Ruta para actualizar un usuario por ID con PUT
userRoute.post("/login", validate); // Ruta para validar login con POST

export default userRoute;
