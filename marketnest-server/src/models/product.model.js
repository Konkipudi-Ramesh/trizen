import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    images: [
      {
        type: String
      }
    ],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft"
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);