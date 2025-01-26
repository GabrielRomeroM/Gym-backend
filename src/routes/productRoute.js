import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  findProductById,
  findProductByName,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

// Crear enrutador
const productRoute = Router();

// Rutas para productos
productRoute.get("/get", getProducts); // Obtener todos los productos
productRoute.post("/create", createProduct); // Crear un nuevo producto
productRoute.get("/get-by-id/:id", findProductById); // Buscar producto por ID
productRoute.post("/get-by-name", findProductByName); // Buscar producto por nombre
productRoute.put("/update/:id", updateProduct); // Actualizar producto por ID
productRoute.delete("/delete/:id", deleteProduct); // Eliminar producto por ID

export default productRoute;