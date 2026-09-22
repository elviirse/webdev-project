import express from "express";

import {
  getAllMenuItems,
  getTodayMenu,
  getMenuItemById,
} from "../controllers/menuController.js";

const router = express.Router();

/**
 * @api {get} /api/menu Get all menu items
 * @apiName GetAllMenuItems
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menuItems List of all menu items.
 * @apiSuccess {Number} menuItems.id Menu item ID.
 * @apiSuccess {String} menuItems.name Menu item name.
 * @apiSuccess {String} menuItems.nameFi Finnish menu item name.
 * @apiSuccess {String} menuItems.description Menu item description.
 * @apiSuccess {String} menuItems.descriptionFi Finnish description.
 * @apiSuccess {Number} menuItems.price Menu item price.
 * @apiSuccess {String} menuItems.dayOfWeek Day when the item is served.
 * @apiSuccess {Boolean} menuItems.glutenFree Gluten-free status.
 * @apiSuccess {Boolean} menuItems.lactoseFree Lactose-free status.
 * @apiSuccess {Boolean} menuItems.vegetarian Vegetarian status.
 * @apiSuccess {Boolean} menuItems.vegan Vegan status.
 *
 * @apiError (500) ServerError Failed to fetch menu.
 */
router.get("/", getAllMenuItems);

/**
 * @api {get} /api/menu/today Get today's menu
 * @apiName GetTodayMenu
 * @apiGroup Menu
 *
 * @apiSuccess {String} day Current weekday.
 * @apiSuccess {Object[]} dishes Menu items available today.
 *
 * @apiError (500) ServerError Failed to fetch today's menu.
 */
router.get("/today", getTodayMenu);

/**
 * @api {get} /api/menu/:id Get menu item by ID
 * @apiName GetMenuItemById
 * @apiGroup Menu
 *
 * @apiParam {Number} id Menu item ID.
 *
 * @apiSuccess {Number} id Menu item ID.
 * @apiSuccess {String} name Menu item name.
 * @apiSuccess {String} nameFi Finnish menu item name.
 * @apiSuccess {String} description Menu item description.
 * @apiSuccess {String} descriptionFi Finnish description.
 * @apiSuccess {Number} price Menu item price.
 * @apiSuccess {String} dayOfWeek Day when the item is served.
 * @apiSuccess {Boolean} glutenFree Gluten-free status.
 * @apiSuccess {Boolean} lactoseFree Lactose-free status.
 * @apiSuccess {Boolean} vegetarian Vegetarian status.
 * @apiSuccess {Boolean} vegan Vegan status.
 * @apiSuccess {Object[]} ingredients Ingredients of the menu item.
 * @apiSuccess {Object[]} allergens Allergens of the menu item.
 *
 * @apiError (400) BadRequest Invalid menu item ID.
 * @apiError (404) NotFound Menu item not found.
 * @apiError (500) ServerError Failed to fetch menu item.
 */
router.get("/:id", getMenuItemById);

export default router;
