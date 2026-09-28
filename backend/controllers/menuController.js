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

// POST /api/menu - Admin only
export const createMenuItem = async (req, res) => {
  try {
    const {
      name,
      nameFi,
      description,
      descriptionFi,
      price,
      dayOfWeek,
      glutenFree = false,
      lactoseFree = false,
      vegetarian = false,
      vegan = false,
    } = req.body || {};

    if (!name || price === undefined || !dayOfWeek) {
      return res.status(400).json({
        message: "Name, price and dayOfWeek are required",
      });
    }

    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Price must be a valid non-negative number",
      });
    }

    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if (!validDays.includes(dayOfWeek)) {
      return res.status(400).json({
        message:
          "dayOfWeek must be Monday, Tuesday, Wednesday, Thursday or Friday",
      });
    }

    const [result] = await pool.execute(
      `INSERT INTO menu_item
       (
         name,
         name_fi,
         description,
         description_fi,
         price,
         day_of_week,
         gluten_free,
         lactose_free,
         vegetarian,
         vegan
       )
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name.trim(),
        nameFi?.trim() || null,
        description?.trim() || null,
        descriptionFi?.trim() || null,
        numericPrice,
        dayOfWeek,
        Boolean(glutenFree),
        Boolean(lactoseFree),
        Boolean(vegetarian),
        Boolean(vegan),
      ],
    );

    return res.status(201).json({
      message: "Menu item created successfully",
      menuItem: {
        id: result.insertId,
        name: name.trim(),
        nameFi: nameFi?.trim() || null,
        description: description?.trim() || null,
        descriptionFi: descriptionFi?.trim() || null,
        price: numericPrice,
        dayOfWeek,
        glutenFree: Boolean(glutenFree),
        lactoseFree: Boolean(lactoseFree),
        vegetarian: Boolean(vegetarian),
        vegan: Boolean(vegan),
      },
    });
  } catch (error) {
    console.error("Error creating menu item:", error);

    return res.status(500).json({
      message: "Failed to create menu item",
    });
  }
};
// PATCH /api/menu/:id - Admin only
export const updateMenuItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid menu item ID",
      });
    }

    const [existingRows] = await pool.execute(
      "SELECT * FROM menu_item WHERE menu_item_id = ?",
      [id],
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    const existing = existingRows[0];

    const {
      name = existing.name,
      nameFi = existing.name_fi,
      description = existing.description,
      descriptionFi = existing.description_fi,
      price = existing.price,
      dayOfWeek = existing.day_of_week,
      glutenFree = existing.gluten_free,
      lactoseFree = existing.lactose_free,
      vegetarian = existing.vegetarian,
      vegan = existing.vegan,
    } = req.body || {};

    const numericPrice = Number(price);

    if (!name || !Number.isFinite(numericPrice) || numericPrice < 0) {
      return res.status(400).json({
        message: "Invalid name or price",
      });
    }

    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    if (!validDays.includes(dayOfWeek)) {
      return res.status(400).json({
        message: "Invalid dayOfWeek",
      });
    }

    await pool.execute(
      `UPDATE menu_item
       SET name = ?,
           name_fi = ?,
           description = ?,
           description_fi = ?,
           price = ?,
           day_of_week = ?,
           gluten_free = ?,
           lactose_free = ?,
           vegetarian = ?,
           vegan = ?
       WHERE menu_item_id = ?`,
      [
        name,
        nameFi,
        description,
        descriptionFi,
        numericPrice,
        dayOfWeek,
        Boolean(glutenFree),
        Boolean(lactoseFree),
        Boolean(vegetarian),
        Boolean(vegan),
        id,
      ],
    );

    return res.status(200).json({
      message: "Menu item updated successfully",
      id,
    });
  } catch (error) {
    console.error("Error updating menu item:", error);

    return res.status(500).json({
      message: "Failed to update menu item",
    });
  }
};

// DELETE /api/menu/:id - Admin only
export const deleteMenuItem = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({
        message: "Invalid menu item ID",
      });
    }

    const [existingRows] = await pool.execute(
      "SELECT menu_item_id FROM menu_item WHERE menu_item_id = ?",
      [id],
    );

    if (existingRows.length === 0) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    await pool.execute("DELETE FROM menu_item WHERE menu_item_id = ?", [id]);

    return res.status(200).json({
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);

    return res.status(500).json({
      message: "Failed to delete menu item",
    });
  }
};
