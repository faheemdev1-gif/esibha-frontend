require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const XLSX = require("xlsx");

const Product = require("../models/Product");

const FILE_PATH = path.join(__dirname, "../Product Sheet.xlsx");

function slugify(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseList(value) {
  if (!value) return [];

  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function mapCategory(value) {
  const v = String(value || "").toLowerCase().trim();

  if (v === "men") return "Men's";
  if (v === "women") return "Women's";
  if (v === "unisex") return "Unisex";

  return "Unisex";
}

function mapFamily(accords = []) {
  const lower = accords.map((a) => a.toLowerCase());

  if (lower.some((a) => ["citrus", "citrusy", "fresh", "aquatic", "aromatic"].includes(a))) {
    return "Fresh & Citrus";
  }

  if (lower.some((a) => ["floral", "rose", "jasmine"].includes(a))) {
    return "Floral";
  }

  if (lower.some((a) => ["oud", "amber", "oriental"].includes(a))) {
    return "Oud & Amber";
  }

  if (lower.some((a) => ["woody", "spicy", "leather", "smoky", "mineral", "chypre"].includes(a))) {
    return "Woody & Oriental";
  }

  if (lower.some((a) => ["musk", "musky"].includes(a))) {
    return "Musk";
  }

  return "Fresh & Citrus";
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const workbook = XLSX.readFile(FILE_PATH);
    const sheetName = workbook.SheetNames[0];

    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: "",
      range: 1,
    });

    const products = rows
      .filter((row) => String(row.Name || "").trim())
      .map((row) => {
        const name = String(row.Name || "").trim();
        const accords = parseList(row.Family);

        const sizes = [
          { label: "30ml", price: Number(row["30ml"] || 0) },
          { label: "50ml", price: Number(row["50ml"] || 0) },
          { label: "100ml", price: Number(row["100ml"] || 0) },
        ].filter((s) => s.price > 0);

        return {
          name,
          slug: slugify(name),
          inspo: "eSibha Original",
          category: mapCategory(row.Category),
          family: mapFamily(accords),
          accords,
          intensity: 70,
          top: parseList(row["Top Notes"]),
          heart: parseList(row["Middle Notes"]),
          base: parseList(row["Base Notes"]),
          description: String(row.Description || "Premium handcrafted fragrance by eSibha.").trim(),
          image: String(row["Pic Link"] || "").trim(),
          featured: false,
          bestseller: false,
          mostLoved: false,
          newArrival: false,
          inStock: true,
          sizes,
          tags: accords,
        };
      });

    await Product.deleteMany({});
    await Product.insertMany(products);

    console.log(`${products.length} products imported successfully`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

run();
