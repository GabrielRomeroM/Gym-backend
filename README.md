<h1>API CRUD para Gimnasios</h1>
Una API CRUD que permite gestionar usuarios, productos y actividades en un gimnasio. Incluye autenticación opcional, validación de datos y operaciones sobre categorías, productos y usuarios.
<h1>Listado de Tecnologías</h1>

- Node.js

- Express

- MongoDB (y Mongoose)

- JWT

- bcrypt

- body-parser, cors, etc.

<h1>Cómo correr el proyecto</h1>
<h3>1. Clonar el repositorio</h3>

git clone <URL_DEL_REPO>

<h3>2. Ir al directorio del proyecto</h3>

cd <nombre_del_proyecto>

<h3>4. Instalar dependencias</h3>

npm install

<h3>5. Configurar las variables de entorno</h3>

PORT=3000

MONGODB_URI="mongodb://127.0.0.1:27017/Gym"

<h3>6. Iniciar el servidor</h3>

npm run dev

<h1>Endpoints</h1>

- **Usuarios:**
  - POST `/api/user/create`: Crea un nuevo usuario.
  - GET `/api/user/get`: Obtiene todos los usuarios.
  - DELETE `/api/user/delete/:id`: Elimina un usuario.
  - PUT `/api/user/update/:id`: Actualiza un usuario.
    
- **Productos:**
  - POST `/api/products/create`: Crea un nuevo producto.
  - GET `/api/products/get`: Obtiene todos los productos.
  - POST `/api/products/get-by-name`: Obtener productos por nombre
  - DELETE `/api/products/delete/:id`: Elimina un producto.
  - PUT `/api/products/update/:id`: Actualiza un producto.

- **Actividades en el gimnasio:**
  - POST `/api/category/create`: Crea una nueva categoria.
  - GET `/api/category/get`: Obtiene todas las categorias.
  - GET `/api/category//get/:id`: Obtener una categoría por su ID
  - DELETE `/api/category/delete/:id`: Elimina una categoria.
  - PUT `/api/category/update/:id`: Actualiza una categoria.
  - PATCH `/api/category//toggle-status/:id`: Cambiar el estado de activo/inactivo de una categoría

<h1>dDatos mock</h1>

- **User**

Para la creacion de usuarios con  `POST /api/user/create`, puedes tomar este ejemplo

{
  "name": "ammy",
  "lastName": "Gonzales",
  "email": "amyG@gmail.com",
  "age": 22,
  "password": "Qwerty123",
  "membership": "Premium"
}

- **Productos**

Para la creacion de productos con `POST /api/products/create`, puedes tomar este ejemplo

{
  "name": "pantalon",
  "size": "M",
  "color": "Azul",
  "stock": 5,
  "price": 1500,
  "status": "OUT OF STOCK"
}

- **Actividades del gimnasio**

Para crear una actividad con `POST /api/category/create`, puedes tomar este de ejemplo

{
  "name": "funcional",
  "description": "aerobico",
  "averageDuration": 45,
  "intensityLevel": "LOW"
}
