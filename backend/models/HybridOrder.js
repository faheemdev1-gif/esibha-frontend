const mongoose = require("mongoose");

const selectedScentSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    family: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const hybridOrderSchema = new mongoose.Schema(
  {
    scentA: {
      type: selectedScentSchema,
      required: true,
    },

    scentB: {
      type: selectedScentSchema,
      required: true,
    },

    ratio: {
      type: Number,
      required: true,
      min: 10,
      max: 90,
    },

    hybridName: {
      type: String,
      required: true,
      trim: true,
    },

    size: {
      type: String,
      required: true,
      enum: ["30ml", "50ml", "100ml"],
    },

    price: {
      type: Number,
      required: true,
    },

    contact: {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "processing",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "HybridOrder",
  hybridOrderSchema
);