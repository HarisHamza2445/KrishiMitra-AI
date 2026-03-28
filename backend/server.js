const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({
  contentSecurityPolicy: false,
}));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/disease", require("./routes/diseaseRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));

// Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../", "frontend", "dist", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("KrishiMitra AI API Running...");
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
