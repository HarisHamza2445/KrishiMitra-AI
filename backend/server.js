const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/disease", require("./routes/diseaseRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));
app.use("/api/crops", require("./routes/cropRoutes"));

app.get("/", (req, res) => {
  res.send("KrishiMitra  AI API Running...");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// trigger nodemon restart
