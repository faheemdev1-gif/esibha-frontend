const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      enum: ["5ml", "30ml", "50ml", "100ml"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    inspo: {
      type: String,
      required: true,
      trim: true,
    },

    family: {
      type: String,
      required: true,
      enum: [
        "Fresh & Citrus",
        "Floral",
        "Oud & Amber",
        "Woody & Oriental",
        "Musk",
      ],
    },

    category: {
      type: String,
      required: true,
      enum: ["Men's", "Women's", "Unisex", "Gift Packs", "Seasonal"],
    },

    intensity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    top: [String],

    heart: [String],

    base: [String],

    description: {
      type: String,
      required: true,
    },

    sizes: {
      type: [sizeSchema],
      validate: [(arr) => arr.length > 0, "At least one size is required"],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestseller: {
      type: Boolean,
      default: false,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);