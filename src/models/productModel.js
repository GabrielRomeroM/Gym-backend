import mongoose from "mongoose";

// Esquema del producto para ropa
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "The name field is required"],
    minLength: 3,
    maxLength: 50,
    unique: true,
    lowercase: true,
    trim: true,
  },

  size: {
    type: String,
    required: [true, "The size field is required"],
    enum: ["XS", "S", "M", "L", "XL", "XXL"], // Talles predefinidos
  },

  color: {
    type: String,
    required: [true, "The color field is required"],
    minLength: 3,
    maxLength: 20,
    lowercase: true,
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "The price field is required"],
    min: [0, "Price must be greater than or equal to 0"],
  },

  stock: {
    type: Number,
    default: 0,
    min: [0, "Stock cannot be negative"],
  },

  status: {
    type: String,
    enum: ["AVAILABLE", "OUT OF STOCK", "DISCONTINUED"], // Estados predefinidos
    default: "AVAILABLE",
  },

  creationDate: {
    type: Date,
    default: Date.now,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category", // Referencia al modelo de categorías
    required: false, // Opcional por si no quieres usar categorías ahora
  },
});

// Métodos
// Reducir stock
productSchema.methods.decreaseStock = function (amount) {
  if (this.stock < amount) {
    throw new Error("Not enough stock available");
  }
  this.stock -= amount;
  return this.save();
};

// Virtual para el precio final con impuestos si lo necesitas en el futuro
productSchema.virtual("priceWithTax").get(function () {
  return this.price * 1.21; // 21% de IVA
});

// Habilitar valores virtuales en JSON y objetos
productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("product", productSchema);