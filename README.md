# API CRUD para Gimnasios 🏋️‍♂️

Una API diseñada para gestionar usuarios, productos y actividades en un gimnasio. Este proyecto permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre categorías, productos y usuarios. Además, incluye autenticación opcional, validación de datos y manejo de estados activos/inactivos para categorías.

---

## 🚀 Tecnologías Utilizadas

- **Node.js**  
- **Express**  
- **MongoDB** (Mongoose como ORM)  
- **JSON Web Token (JWT)** para autenticación.  
- **bcrypt** para encriptación de contraseñas.  
- Librerías auxiliares como **body-parser**, **cors**, etc.

---

## ⚙️ Cómo ejecutar el proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/GabrielRomeroM/Gym-backend.git
```

### 2. Instalar las dependencias necesarias
```bash
npm install
```

### 3. Configurar las variables de entorno
Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```
PORT=3000
MONGODB_URI="mongodb://127.0.0.1:27017/Gym"
JWT_SECRET=" my-secret"
```

### 4. Iniciar el servidor
```bash
npm run dev
```

---

## 📌 Endpoints Principales

### **Usuarios**
- **POST** `/api/user/create`: Crea un nuevo usuario.  
- **GET** `/api/user/get`: Obtiene todos los usuarios registrados.  
- **PUT** `/api/user/update/:id`: Actualiza los datos de un usuario existente.  
- **DELETE** `/api/user/delete/:id`: Elimina un usuario del sistema.  

### **Productos**
- **POST** `/api/products/create`: Crea un nuevo producto.  
- **GET** `/api/products/get`: Obtiene todos los productos disponibles.  
- **POST** `/api/products/get-by-name`: Busca productos por nombre.  
- **PUT** `/api/products/update/:id`: Actualiza la información de un producto.  
- **DELETE** `/api/products/delete/:id`: Elimina un producto del sistema.  

### **Actividades (Categorías)**
- **POST** `/api/category/create`: Crea una nueva actividad o categoría.  
- **GET** `/api/category/get`: Obtiene todas las actividades disponibles.  
- **GET** `/api/category/get/:id`: Obtiene información detallada de una actividad por ID.  
- **PUT** `/api/category/update/:id`: Actualiza los datos de una categoría.  
- **PATCH** `/api/category/toggle-status/:id`: Cambia el estado de activo/inactivo de una categoría.  
- **DELETE** `/api/category/delete/:id`: Elimina una categoría.  

---

## 💡 Comandos útiles para probar la aplicación

1. **Probar el servidor en funcionamiento**  
   Abre el navegador o Postman y realiza una solicitud `GET` a:  
   ```
   http://localhost:3000/
   ```
   Respuesta esperada: `"Welcome to the Gym API!"`

2. **Probar un endpoint de ejemplo (Usuarios)**  
   En Postman o cualquier cliente REST, realiza una solicitud `POST` a:  
   ```
   http://localhost:3000/api/user/create
   ```
   Con el cuerpo de ejemplo:
   ```json
   {
     "name": "Juan",
     "lastName": "Perez",
     "email": "juan.perez@gmail.com",
     "age": 30,
     "password": "Qwerty123",
     "membership": "Vip"
   }
   ```

3. **Listar todas las categorías**  
   Realiza una solicitud `GET` a:  
   ```
   http://localhost:3000/api/category/get
   ```
   
4. **Crea una categoría**
    Realiza una solicitud `POST` a:
    ```
   http://localhost:3000/api/category/create
    ```
    Con el cuerpo de ejemplo
    ```json
    {
      "name": "funcional",
      "description": "aerobico",
      "averageDuration": 45,
      "intensityLevel": "LOW"
    }
    ```
5. **Cambiar el estado de una categoría**  
   Realiza una solicitud `PATCH` a:  
   ```
   http://localhost:3000/api/category/toggle-status/:id
   ```
   Reemplaza `:id` con el ID de la categoría deseada.
6. **Crea un producto**
    Realiza una solicitud `POST` a:
    ```
    http://localhost:3000/api/products/create
    ```
    Con el cuerpo de ejemplo
    ```json
    {
        "name": "funcional",
        "description": "aerobico",
        "averageDuration": 45,
        "intensityLevel": "LOW"
    }
    ```
   

---

## 🌟 Contribución

Si deseas colaborar, crea un **fork** de este repositorio, realiza tus cambios y envía un pull request. ¡Tu ayuda será bienvenida!  

---

¡Gracias por usar esta API! Si tienes dudas o sugerencias, no dudes en contactarme. 🚀
```