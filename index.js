require("./config/env");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const multer = require("multer");
const connectDB = require("./config/db");

const appRoutes = require("./routes/index");
const errorHandler = require("./middlewares/error");
const responseHandler = require("./middlewares/response");

const app = express();
const PORT = process.env.PORT || 5000;
const upload = multer();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(responseHandler);
app.use(upload.any());
// Routes
app.use("/api/v1", appRoutes);

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Your backend server is running",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

// Start Server
const startServer = async () => {
  connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
  });
};

startServer();
// Humsafar Gharana ApnaRishtaa
