import pool from "../config/db.js";

// POST /api/orders
export const createOrder = async (req, res) => {
  const { customerId, items, pickupTime } = req.body;

  if (!customerId || Number(customerId) < 1) {
    return res.status(400).json({
      message: "Valid customer ID is required",
    });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Order must contain at least one item",
    });
  }

  // Pickup time validation
  if (!pickupTime) {
    return res.status(400).json({
      message: "Pickup time is required",
    });
  }

  const pickupDateTime = new Date(pickupTime);

  if (Number.isNaN(pickupDateTime.getTime())) {
    return res.status(400).json({
      message: "Invalid pickup time",
    });
  }

  if (pickupDateTime <= new Date()) {
    return res.status(400).json({
      message: "Pickup time must be in the future",
    });
  }

  let connection;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Check customer
    const [customers] = await connection.query(
      `SELECT customer_id
       FROM customer
       WHERE customer_id = ?`,
      [Number(customerId)],
    );

    if (customers.length === 0) {
      await connection.rollback();

      return res.status(404).json({
        message: "Customer not found",
      });
    }

    let totalPrice = 0;
    const orderItems = [];

    // Validate items and calculate total using DB prices
    for (const item of items) {
      const menuItemId = Number(item.menuItemId);
      const quantity = Number(item.quantity);

      if (!Number.isInteger(menuItemId) || menuItemId < 1) {
        throw new Error("Invalid menu item ID");
      }

      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error("Quantity must be at least 1");
      }

      const [menuRows] = await connection.query(
        `SELECT menu_item_id, price
         FROM menu_item
         WHERE menu_item_id = ?`,
        [menuItemId],
      );

      if (menuRows.length === 0) {
        throw new Error(`Menu item ${menuItemId} not found`);
      }

      const price = Number(menuRows[0].price);

      totalPrice += price * quantity;

      orderItems.push({
        menuItemId,
        quantity,
        price,
      });
    }

    // Create order
    const [orderResult] = await connection.query(
      `INSERT INTO orders
       (customer_id, status, total_price, pickup_time)
       VALUES (?, ?, ?, ?)`,
      [Number(customerId), "pending", totalPrice, pickupTime],
    );

    // Create order items
    for (const item of orderItems) {
      await connection.query(
        `INSERT INTO order_item
         (order_id, menu_item_id, quantity, price)
         VALUES (?, ?, ?, ?)`,
        [orderResult.insertId, item.menuItemId, item.quantity, item.price],
      );
    }

    await connection.commit();

    res.status(201).json({
      id: orderResult.insertId,
      customerId: Number(customerId),
      items: orderItems,
      pickupTime,
      status: "pending",
      totalPrice,
    });
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }

    console.error("Error creating order:", error);

    const validationErrors = [
      "Invalid menu item ID",
      "Quantity must be at least 1",
    ];

    if (
      validationErrors.includes(error.message) ||
      error.message.startsWith("Menu item ")
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create order",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// GET /api/orders
export const getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        order_id AS id,
        customer_id AS customerId,
        DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s') AS orderDate,
        status,
        total_price AS totalPrice,
        DATE_FORMAT(pickup_time, '%Y-%m-%d %H:%i:%s') AS pickupTime
      FROM orders
      ORDER BY order_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

// GET /api/orders/:id
export const getOrderById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const [orders] = await pool.query(
      `SELECT
        order_id AS id,
        customer_id AS customerId,
        DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s') AS orderDate,
        status,
        total_price AS totalPrice,
        DATE_FORMAT(pickup_time, '%Y-%m-%d %H:%i:%s') AS pickupTime
       FROM orders
       WHERE order_id = ?`,
      [id],
    );

    if (orders.length === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const [items] = await pool.query(
      `SELECT
        oi.menu_item_id AS menuItemId,
        mi.name,
        oi.quantity,
        oi.price
       FROM order_item oi
       JOIN menu_item mi
         ON oi.menu_item_id = mi.menu_item_id
       WHERE oi.order_id = ?`,
      [id],
    );

    res.json({
      ...orders[0],
      items,
    });
  } catch (error) {
    console.error("Error fetching order:", error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

// PATCH /api/orders/:id/status
export const updateOrderStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body || {};

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid order ID",
      });
    }

    const allowedStatuses = [
      "pending",
      "preparing",
      "ready",
      "completed",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const [result] = await pool.query(
      `UPDATE orders
       SET status = ?
       WHERE order_id = ?`,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.json({
      id,
      status,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    res.status(500).json({
      message: "Failed to update order status",
    });
  }
};
