import express from "express";

import {
  getAllMenuItems,
  getTodayMenu,
  getMenuItemById,
} from "../controllers/menuController.js";

const router = express.Router();

router.get("/", getAllMenuItems);
router.get("/today", getTodayMenu);
router.get("/:id", getMenuItemById);

export default router;
