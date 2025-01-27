import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";

const app = express();

// Middlewares
app.use(cors(
  {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api/user", userRoute); // Registrar rutas de usuario
app.use("/api/products", productRoute); // Registrar rutas de productos
app.use("/api/category", categoryRoute); //Registrar rutas de categorias

// Ruta base para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Welcome to the Gym API!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});