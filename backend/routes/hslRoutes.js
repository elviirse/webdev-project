import express from "express";
import { getNearbyStops } from "../controllers/hslController.js";

const router = express.Router();

/**
 * @api {get} /api/hsl/stops Get nearby HSL stops
 * @apiName GetNearbyHslStops
 * @apiGroup HSL
 *
 * @apiSuccess {Object[]} stops Nearby public transport stops.
 * @apiSuccess {String} stops.id Stop identifier.
 * @apiSuccess {String} stops.name Stop name.
 * @apiSuccess {Number} stops.distance Distance in metres.
 * @apiSuccess {String} stops.vehicleMode Transport mode.
 *
 * @apiError (502) ExternalApiError Failed to fetch public transport information.
 */
router.get("/stops", getNearbyStops);

export default router;
