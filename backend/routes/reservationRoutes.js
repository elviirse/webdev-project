import express from "express";

import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

/**
 * @api {post} /api/reservations Create a reservation
 * @apiName CreateReservation
 * @apiGroup Reservations
 *
 * @apiBody {Number} customerId Customer ID.
 * @apiBody {Number} tableId Restaurant table ID.
 * @apiBody {String} date Reservation date.
 * @apiBody {String} time Reservation time.
 * @apiBody {Number} numberOfGuests Number of guests.
 * @apiBody {String} [specialRequests] Optional special requests.
 *
 * @apiSuccess (201) {Number} id Reservation ID.
 * @apiSuccess (201) {Number} customerId Customer ID.
 * @apiSuccess (201) {Number} tableId Restaurant table ID.
 * @apiSuccess (201) {String} date Reservation date.
 * @apiSuccess (201) {String} time Reservation time.
 * @apiSuccess (201) {Number} numberOfGuests Number of guests.
 * @apiSuccess (201) {String} specialRequests Special requests.
 * @apiSuccess (201) {String} status Reservation status.
 *
 * @apiError (400) BadRequest Invalid reservation data or table capacity exceeded.
 * @apiError (404) NotFound Customer or table not found.
 * @apiError (409) Conflict Table is already reserved for the selected date and time.
 * @apiError (500) ServerError Failed to create reservation.
 */
router.post("/", createReservation);

/**
 * @api {get} /api/reservations Get all reservations
 * @apiName GetAllReservations
 * @apiGroup Reservations
 *
 * @apiSuccess {Object[]} reservations List of reservations.
 * @apiSuccess {Number} reservations.id Reservation ID.
 * @apiSuccess {Number} reservations.customerId Customer ID.
 * @apiSuccess {Number} reservations.tableId Restaurant table ID.
 * @apiSuccess {String} reservations.date Reservation date.
 * @apiSuccess {String} reservations.time Reservation time.
 * @apiSuccess {Number} reservations.numberOfGuests Number of guests.
 * @apiSuccess {String} reservations.specialRequests Special requests.
 * @apiSuccess {String} reservations.status Reservation status.
 *
 * @apiError (500) ServerError Failed to fetch reservations.
 */
router.get("/", getAllReservations);

/**
 * @api {get} /api/reservations/:id Get reservation by ID
 * @apiName GetReservationById
 * @apiGroup Reservations
 *
 * @apiParam {Number} id Reservation ID.
 *
 * @apiSuccess {Number} id Reservation ID.
 * @apiSuccess {Number} customerId Customer ID.
 * @apiSuccess {Number} tableId Restaurant table ID.
 * @apiSuccess {String} date Reservation date.
 * @apiSuccess {String} time Reservation time.
 * @apiSuccess {Number} numberOfGuests Number of guests.
 * @apiSuccess {String} specialRequests Special requests.
 * @apiSuccess {String} status Reservation status.
 *
 * @apiError (400) BadRequest Invalid reservation ID.
 * @apiError (404) NotFound Reservation not found.
 * @apiError (500) ServerError Failed to fetch reservation.
 */
router.get("/:id", getReservationById);

/**
 * @api {patch} /api/reservations/:id/status Update reservation status
 * @apiName UpdateReservationStatus
 * @apiGroup Reservations
 *
 * @apiParam {Number} id Reservation ID.
 * @apiBody {String="pending","confirmed","cancelled","completed"} status New reservation status.
 *
 * @apiSuccess {Number} id Reservation ID.
 * @apiSuccess {String} status Updated reservation status.
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) BadRequest Invalid reservation ID or status.
 * @apiError (404) NotFound Reservation not found.
 * @apiError (500) ServerError Failed to update reservation status.
 */
router.patch("/:id/status", updateReservationStatus);

export default router;
