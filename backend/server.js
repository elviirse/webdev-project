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

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

// API routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/opening-hours", openingHoursRoutes);

// Start server
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
