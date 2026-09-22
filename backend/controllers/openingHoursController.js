import pool from "../config/db.js";

// GET /api/opening-hours
export const getOpeningHours = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        opening_hours_id AS id,
        day_of_week AS dayOfWeek,
        TIME_FORMAT(open_time, '%H:%i') AS openTime,
        TIME_FORMAT(close_time, '%H:%i') AS closeTime
      FROM opening_hours
      ORDER BY opening_hours_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching opening hours:", error);

    res.status(500).json({
      message: "Failed to fetch opening hours",
    });
  }
};
