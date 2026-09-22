import pool from "../config/db.js";

// POST /api/reservations
export const createReservation = async (req, res) => {
  try {
    const { customerId, tableId, date, time, numberOfGuests, specialRequests } =
      req.body;

    if (
      !customerId ||
      Number(customerId) < 1 ||
      !tableId ||
      Number(tableId) < 1 ||
      !date ||
      !time ||
      numberOfGuests === undefined
    ) {
      return res.status(400).json({
        message:
          "Valid customer ID, table ID, date, time and number of guests are required",
      });
    }

    if (Number(numberOfGuests) < 1) {
      return res.status(400).json({
        message: "Number of guests must be at least 1",
      });
    }

    // Check that the customer exists
    const [customers] = await pool.query(
      `SELECT customer_id
       FROM customer
       WHERE customer_id = ?`,
      [Number(customerId)],
    );

    if (customers.length === 0) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // Check that the table exists
    const [tables] = await pool.query(
      `SELECT table_id, capacity, status
       FROM restaurant_table
       WHERE table_id = ?`,
      [Number(tableId)],
    );

    if (tables.length === 0) {
      return res.status(404).json({
        message: "Table not found",
      });
    }

    if (Number(numberOfGuests) > tables[0].capacity) {
      return res.status(400).json({
        message: "Number of guests exceeds table capacity",
      });
    }

    const [result] = await pool.query(
      `INSERT INTO reservation
       (
         customer_id,
         table_id,
         reservation_date,
         reservation_time,
         guests,
         special_request,
         status
       )
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        Number(customerId),
        Number(tableId),
        date,
        time,
        Number(numberOfGuests),
        specialRequests || null,
        "pending",
      ],
    );

    res.status(201).json({
      id: result.insertId,
      customerId: Number(customerId),
      tableId: Number(tableId),
      date,
      time,
      numberOfGuests: Number(numberOfGuests),
      specialRequests: specialRequests || null,
      status: "pending",
    });
  } catch (error) {
    console.error("Error creating reservation:", error);

    res.status(500).json({
      message: "Failed to create reservation",
    });
  }
};

// GET /api/reservations
export const getAllReservations = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        reservation_id AS id,
        customer_id AS customerId,
        table_id AS tableId,
       DATE_FORMAT(reservation_date, '%Y-%m-%d') AS date,
        reservation_time AS time,
        guests AS numberOfGuests,
        special_request AS specialRequests,
        status
      FROM reservation
      ORDER BY reservation_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching reservations:", error);

    res.status(500).json({
      message: "Failed to fetch reservations",
    });
  }
};

// GET /api/reservations/:id
export const getReservationById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid reservation ID",
      });
    }

    const [rows] = await pool.query(
      `SELECT
        reservation_id AS id,
        customer_id AS customerId,
        table_id AS tableId,
        DATE_FORMAT(reservation_date, '%Y-%m-%d') AS date,
        reservation_time AS time,
        guests AS numberOfGuests,
        special_request AS specialRequests,
        status
       FROM reservation
       WHERE reservation_id = ?`,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error fetching reservation:", error);

    res.status(500).json({
      message: "Failed to fetch reservation",
    });
  }
};

// PATCH /api/reservations/:id/status
export const updateReservationStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body || {};

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid reservation ID",
      });
    }

    const allowedStatuses = ["pending", "confirmed", "cancelled", "completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid reservation status",
      });
    }

    const [result] = await pool.query(
      `UPDATE reservation
       SET status = ?
       WHERE reservation_id = ?`,
      [status, id],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    res.json({
      id,
      status,
      message: "Reservation status updated successfully",
    });
  } catch (error) {
    console.error("Error updating reservation status:", error);

    res.status(500).json({
      message: "Failed to update reservation status",
    });
  }
};
