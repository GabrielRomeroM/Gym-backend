import User from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;

    // Validar que el email no sea repetido
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: `User with email: ${email} already exists` });
    }

    // Guardar usuario en la base de datos
    await userData.save();
    res.status(201).json({ message: "User created", user: userData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("favoriteActivities");
    if (users.length === 0) {
      return res.status(204).json({ message: "There are no users" });
    }
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await User.findOne({ _id });

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(_id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const userExist = await User.findOne({ _id });
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate({ _id }, req.body, {
      new: true,
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error", error });
  }
};

export const validate = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "There is a missing field" });
    }

    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ message: "Email or password incorrect" });
    }

    if (bcrypt.compareSync(password, userFound.password)) {
      const payload = {
        userId: userFound._id,
        userEmail: userFound.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Logged in", token });
    } else {
      return res.status(400).json({ message: "Email or password incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};