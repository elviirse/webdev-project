import express from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../controllers/authController.js";

import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @api {post} /api/auth/register Register customer
 * @apiName RegisterCustomer
 * @apiGroup Authentication
 *
 * @apiBody {String} name Customer name
 * @apiBody {String} email Customer email
 * @apiBody {String} [phone] Customer phone number
 * @apiBody {String} password Customer password
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} customer Created customer
 * @apiSuccess {Number} customer.id Customer ID
 * @apiSuccess {String} customer.name Customer name
 * @apiSuccess {String} customer.email Customer email
 * @apiSuccess {String} [customer.phone] Customer phone number
 * @apiSuccess {String} customer.role Customer role
 *
 * @apiError (400) BadRequest Required data is missing or invalid
 * @apiError (409) Conflict Email is already registered
 */
router.post("/register", register);

/**
 * @api {post} /api/auth/login Login customer
 * @apiName LoginCustomer
 * @apiGroup Authentication
 *
 * @apiBody {String} email Customer email
 * @apiBody {String} password Customer password
 *
 * @apiSuccess {String} message Login success message
 * @apiSuccess {String} token JWT authentication token
 * @apiSuccess {Object} customer Logged-in customer
 * @apiSuccess {Number} customer.id Customer ID
 * @apiSuccess {String} customer.name Customer name
 * @apiSuccess {String} customer.email Customer email
 * @apiSuccess {String} customer.role Customer role
 *
 * @apiError (400) BadRequest Email and password are required
 * @apiError (401) Unauthorized Invalid email or password
 */
router.post("/login", login);

/**
 * @api {get} /api/auth/me Get current customer
 * @apiName GetCurrentCustomer
 * @apiGroup Authentication
 *
 * @apiHeader {String} Authorization Bearer JWT token
 *
 * @apiSuccess {Object} customer Current authenticated customer
 * @apiSuccess {Number} customer.id Customer ID
 * @apiSuccess {String} customer.name Customer name
 * @apiSuccess {String} customer.email Customer email
 * @apiSuccess {String} [customer.phone] Customer phone number
 * @apiSuccess {String} customer.role Customer role
 *
 * @apiError (401) Unauthorized Missing, invalid, or expired token
 */
router.get("/me", authenticateToken, getCurrentUser);

export default router;
