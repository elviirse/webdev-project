import pool from "../config/db.js";

// GET /api/menu
export const getAllMenuItems = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        menu_item_id AS id,
        name,
        name_fi AS nameFi,
        description,
        description_fi AS descriptionFi,
        price,
        day_of_week AS dayOfWeek,
        gluten_free AS glutenFree,
        lactose_free AS lactoseFree,
        vegetarian,
        vegan
      FROM menu_item
      ORDER BY menu_item_id
    `);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching menu:", error);

    res.status(500).json({
      message: "Failed to fetch menu",
    });
  }
};

// GET /api/menu/today
export const getTodayMenu = async (req, res) => {
  try {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });

    const [rows] = await pool.query(
      `
      SELECT
        menu_item_id AS id,
        name,
        name_fi AS nameFi,
        description,
        description_fi AS descriptionFi,
        price,
        day_of_week AS dayOfWeek,
        gluten_free AS glutenFree,
        lactose_free AS lactoseFree,
        vegetarian,
        vegan
      FROM menu_item
      WHERE day_of_week = ?
      ORDER BY menu_item_id
      `,
      [today],
    );

    res.json({
      day: today,
      dishes: rows,
    });
  } catch (error) {
    console.error("Error fetching today's menu:", error);

    res.status(500).json({
      message: "Failed to fetch today's menu",
    });
  }
};

// GET /api/menu/:id
export const getMenuItemById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid menu item ID",
      });
    }

    // Get menu item
    const [rows] = await pool.query(
      `
      SELECT
        menu_item_id AS id,
        name,
        name_fi AS nameFi,
        description,
        description_fi AS descriptionFi,
        price,
        day_of_week AS dayOfWeek,
        gluten_free AS glutenFree,
        lactose_free AS lactoseFree,
        vegetarian,
        vegan
      FROM menu_item
      WHERE menu_item_id = ?
      `,
      [id],
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    // Get ingredients
    const [ingredients] = await pool.query(
      `
      SELECT
        i.ingredient_id AS id,
        i.name,
        i.name_fi AS nameFi
      FROM ingredients i
      JOIN menu_item_ingredient mii
        ON i.ingredient_id = mii.ingredient_id
      WHERE mii.menu_item_id = ?
      `,
      [id],
    );

    // Get allergens
    const [allergens] = await pool.query(
      `
      SELECT DISTINCT
        a.allergen_id AS id,
        a.name,
        a.name_fi AS nameFi
      FROM allergen a
      JOIN ingredient_allergen ia
        ON a.allergen_id = ia.allergen_id
      JOIN menu_item_ingredient mii
        ON ia.ingredient_id = mii.ingredient_id
      WHERE mii.menu_item_id = ?
      `,
      [id],
    );

    res.json({
      ...rows[0],
      ingredients,
      allergens,
    });
  } catch (error) {
    console.error("Error fetching menu item:", error);

    res.status(500).json({
      message: "Failed to fetch menu item",
    });
  }
};
