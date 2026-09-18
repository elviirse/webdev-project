import express from "express";

import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

// Create a new reservation
router.post("/", createReservation);

// Get all reservations
router.get("/", getAllReservations);

// Get one reservation by ID
router.get("/:id", getReservationById);
router.patch("/:id/status", updateReservationStatus);

export default router;
