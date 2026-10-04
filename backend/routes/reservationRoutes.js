import express from "express";

import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

import {
  createReservation,
  getAllReservations,
  getCustomerReservations,
  getReservationById,
  updateReservationStatus,
  archiveReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

/**
 * @api {post} /api/reservations Create a reservation
 * @apiName CreateReservation
 * @apiGroup Reservations
 *
 * @apiHeader {String} Authorization Bearer JWT token.
 *
 * @apiBody {Number} customerId Customer ID.
 * @apiBody {Number} tableId Restaurant table ID.
 * @apiBody {String} date Reservation date.
 * @apiBody {String} time Reservation time.
 * @apiBody {Number} numberOfGuests Number of guests.
 * @apiBody {String} [specialRequests] Optional special requests.
 *
 * @apiSuccess (201) {Number} id Reservation ID.
 * @apiSuccess (201) {String} status Reservation status.
 *
 * @apiError (400) BadRequest Invalid reservation data.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Customer ID does not match authenticated user.
 */
router.post("/", authenticateToken, createReservation);

/**
 * @api {get} /api/reservations Get all active reservations
 * @apiName GetAllReservations
 * @apiGroup Reservations
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 */
router.get("/", authenticateToken, requireAdmin, getAllReservations);

/**
 * @api {get} /api/reservations/customer/:customerId Get customer reservations
 * @apiName GetCustomerReservations
 * @apiGroup Reservations
 *
 * @apiHeader {String} Authorization Bearer JWT token.
 * @apiParam {Number} customerId Customer ID.
 *
 * @apiError (400) BadRequest Invalid customer ID.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Customers can only view their own reservations.
 */
router.get("/customer/:customerId", authenticateToken, getCustomerReservations);

/**
 * @api {patch} /api/reservations/:id/status Update reservation status
 * @apiName UpdateReservationStatus
 * @apiGroup Reservations
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 * @apiParam {Number} id Reservation ID.
 *
 * @apiBody {String="pending","confirmed","cancelled","completed"} status New reservation status.
 */
router.patch(
  "/:id/status",
  authenticateToken,
  requireAdmin,
  updateReservationStatus,
);

/**
 * @api {patch} /api/reservations/:id/archive Archive reservation
 * @apiName ArchiveReservation
 * @apiGroup Reservations
 *
 * @apiDescription Archive a completed or cancelled reservation.
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 * @apiParam {Number} id Reservation ID.
 *
 * @apiSuccess {Number} id Reservation ID.
 * @apiSuccess {Boolean} isArchived Archive status.
 * @apiSuccess {String} message Success message.
 */
router.patch(
  "/:id/archive",
  authenticateToken,
  requireAdmin,
  archiveReservation,
);

/**
 * @api {get} /api/reservations/:id Get reservation by ID
 * @apiName GetReservationById
 * @apiGroup Reservations
 *
 * @apiParam {Number} id Reservation ID.
 */
router.get("/:id", getReservationById);

export default router;
