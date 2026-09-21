import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Temporary JSON data.
// Later this will be replaced with Sakib's MySQL database.
const menuPath = path.join(__dirname, "../data/menu.json");

export const menu = JSON.parse(fs.readFileSync(menuPath, "utf-8"));

// GET /api/menu
export const getAllMenuItems = (req, res) => {
  res.json(menu);
};

// GET /api/menu/today
export const getTodayMenu = (req, res) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
  });

  const todayMenu = menu.find((dayMenu) => dayMenu.day === today);

  res.json({
    day: today,
    dishes: todayMenu ? todayMenu.dishes : [],
  });
};

// GET /api/menu/:id
export const getMenuItemById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "Invalid menu item ID",
    });
  }

  const allDishes = menu.flatMap((dayMenu) => dayMenu.dishes);

  const item = allDishes.find((dish) => dish.id === id);

  if (!item) {
    return res.status(404).json({
      message: "Menu item not found",
    });
  }

  res.json(item);
};
