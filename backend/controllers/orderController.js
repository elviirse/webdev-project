import { menu } from "./menuController.js";

// Temporary order data
let orders = [];
let nextOrderId = 1;

// Create new order
export const createOrder = (req, res) => {
  const { customerId, items, pickupTime } = req.body;

  if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "Customer ID and order items are required",
    });
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = menu.find((food) => food.id === Number(item.menuItemId));

    if (!menuItem) {
      return res.status(400).json({
        message: `Menu item ${item.menuItemId} not found`,
      });
    }

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }

    totalPrice += menuItem.price * quantity;

    orderItems.push({
      menuItemId: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity,
    });
  }

  const newOrder = {
    id: nextOrderId++,
    customerId,
    items: orderItems,
    pickupTime,
    totalPrice: Number(totalPrice.toFixed(2)),
    status: "pending",
    createdAt: new Date(),
  };

  orders.push(newOrder);

  res.status(201).json({
    message: "Order created successfully",
    order: newOrder,
  });
};

// Get all orders
export const getAllOrders = (req, res) => {
  res.json(orders);
};

// Get order by ID
export const getOrderById = (req, res) => {
  const id = Number(req.params.id);

  const order = orders.find((order) => order.id === id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  res.json(order);
};

// Update order status
export const updateOrderStatus = (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "preparing",
    "ready",
    "completed",
    "cancelled",
  ];

  const order = orders.find((order) => order.id === id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid order status",
    });
  }

  order.status = status;

  res.json({
    message: "Order status updated successfully",
    order,
  });
};
