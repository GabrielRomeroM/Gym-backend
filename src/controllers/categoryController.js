import Category from "../models/categoryModel.js";

// Obtener todas las categorías
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({ message: "No categories found" });
    }
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Crear una nueva categoria
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const categoryExists = await Category.findOne({ name: name.toLowerCase() });
    if (categoryExists) {
      return res
        .status(400)
        .json({ message: `Category ${name} already exists` });
    }

    const newCategory = new Category({
      ...req.body,
      name: name.toLowerCase(),
    });

    const savedCategory = await newCategory.save();
    return res.status(201).json(savedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Obtener una categoría por su ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json(category);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Actualizar una categoría
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true, // Devuelve la categoría actualizada
    });

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Eliminar una categoría
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryExists = await Category.findById(id);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Cambiar el estado de una categoría (activar/desactivar) REVISAR 
export const toggleCategoryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isActive = !category.isActive; // Cambia el estado activo/inactivo
    const updatedCategory = await category.save();

    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
