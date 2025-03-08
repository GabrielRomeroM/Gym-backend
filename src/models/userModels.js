import mongoose from "mongoose";
import { isGoodPassword } from "../utils/validators.js";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema({
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
    default: Date.now,
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
  favoriteActivities: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model("User", userSchema);