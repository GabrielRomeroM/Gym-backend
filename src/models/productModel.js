import mongoose from "mongoose";

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
    enum: ["xs", "s", "m", "l", "xl", "xxl"],
    lowercase: true,
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
    enum: ["available", "out of stock" ,"discontinued"],
    default: "AVAILABLE",
    lowercase: true,
  },

  creationDate: {
    type: Date,
    default: Date.now,
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: false,
  },
});

// Métodos
// Reducir stock
// Verify
productSchema.methods.decreaseStock = function (amount) {
  if (this.stock < amount) {
    throw new Error("Not enough stock available");
  }
  this.stock -= amount;
  return this.save();
};

productSchema.virtual("priceWithTax").get(function () {
  return this.price * 1.21; // 21% de IVA
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export default mongoose.model("product", productSchema);