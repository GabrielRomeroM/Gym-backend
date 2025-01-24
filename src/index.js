// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors"; // Para habilitar CORS
// import { PORT } from "./config.js";
// import { connectDB } from "./db.js";
// import userRoute from "./routes/userRoute.js"; // Importar tus rutas


// const app = express();

// // Middlewares
// app.use(cors()); // Habilitar CORS para permitir solicitudes de diferentes orígenes
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Conexión a la base de datos
// connectDB();

// // Rutas
// app.use("/api/user", userRoute); // Registrar rutas de usuario

// // Ruta base para verificar que el servidor funciona
// app.get("/", (req, res) => {
//   res.send("Welcome to the Gym API!");
// });

// // Iniciar el servidor
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from "express";
import bodyParser from "body-parser";
import cors from "cors"; // Para habilitar CORS
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import userRoute from "./routes/userRoute.js"; // Importar rutas de usuario
import productRoute from "./routes/productRoute.js"; // Importar rutas de productos

const app = express();

// Middlewares
app.use(cors()); // Habilitar CORS para permitir solicitudes de diferentes orígenes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conexión a la base de datos
connectDB();

// Rutas
app.use("/api/user", userRoute); // Registrar rutas de usuario
app.use("/api/products", productRoute); // Registrar rutas de productos

// Ruta base para verificar que el servidor funciona
app.get("/", (req, res) => {
  res.send("Welcome to the Gym API!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});