import express from "express";

import {
  getAllMenuItems,
  getTodayMenu,
  getLunchMenu,
  getFineDiningMenu,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

import {
  authenticateToken,
  requireAdmin,
} from "../middleware/authMiddleware.js";

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
 * @api {post} /api/menu Create a menu item
 * @apiName CreateMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 *
 * @apiBody {String} name Menu item name.
 * @apiBody {String} [nameFi] Finnish menu item name.
 * @apiBody {String} [description] Menu item description.
 * @apiBody {String} [descriptionFi] Finnish description.
 * @apiBody {Number} price Menu item price.
 * @apiBody {String} dayOfWeek Monday-Friday.
 * @apiBody {Boolean} [glutenFree=false] Gluten-free status.
 * @apiBody {Boolean} [lactoseFree=false] Lactose-free status.
 * @apiBody {Boolean} [vegetarian=false] Vegetarian status.
 * @apiBody {Boolean} [vegan=false] Vegan status.
 *
 * @apiSuccess (201) {String} message Menu item created successfully.
 *
 * @apiError (400) BadRequest Invalid or missing menu item data.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Admin access required.
 * @apiError (500) ServerError Failed to create menu item.
 */
router.post("/", authenticateToken, requireAdmin, createMenuItem);

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
 * @api {get} /api/menu/lunch Get lunch menu
 * @apiName GetLunchMenu
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menuItems Lunch menu items.
 * @apiError (500) ServerError Failed to fetch lunch menu.
 */
router.get("/lunch", getLunchMenu);

/**
 * @api {get} /api/menu/fine-dining Get fine dining menu
 * @apiName GetFineDiningMenu
 * @apiGroup Menu
 *
 * @apiSuccess {Object[]} menuItems Fine dining menu items.
 * @apiError (500) ServerError Failed to fetch fine dining menu.
 */
router.get("/fine-dining", getFineDiningMenu);

/**
 * @api {patch} /api/menu/:id Update a menu item
 * @apiName UpdateMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 *
 * @apiParam {Number} id Menu item ID.
 *
 * @apiBody {String} [name] Menu item name.
 * @apiBody {String} [nameFi] Finnish menu item name.
 * @apiBody {String} [description] Menu item description.
 * @apiBody {String} [descriptionFi] Finnish description.
 * @apiBody {Number} [price] Menu item price.
 * @apiBody {String} [dayOfWeek] Monday-Friday.
 * @apiBody {Boolean} [glutenFree] Gluten-free status.
 * @apiBody {Boolean} [lactoseFree] Lactose-free status.
 * @apiBody {Boolean} [vegetarian] Vegetarian status.
 * @apiBody {Boolean} [vegan] Vegan status.
 *
 * @apiSuccess {String} message Menu item updated successfully.
 *
 * @apiError (400) BadRequest Invalid menu item ID or data.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Admin access required.
 * @apiError (404) NotFound Menu item not found.
 * @apiError (500) ServerError Failed to update menu item.
 */
router.patch("/:id", authenticateToken, requireAdmin, updateMenuItem);

/**
 * @api {delete} /api/menu/:id Delete a menu item
 * @apiName DeleteMenuItem
 * @apiGroup Menu
 *
 * @apiHeader {String} Authorization Bearer JWT token (admin only).
 *
 * @apiParam {Number} id Menu item ID.
 *
 * @apiSuccess {String} message Menu item deleted successfully.
 *
 * @apiError (400) BadRequest Invalid menu item ID.
 * @apiError (401) Unauthorized Authentication token required or invalid.
 * @apiError (403) Forbidden Admin access required.
 * @apiError (404) NotFound Menu item not found.
 * @apiError (500) ServerError Failed to delete menu item.
 */
router.delete("/:id", authenticateToken, requireAdmin, deleteMenuItem);

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
