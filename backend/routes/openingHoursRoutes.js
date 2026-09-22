import express from "express";
import { getOpeningHours } from "../controllers/openingHoursController.js";

const router = express.Router();

/**
 * @api {get} /api/opening-hours Get restaurant opening hours
 * @apiName GetOpeningHours
 * @apiGroup OpeningHours
 *
 * @apiSuccess {Object[]} openingHours List of restaurant opening hours.
 * @apiSuccess {Number} openingHours.id Opening hours ID.
 * @apiSuccess {String} openingHours.dayOfWeek Day of the week.
 * @apiSuccess {String} openingHours.openTime Restaurant opening time.
 * @apiSuccess {String} openingHours.closeTime Restaurant closing time.
 *
 * @apiError (500) ServerError Failed to fetch opening hours.
 */
router.get("/", getOpeningHours);

export default router;
