import express from "express";

import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

/**
 * @api {post} /api/orders Create a new order
 * @apiName CreateOrder
 * @apiGroup Orders
 *
 * @apiBody {Number} customerId Customer ID.
 * @apiBody {Object[]} items List of ordered items.
 * @apiBody {Number} items.menuItemId Menu item ID.
 * @apiBody {Number} items.quantity Quantity of the menu item.
 * @apiBody {String} [pickupTime] Requested pickup date and time.
 *
 * @apiSuccess (201) {Number} id Order ID.
 * @apiSuccess (201) {Number} customerId Customer ID.
 * @apiSuccess (201) {Object[]} items Ordered items.
 * @apiSuccess (201) {String} pickupTime Pickup date and time.
 * @apiSuccess (201) {String} status Order status.
 * @apiSuccess (201) {Number} totalPrice Total order price.
 *
 * @apiError (400) BadRequest Invalid order data.
 * @apiError (404) NotFound Customer or menu item not found.
 */
router.post("/", createOrder);

/**
 * @api {get} /api/orders Get all orders
 * @apiName GetAllOrders
 * @apiGroup Orders
 *
 * @apiSuccess {Object[]} orders List of all orders.
 * @apiSuccess {Number} orders.id Order ID.
 * @apiSuccess {Number} orders.customerId Customer ID.
 * @apiSuccess {String} orders.orderDate Order creation date and time.
 * @apiSuccess {String} orders.status Order status.
 * @apiSuccess {Number} orders.totalPrice Total order price.
 * @apiSuccess {String} orders.pickupTime Pickup date and time.
 *
 * @apiError (500) ServerError Failed to fetch orders.
 */
router.get("/", getAllOrders);

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
router.get("/:id", getOrderById);

/**
 * @api {patch} /api/orders/:id/status Update order status
 * @apiName UpdateOrderStatus
 * @apiGroup Orders
 *
 * @apiParam {Number} id Order ID.
 * @apiBody {String="pending","preparing","ready","completed","cancelled"} status New order status.
 *
 * @apiSuccess {Number} id Order ID.
 * @apiSuccess {String} status Updated order status.
 * @apiSuccess {String} message Success message.
 *
 * @apiError (400) BadRequest Invalid order ID or status.
 * @apiError (404) NotFound Order not found.
 * @apiError (500) ServerError Failed to update order status.
 */
router.patch("/:id/status", updateOrderStatus);

export default router;
