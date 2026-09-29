import pool from "../config/db.js";

// GET /api/tables
export const getAllTables = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        table_id AS id,
        table_number AS tableNumber,
        capacity,
        status
      FROM restaurant_table
      ORDER BY table_number
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching tables:", error);

    res.status(500).json({
      message: "Failed to fetch tables",
    });
  }
};

// GET /api/tables/available?date=2026-10-10&time=13:30&guests=4
export const getAvailableTables = async (req, res) => {
  try {
    const { date, time, guests } = req.query;
    const numberOfGuests = Number(guests);

    if (
      !date ||
      !time ||
      !Number.isInteger(numberOfGuests) ||
      numberOfGuests < 1
    ) {
      return res.status(400).json({
        message: "Valid date, time and number of guests are required",
      });
    }

    // Validate date and time format
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const timePattern = /^([01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/;

    if (!datePattern.test(date) || !timePattern.test(time)) {
      return res.status(400).json({
        message: "Invalid date or time format",
      });
    }

    // Validate actual calendar date
    const [year, month, day] = date.split("-").map(Number);
    const validDate = new Date(year, month - 1, day);

    if (
      validDate.getFullYear() !== year ||
      validDate.getMonth() !== month - 1 ||
      validDate.getDate() !== day
    ) {
      return res.status(400).json({
        message: "Invalid reservation date",
      });
    }

    const normalizedTime = time.length === 5 ? `${time}:00` : time;

    // MySQL DATETIME format
    const reservationDateTime = `${date} ${normalizedTime}`;

    const [rows] = await pool.query(
      `
      SELECT
        rt.table_id AS id,
        rt.table_number AS tableNumber,
        rt.capacity,
        rt.status
      FROM restaurant_table rt
      WHERE rt.capacity >= ?
        AND rt.status = 'available'
        AND NOT EXISTS (
          SELECT 1
          FROM reservation r
          WHERE r.table_id = rt.table_id
            AND r.reservation_datetime = ?
            AND r.status IN ('pending', 'confirmed')
        )
      ORDER BY rt.capacity, rt.table_number
      `,
      [numberOfGuests, reservationDateTime],
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching available tables:", error);

    res.status(500).json({
      message: "Failed to fetch available tables",
    });
  }
};
