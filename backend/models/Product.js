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
      default: "eSibha Original",
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Men's", "Women's", "Unisex", "Gift Packs", "Seasonal"],
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

    accords: {
      type: [String],
      default: [],
    },

    mood: {
      type: String,
      enum: ["Fresh", "Romantic", "Bold", "Luxurious", "Night"],
      default: "Fresh",
    },

    intensity: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 70,
    },

    top: {
      type: [String],
      default: [],
    },

    heart: {
      type: [String],
      default: [],
    },

    base: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    sizes: {
      type: [sizeSchema],
      validate: [
        (arr) => arr.length > 0,
        "At least one size is required",
      ],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    bestseller: {
      type: Boolean,
      default: false,
    },

    mostLoved: {
      type: Boolean,
      default: false,
    },

    newArrival: {
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

    tags: {
      type: [String],
      default: [],
    },

    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);