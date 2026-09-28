import express from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/authController.js";

import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authenticateToken, getCurrentUser);

export default router;
