import mongoose from "mongoose";
import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    // Verificar si el usuario ya existe
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: `User with email: ${email} already exists` });
    }

    // Guardar el usuario en la base de datos
    await userData.save();

    // Respuesta personalizada sin datos sensibles
    res.status(201).json({
      message: "User created successfully",
      userId: userData._id, // Opcional: incluir el ID del usuario
      userMembership: userData.membership,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Excluir la contraseña
    if (users.length === 0) {
      return res.status(204).json({ message: "There are no users" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Borrar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Extrae el id correctamente

    // Verifica si el id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Buscar y eliminar el usuario en una sola operación
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar y actualizar el usuario
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password"); // Excluir la contraseña

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Validar login
export const validate = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos obligatorios
    if (!(email && password)) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Buscar el usuario por email
    const userFound = await User.findOne({ email });
    if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generar token JWT
    const payload = {
      userId: userFound._id,
      userEmail: userFound.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token de corta duración
    });

    res.status(200).json({ message: "Logged in", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};