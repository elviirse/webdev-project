CREATE DATABASE IF NOT EXISTS fine_dining_restaurant;

USE fine_dining_restaurant;


CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(30),
    password VARCHAR(255) NOT NULL
);


CREATE TABLE restaurant_table (
    table_id INT AUTO_INCREMENT PRIMARY KEY,
    table_number INT NOT NULL UNIQUE,
    capacity INT NOT NULL,
    status VARCHAR(30) DEFAULT 'available'
);


CREATE TABLE menu_item (
    menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL
);


CREATE TABLE ingredients (
    ingredient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE allergen (
    allergen_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE opening_hours (
    opening_hours_id INT AUTO_INCREMENT PRIMARY KEY,
    day_of_week VARCHAR(20) NOT NULL,
    open_time TIME,
    close_time TIME
);


CREATE TABLE reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    table_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    guests INT NOT NULL,
    special_request TEXT,
    status VARCHAR(30) DEFAULT 'pending',

    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id),

    FOREIGN KEY (table_id)
        REFERENCES restaurant_table(table_id)
);


CREATE TABLE menu_item_ingredient (
    menu_item_id INT NOT NULL,
    ingredient_id INT NOT NULL,

    PRIMARY KEY (menu_item_id, ingredient_id),

    FOREIGN KEY (menu_item_id)
        REFERENCES menu_item(menu_item_id),

    FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(ingredient_id)
);


CREATE TABLE ingredient_allergen (
    ingredient_id INT NOT NULL,
    allergen_id INT NOT NULL,

    PRIMARY KEY (ingredient_id, allergen_id),

    FOREIGN KEY (ingredient_id)
        REFERENCES ingredients(ingredient_id),

    FOREIGN KEY (allergen_id)
        REFERENCES allergen(allergen_id)
);


CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) DEFAULT 'pending',
    total_price DECIMAL(10,2) DEFAULT 0.00,

    FOREIGN KEY (customer_id)
        REFERENCES customer(customer_id)
);


CREATE TABLE order_item (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id),

    FOREIGN KEY (menu_item_id)
        REFERENCES menu_item(menu_item_id)
);