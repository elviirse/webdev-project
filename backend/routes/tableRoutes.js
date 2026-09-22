import express from "express";

import {
  getAllTables,
  getAvailableTables,
} from "../controllers/tableController.js";

const router = express.Router();

/**
 * @api {get} /api/tables Get all restaurant tables
 * @apiName GetAllTables
 * @apiGroup Tables
 *
 * @apiSuccess {Object[]} tables List of restaurant tables.
 * @apiSuccess {Number} tables.id Table ID.
 * @apiSuccess {Number} tables.tableNumber Table number.
 * @apiSuccess {Number} tables.capacity Maximum number of guests.
 * @apiSuccess {String} tables.status Current table status.
 *
 * @apiError (500) ServerError Failed to fetch tables.
 */
router.get("/", getAllTables);

/**
 * @api {get} /api/tables/available Get available tables
 * @apiName GetAvailableTables
 * @apiGroup Tables
 *
 * @apiQuery {String} date Reservation date (YYYY-MM-DD).
 * @apiQuery {String} time Reservation time (HH:MM).
 * @apiQuery {Number} guests Number of guests.
 *
 * @apiSuccess {Object[]} tables List of available tables.
 * @apiSuccess {Number} tables.id Table ID.
 * @apiSuccess {Number} tables.tableNumber Table number.
 * @apiSuccess {Number} tables.capacity Maximum number of guests.
 * @apiSuccess {String} tables.status Current table status.
 *
 * @apiError (400) BadRequest Valid date, time and number of guests are required.
 * @apiError (500) ServerError Failed to fetch available tables.
 */
router.get("/available", getAvailableTables);

export default router;
