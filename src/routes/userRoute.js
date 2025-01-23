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
// Ruta de creación con POST
userRoute.post("/create", createUser);

// Ruta para obtener todos los usuarios con GET
userRoute.get("/get", getUsers);

// Ruta para eliminar un usuario por ID con DELETE
userRoute.delete("/delete/:id", deleteUser);

// Ruta para actualizar un usuario por ID con PUT
userRoute.put("/update/:id", updateUser);

// Ruta para validar login con POST
userRoute.post("/login", validate);

export default userRoute;
