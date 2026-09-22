USE fine_dining_restaurant;

INSERT INTO customer (name, email, phone, password) VALUES
('Customer One', 'customer1@example.com', '0000000001', 'password1'),
('Customer Two', 'customer2@example.com', '0000000002', 'password2');

INSERT INTO restaurant_table (table_number, capacity, status) VALUES
(1, 2, 'available'),
(2, 4, 'available'),
(3, 4, 'available'),
(4, 6, 'available');

INSERT INTO menu_item (name, description, price) VALUES
('Menu Item One', 'Description for menu item one', 10.00),
('Menu Item Two', 'Description for menu item two', 15.00),
('Menu Item Three', 'Description for menu item three', 20.00);

INSERT INTO ingredients (name) VALUES
('Ingredient One'),
('Ingredient Two'),
('Ingredient Three'),
('Ingredient Four');

INSERT INTO allergen (name) VALUES
('Allergen One'),
('Allergen Two'),
('Allergen Three');

INSERT INTO opening_hours (day_of_week, open_time, close_time) VALUES
('Monday', '11:00:00', '20:00:00'),
('Tuesday', '11:00:00', '20:00:00'),
('Wednesday', '11:00:00', '20:00:00'),
('Thursday', '11:00:00', '20:00:00'),
('Friday', '11:00:00', '21:00:00'),
('Saturday', '12:00:00', '21:00:00'),
('Sunday', '12:00:00', '18:00:00');

INSERT INTO reservation
(customer_id, table_id, reservation_date, reservation_time, guests, special_request, status)
VALUES
(1, 2, '2026-10-01', '13:00:00', 2, 'No special request', 'confirmed'),
(2, 1, '2026-10-02', '14:00:00', 2, 'No special request', 'pending');

INSERT INTO menu_item_ingredient (menu_item_id, ingredient_id) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(3, 3),
(3, 4);

INSERT INTO ingredient_allergen (ingredient_id, allergen_id) VALUES
(1, 1),
(2, 2),
(3, 3);

INSERT INTO orders
(customer_id, status, total_price)
VALUES
(1, 'confirmed', 25.00),
(2, 'pending', 20.00);

INSERT INTO order_item
(order_id, menu_item_id, quantity, price)
VALUES
(1, 1, 1, 10.00),
(1, 2, 1, 15.00),
(2, 3, 1, 20.00);