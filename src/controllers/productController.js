import Product from "../models/productModel.js";

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category"); // Incluye datos de la categoría si existe
    if (products.length === 0) {
      return res.status(400).json({ message: "No products found" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const productData = new Product(req.body);
    const { name } = productData;
    const productExist = await Product.findOne({ name });

    if (productExist) {
      return res
        .status(400)
        .json({ message: `Product "${name}" already exists` });
    }

    const savedProduct = await productData.save();
    return res.status(200).json(savedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Buscar un producto por nombre
export const findProductByName = async (req, res) => {
  try {
    const name = req.body.name;
    const parsedName = name.trim().toLowerCase();
    const productExist = await Product.findOne({ name: parsedName });
    if (!productExist) {
      return res.status(400).json({ message: `Product "${name}" doesn't exist` });
    }
    return res.status(200).json(productExist);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Buscar un producto por ID
export const findProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(400).json({ message: `Product with ID "${id}" doesn't exist` });
    }
    return res.status(200).json(productExist);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(400).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Retorna el producto actualizado
    );
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productExist = await Product.findById(id);
    if (!productExist) {
      return res.status(400).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};