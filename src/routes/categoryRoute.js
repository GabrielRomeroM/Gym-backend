import { Router } from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/categoryController.js";

const categoryRoute = Router();

// Obtener todas las categorías
categoryRoute.get("/get", getCategories);

// Crear una nueva categoría
categoryRoute.post("/create", createCategory);

// Obtener una categoría por su ID
categoryRoute.get("/get/:id", getCategoryById);

// Actualizar una categoría
categoryRoute.put("/update/:id", updateCategory);

// Eliminar una categoría
categoryRoute.delete("/delete/:id", deleteCategory);

// Cambiar el estado de activo/inactivo de una categoría
categoryRoute.patch("/toggle-status/:id", toggleCategoryStatus);

export default categoryRoute;
