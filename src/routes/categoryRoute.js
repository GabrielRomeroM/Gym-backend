import { Router } from "express";
import {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/categoryController.js";

// Crear enrutador
const categoryRoute = Router();

// Endpoints
categoryRoute.get("/get", getCategories); // Obtener todas las categorías
categoryRoute.post("/create", createCategory); // Crear una nueva categoría
categoryRoute.get("/get/:id", getCategoryById); // Obtener una categoría por su ID
categoryRoute.put("/update/:id", updateCategory); // Actualizar una categoría
categoryRoute.delete("/delete/:id", deleteCategory); // Eliminar una categoría
categoryRoute.patch("/toggle-status/:id", toggleCategoryStatus);// Cambiar el estado de activo/inactivo de una categoría

export default categoryRoute;
