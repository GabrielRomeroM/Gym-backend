import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  description: {
    type: String,
    maxLength: 200,
    lowercase: true,
  },
  averageDuration: {
    type: Number,
    default: 60,
    min: [10, "Duration should be at least 10 minutes"],
  },
  intensityLevel: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    default: "MEDIUM",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("category", categorySchema);
