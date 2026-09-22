import pool from "./config/db.js";
import express from "express";
import cors from "cors";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import openingHoursRoutes from "./routes/openingHoursRoutes.js";

const hostname = "127.0.0.1";
const port = 3000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// Menu API routes
app.use("/api/menu", menuRoutes);

// Order API routes
app.use("/api/orders", orderRoutes);

// Reservation API routes
app.use("/api/reservations", reservationRoutes);

app.use("/api/opening-hours", openingHoursRoutes);

// Test database connection
try {
  const [rows] = await pool.query("SELECT 1 AS test");
  console.log("Database connected successfully:", rows);
} catch (error) {
  console.error("Database connection failed:", error.message);
}

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
