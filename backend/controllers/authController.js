import bcrypt from "bcryptjs";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body || {};

    // Required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // email validation
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        message: "Invalid email address",
      });
    }

    // Minimum password length
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // Check the email is already exists
    const [existingCustomers] = await pool.execute(
      "SELECT customer_id FROM customer WHERE email = ?",
      [normalizedEmail],
    );

    if (existingCustomers.length > 0) {
      return res.status(409).json({
        message: "Email is already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      `INSERT INTO customer (name, email, phone, password, role)
       VALUES (?, ?, ?, ?, 'customer')`,
      [name.trim(), normalizedEmail, phone || null, hashedPassword],
    );

    return res.status(201).json({
      message: "Registration successful",
      customer: {
        customerId: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        phone: phone || null,
        role: "customer",
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const [customers] = await pool.execute(
      `SELECT customer_id, name, email, phone, password, role
       FROM customer
       WHERE email = ?`,
      [normalizedEmail],
    );

    if (customers.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const customer = customers[0];

    const passwordMatches = await bcrypt.compare(password, customer.password);

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        customerId: customer.customer_id,
        role: customer.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      customer: {
        customerId: customer.customer_id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const [customers] = await pool.execute(
      `SELECT customer_id, name, email, phone, role
       FROM customer
       WHERE customer_id = ?`,
      [req.user.customerId],
    );

    if (customers.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    const customer = customers[0];

    return res.status(200).json({
      customer: {
        customerId: customer.customer_id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        role: customer.role,
      },
    });
  } catch (error) {
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
