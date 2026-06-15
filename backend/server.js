require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const giftPackRoutes = require("./routes/giftPackRoutes");
const customLabOrderRoutes = require("./routes/customLabOrderRoutes");
const hybridOrderRoutes = require("./routes/hybridOrderRoutes");


const app = express();

connectDB();

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5174",
  })
);
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/gift-packs", giftPackRoutes);
app.use("/api/custom-lab-orders", customLabOrderRoutes);
app.use("/api/hybrid-orders", hybridOrderRoutes);
app.get("/", (req, res) => {
  res.send("eSibha backend is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});