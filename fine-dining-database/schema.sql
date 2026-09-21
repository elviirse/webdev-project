CREATE DATABASE fine_dining_restaurant;

USE fine_dining_restaurant;

CREATE TABLE customer (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(30),
    password VARCHAR(255)
);

CREATE TABLE restaurant_table (
    table_id INT PRIMARY KEY AUTO_INCREMENT,
    table_number INT,
    capacity INT,
    status VARCHAR(30)
);

CREATE TABLE menu_item (
    menu_item_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2)
);

CREATE TABLE ingredients (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE allergen (
    allergen_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

CREATE TABLE opening_hours (
    opening_hours_id INT PRIMARY KEY AUTO_INCREMENT,
    day_of_week VARCHAR(20),
    open_time TIME,
    close_time TIME
);

CREATE TABLE reservation (
    reservation_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    table_id INT,
    reservation_date DATE,
    reservation_time TIME,
    guests INT,
    special_request TEXT,
    status VARCHAR(30),

    FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
    FOREIGN KEY (table_id) REFERENCES restaurant_table(table_id)
);

CREATE TABLE menu_item_ingredients (
    menu_item_id INT,
    ingredient_id INT,

    PRIMARY KEY (menu_item_id, ingredient_id),

    FOREIGN KEY (menu_item_id) REFERENCES menu_item(menu_item_id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id)
);

CREATE TABLE ingredients_allergen (
    ingredient_id INT,
    allergen_id INT,

    PRIMARY KEY (ingredient_id, allergen_id),

    FOREIGN KEY (ingredient_id) REFERENCES ingredients(ingredient_id),
    FOREIGN KEY (allergen_id) REFERENCES allergen(allergen_id)
);