import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 2,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 2,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 6,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 110,
  },
  registrationDate: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return isGoodPassword(value);
      },
      message:
        "Password must be between 6 and 12 characters, with at least one number, one uppercase letter, and one lowercase letter",
    },
  },
  membership: {
    type: String,
    enum: ["basic", "premium", "vip"],
    default: "basic",
    lowercase: true,
  },
  favoriteActivities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
});

export default mongoose.model("User", userSchema);
