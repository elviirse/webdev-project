# Fine Dining Restaurant Database

This is the database for our Fine Dining Lunch Restaurant website.

The database is used for customers, menu items, ingredients, allergens and table reservations.

## Database

Database name: fine_dining_restaurant

## Files

schema.sql

This file creates the database and tables.

seed.sql

This file adds some sample data for testing.

## Tables

customer

Stores customer information.

restaurant_table

Stores restaurant table information.

menu_item

Stores menu items.

ingredients

Stores ingredients used in menu items.

menu_item_ingredients

Connects menu items with ingredients.

allergen

Stores allergen information.

ingredients_allergen

Connects ingredients with allergens.

opening_hours

Stores the restaurant opening hours.

reservation

Stores table reservation information.

## Relationships

A customer can make reservations.

A reservation is connected to one customer and one restaurant table.

A menu item can have many ingredients.

An ingredient can be used in many menu items.

An ingredient can have allergens.

The opening_hours table stores the opening and closing time of the restaurant.

## How to Run

Run schema.sql first.

Then run seed.sql.

After running both files, the database is ready for testing.

## Project

Fine Dining Lunch Restaurant Website