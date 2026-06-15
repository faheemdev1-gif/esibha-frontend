const mongoose = require("mongoose");

const customLabOrderSchema = new mongoose.Schema(
  {
    perfumeName: {
      type: String,
      required: true,
      trim: true,
    },

    selected: {
      top: {
        type: [String],
        required: true,
      },
      heart: {
        type: [String],
        required: true,
      },
      base: {
        type: [String],
        required: true,
      },
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
      notes: {
        type: String,
        trim: true,
        default: "",
      },
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomLabOrder", customLabOrderSchema);