import express from "express";
import { getOpeningHours } from "../controllers/openingHoursController.js";

const router = express.Router();

router.get("/", getOpeningHours);

export default router;
