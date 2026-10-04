import express from "express";

import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

import {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @api {post} /api/orders Create a new order
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer JWT token.
 *
 * @apiBody {Number} customerId Customer ID.
 * @apiBody {Object[]} items List of ordered items.
 * @apiBody {Number} items.menuItemId Menu item ID.
 * @apiBody {Number} items.quantity Quantity of the menu item.
 * @apiBody {String} pickupTime Requested pickup date and time.
 *
 * @apiSuccess (201) {Number} id Order ID.
 * @apiSuccess (201) {Number} customerId Customer ID.
 * @apiSuccess (201) {Object[]} items Ordered items.
 * @apiSuccess (201) {String} pickupTime Pickup date and time.
 * @apiSuccess (201) {String} status Order status.
 * @apiSuccess (201) {Number} totalPrice Total order price.
 *
 * @apiError (400) BadRequest Invalid order data.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Customer ID does not match authenticated user.
 * @apiError (404) NotFound Customer or menu item not found.
 */
router.post("/", authenticateToken, createOrder);

/**
 * @api {get} /api/orders Get all orders
 * @apiName GetAllOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 *
 * @apiSuccess {Object[]} orders List of all orders.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Admin access required.
 * @apiError (500) ServerError Failed to fetch orders.
 */
router.get("/", authenticateToken, requireAdmin, getAllOrders);

/**
 * @api {get} /api/orders/customer/:customerId Get customer orders
 * @apiName GetCustomerOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer JWT token.
 * @apiParam {Number} customerId Customer ID.
 *
 * @apiSuccess {Object[]} orders Customer orders.
 * @apiError (400) BadRequest Invalid customer ID.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Customers can only view their own orders.
 * @apiError (500) ServerError Failed to fetch customer orders.
 */
router.get("/customer/:customerId", authenticateToken, getCustomerOrders);

/**
 * @api {get} /api/orders/:id Get order by ID
 * @apiName GetOrderById
 * @apiGroup Orders
 *
 * @apiParam {Number} id Order ID.
 *
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {Number} customerId Customer ID.
 * @apiSuccess {String} orderDate Order creation date and time.
 * @apiSuccess {String} status Order status.
 * @apiSuccess {Number} totalPrice Total order price.
 * @apiSuccess {String} pickupTime Pickup date and time.
 * @apiSuccess {Object[]} items Ordered items.
 *
 * @apiError (400) BadRequest Invalid order ID.
 * @apiError (404) NotFound Order not found.
 * @apiError (500) ServerError Failed to fetch order.
 */
router.get("/:id", authenticateToken, getOrderById);

/**
 * @api {patch} /api/orders/:id/status Update order status
 * @apiName UpdateOrderStatus
 * @apiGroup Orders
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 *
 * @apiParam {Number} id Order ID.
 * @apiBody {String="pending","preparing","ready","completed","cancelled"} status New order status.
 *
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {String} status Updated order status.
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) BadRequest Invalid order ID or status.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Admin access required.
 * @apiError (404) NotFound Order not found.
 * @apiError (500) ServerError Failed to update order status.
 */
router.patch("/:id/status", authenticateToken, requireAdmin, updateOrderStatus);

export default router;
