import { body, validationResult } from "express-validator";

// Validación para crear o actualizar un usuario
export const validateUser = [
  body("name").trim().isLength({ min: 2, max: 20 }).withMessage("Name must be between 2 and 20 characters"),
  body("lastName").trim().isLength({ min: 2, max: 20 }).withMessage("Last name must be between 2 and 20 characters"),
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("age").isInt({ min: 10, max: 110 }).withMessage("Age must be between 10 and 110"),
  body("password").isLength({ min: 6, max: 12 }).withMessage("Password must be between 6 and 12 characters"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validación para el login
export const validateLogin = [
  body("email").trim().isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];