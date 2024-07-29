
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE member (
    member_id SERIAL PRIMARY KEY, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    birthday date NOT NULL,
    phone char(8) NOT NULL UNIQUE,
    email varchar(150) UNIQUE, 
    passwordhash varchar(50) NOT NULL
);


INSERT INTO member (member_id, firstName, lastName, birthday, phone, email, passwordhash)
    VALUES (1, 'Ying Xuan', 'Ling', '2000-07-18', '88152902', 'yingxuan@gmail.com', '44f0185d20eebde9932b365c29cb09bf'),
        (2, 'Jumana', 'Haseen', '1999-01-01', '94459502', 'jumana@gmail.com', '18e8657032c4eb7390d2085e0bacc500'),
        (3, 'Guorong', 'Wu', '1992-02-02', '91385447', 'guorong@gmail.com', '19e92ba5a6dae8dc4c78d950ce187f1d'),
        (4, 'Wilson', 'Gwee', '1994-05-05', '83885674', 'wilson.gwee@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (5, 'Quim', 'Mohammad', '1995-06-06', '81614144', 'quim@gmail.com', '61eef8483a359479dbe68385b17fc55b'),
        (6, 'Suet Sin', 'Chen', '2000-07-09', '81306639', 'suetsinchen@gmail.com', '2c3351dbd2b3f1d4bda62f707174fe2c'),
        (7, 'Christine', 'Wong', '1994-06-28', '98345672', 'christine@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (8, 'Rachel', 'Tang', '1999-03-22', '82407754', 'rachel@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (9, 'Nancy', 'Cheah', '2000-10-01', '82377463', 'nancy@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (10, 'Irvine', 'Loh', '1994-02-05', '98119816', 'irvine@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (11, 'Cynthia', 'Foo', '1999-02-02', '82549264', 'cynthia@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (12, 'Stephanie', 'Tie', '1999-08-08', '93678250', 'stephanie@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (13, 'Silviya', 'Tan', '1985-01-01', '98769876', 'silviya@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (14, 'Joli', 'Tay', '1995-05-05', '81268126', 'joli@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (15, 'Jenny', 'Chong', '1996-06-06', '87268726', 'jenny@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (16, 'Fiona', 'Loh', '2000-06-05', '86758675', 'fiona@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (17, 'Edward', 'Reyes', '1990-01-01', '86748674', 'edward@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (18, 'Rhaimax', 'Manibo', '1988-01-01', '87528752', 'rhaimax@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (19, 'Kathrina', 'Abuel', '1990-03-03', '98764325', 'kathrina@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b'),
        (20, 'Connie', 'Teh', '2002-02-02', '83648929', 'connie@gmail.com', '827ccb0eea8a706c4c34a16891f84e7b');


-- table created to store information of ingredients separately --  

-- ingredients for all products --

CREATE TABLE uom (
    uom_id SERIAL PRIMARY KEY, 
    uom_name VARCHAR(10) NOT NULL
); 

INSERT INTO uom (uom_name) 
    VALUES ('gram(s)'), ('slice(s)'); 


CREATE TABLE product_type (
    product_type_id SERIAL PRIMARY KEY, 
    product_type_name VARCHAR(20) NOT NULL UNIQUE
); 

INSERT INTO product_type (product_type_name) 
    VALUES ('Bread'), ('Protein'), ('Vegetable'), ('Sauce'), ('Fruit'), ('Smoothie Vegetable'), ('Yogurt'), ('Liquid Base'); 

CREATE TABLE stores(
    store_id SERIAL PRIMARY KEY, 
    store_name VARCHAR(20) NOT NULL
);

INSERT INTO stores(store_name)
    VALUES('Suntec Flagship');

CREATE TABLE product (
    products_id SERIAL PRIMARY KEY, 
    product_type_id INT NOT NULL,
    product_name VARCHAR(100),
    image_path VARCHAR(100),
    price_point NUMERIC(3, 1),
    FOREIGN KEY (product_type_id) REFERENCES product_type(product_type_id)
); 

INSERT INTO product (product_type_id, product_name,image_path, price_point) 
    VALUES 
        (1, 'Sourdough', 'asset/sourdough.jpg', 0), 
        (1, 'Wholemeal', 'asset/wholemeal.jpg', 0),
        (1, 'Oat bread', 'asset/oatbread.jpg', 0.5),
        (1, 'Italian Herb', 'asset/italianherb.jpg', 0.5),
        (2, 'Lamb', 'asset/pulled-lamb.jpg', 0),  
        (2, 'Chicken', 'asset/chickenbreast.jpg', 0),
        (2, 'Beef', 'asset/beef.jpg', 2.5),
        (2, 'Salmon', 'asset/smokedsalmon.jpg', 3),
        (3, 'Lettuce', 'asset/iceberge-lettuce.png', 0), 
        (3, 'Tomato', 'asset/tomato.png', 0),
        (3, 'Cucumber', 'asset/cucumber.png', 0),
        (3, 'Onion', 'asset/onion.png', 0),
        (3, 'Bell Pepper', 'asset/bellpeppers.jpg', 0),
        (4, 'Cranberry Caramalised onion', 'asset/cranberry-sauce.jpeg', 0), 
        (4, 'Honey Mustard', 'asset/honeymustard.png', 0),
        (4, 'Egg Mayo', 'asset/egg-mayo.jpg', 0),
        (4, 'Avocado Lime Crema', 'asset/avocado-lime.png', 0),
        (4, 'BBQ', 'asset/bbq.jpg', 0),  
        (5, 'Banana', 'asset/banana.jpeg', 0),  
        (5, 'Blueberry', 'asset/blueberry.webp', 0),
        (5, 'Strawberry', 'asset/strawberry.jpg', 0),
        (5, 'Mango', 'asset/mango.jpg', 0),
        (5, 'Orange', 'asset/orange.jpg', 0), 
        (6, 'Spinach', 'asset/spinach.jpeg', 0.6), 
        (6, 'Kale', 'asset/kale.jpeg', 0.7),
        (6, 'Avocado', 'asset/avocado.webp', 1.2), 
        (7, 'Greek Yogurt', 'asset/greekyogurt.jpg', 2),
        (8, 'Low Fat Milk', 'asset/low-fat-milk.webp', 0), 
        (8, 'Full Cream Milk', 'asset/full-cream.jpg', 0),
        (8, 'Oat Milk', 'asset/oat-milk.jpg', 1) 
;


select * from product;

CREATE TABLE inventory (
    products_id INT, 
    store_id INT,
    quantity_amount INT NOT NULL,
    uom_id INT NOT NULL,
    FOREIGN KEY (uom_id) REFERENCES uom(uom_id), 
    FOREIGN KEY (products_id) REFERENCES product(products_id), 
    FOREIGN KEY (store_id) REFERENCES stores(store_id), 
    PRIMARY KEY (products_id, store_id)
    );

INSERT INTO inventory (products_id, store_id, quantity_amount, uom_id) 
    VALUES (1, 1, 100, 2),
        (2, 1, 100, 2),
        (3, 1, 100, 2),
        (4, 1, 100, 2),
        (5, 1, 8000, 1),
        (6, 1, 8000, 1),
        (7, 1, 8000, 1),
        (8, 1, 8000, 1),
        (9, 1, 5000, 1),
        (10, 1, 5000, 1),
        (11, 1, 5000, 1),
        (12, 1, 5000, 1),
        (13, 1, 5000, 1),
        (14, 1, 5000, 1),
        (15, 1, 5000, 1),
        (16, 1, 5000, 1),
        (17, 1, 5000, 1),
        (18, 1, 5000, 1),
        (19, 1, 10000, 1),
        (20, 1, 10000, 1),
        (21, 1, 10000, 1),
        (22, 1, 10000, 1),
        (23, 1, 10000, 1),
        (24, 1, 8000, 1),
        (25, 1, 8000, 1),
        (26, 1, 8000, 1),
        (27, 1, 8000, 1),
        (28, 1, 10000, 1),
        (29, 1, 10000, 1),
        (30, 1, 10000, 1);
-------------------------------------------------------------------------

-- SELECT * FROM member;
-- SELECT * FROM product 
-- INNER JOIN product_type ON product.product_type_id = product_type.product_type_id
-- INNER JOIN uom ON product.uom_id = uom.uom_id;

drop table orders;
CREATE TABLE orders ( 
    order_id SERIAL PRIMARY KEY, 
    member_id INT NOT NULL, 
    store_id INT NOT NULL, 
    created_at timestamp NOT NULL DEFAULT now(), 
    order_status varchar(10) NOT NULL,  
    CONSTRAINT chk_order_status CHECK (order_status IN ('ordered', 'preparing', 'ready', 'completed')), 
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);

INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (1, 6, 1, '2023-07-12 12:27:22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (2, 7, 1, '2023-07-12 15:32:15', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (3, 2, 1, '2023-07-15 04:29:44', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (4, 17, 1, '2023-07-13 16:51:16', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (5, 20, 1, '2023-08-01 17:00:55', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (6, 9, 1, '2023-08-07 16:27:41', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (7, 8, 1, '2023-08-08 20:48:03', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (8, 17, 1, '2023-08-24 21:09:23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (9, 17, 1, '2023-08-27 06:03:12', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (10, 19, 1, '2023-08-23 22:19:45', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (11, 5, 1, '2023-09-15 19:09:41', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (12, 13, 1, '2023-09-27 09:58:03', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (13, 7, 1, '2023-10-07 07:36:45', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (14, 16, 1, '2023-10-12 20:36:04', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (15, 19, 1, '2023-10-19 12:20:46', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (16, 16, 1, '2023-10-20 05:58:57', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (17, 8, 1, '2023-10-26 09:59:24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (18, 3, 1, '2023-10-29 04:03:45', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (19, 4, 1, '2023-11-06 16:39:27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (20, 19, 1, '2023-11-19 01:43:54', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (21, 4, 1, '2023-11-19 05:49:48', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (22, 3, 1, '2023-11-26 02:13:40', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (23, 20, 1, '2023-11-30 08:58:57', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (24, 18, 1, '2023-12-18 13:36:07', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (25, 17, 1, '2023-12-20 05:59:18', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (26, 19, 1, '2023-12-24 09:18:13', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (27, 18, 1, '2023-12-30 05:37:12', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (28, 13, 1, '2023-12-31 08:18:24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (29, 1, 1, '2024-01-19 07:22:53', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (30, 17, 1, '2024-01-26 12:01:11', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (31, 12, 1, '2024-02-01 07:28:25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (32, 19, 1, '2024-02-03 06:55:15', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (33, 19, 1, '2024-02-10 06:27:28', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (34, 1, 1, '2024-02-20 06:35:00', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (35, 8, 1, '2024-02-23 04:52:33', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (36, 8, 1, '2024-02-23 18:58:54', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (37, 11, 1, '2024-03-10 13:49:19', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (38, 15, 1, '2024-03-21 21:15:31', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (39, 20, 1, '2024-03-22 19:36:04', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (40, 1, 1, '2024-04-13 20:11:33', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (41, 2, 1, '2024-04-23 02:00:09', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (42, 6, 1, '2024-04-24 16:09:43', 'completed');
INSERT INTO orders (order_id, member_id, store_id, created_at, order_status) VALUES (43, 4, 1, '2024-04-22 21:32:13', 'completed');


SELECT * from orders;


CREATE TABLE orders_items ( 
    item_id SERIAL PRIMARY KEY,
    order_id INT, 
    item_type VARCHAR(10), --sandwich or smoothie--
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);


INSERT INTO orders_items (item_id, order_id, item_type) VALUES (1, 1, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (2, 1, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (3, 2, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (4, 2, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (5, 2, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (6, 3, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (7, 4, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (8, 5, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (9, 5, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (10, 6, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (11, 7, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (12, 8, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (13, 8, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (14, 9, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (15, 10, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (16, 10, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (17, 10, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (18, 11, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (19, 12, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (20, 13, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (21, 13, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (22, 14, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (23, 15, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (24, 16, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (25, 17, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (26, 18, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (27, 19, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (28, 20, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (29, 20, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (30, 21, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (31, 22, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (32, 23, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (33, 23, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (34, 24, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (35, 25, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (36, 26, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (37, 27, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (38, 28, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (39, 29, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (40, 30, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (41, 31, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (42, 32, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (43, 33, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (44, 34, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (45, 35, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (46, 36, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (47, 37, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (48, 38, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (49, 39, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (50, 40, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (51, 41, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (52, 42, 'smoothie');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (53, 43, 'sandwich');
INSERT INTO orders_items (item_id, order_id, item_type) VALUES (54, 43, 'smoothie');



CREATE TABLE item_ingredients ( 
    products_id INT NOT NULL,
    item_id INT NOT NULL, 
    FOREIGN KEY (item_id) REFERENCES orders_items(item_id), 
    FOREIGN KEY (products_id) REFERENCES product(products_id),
    PRIMARY KEY (products_id, item_id)
);


-- Item ID 1 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 1);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 1);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 1);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 1);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 1);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 1);

-- Item ID 2 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 2);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 2);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 2);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 2);

-- Item ID 3 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 3);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 3);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 3);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 3);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 3);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 3);

-- Item ID 4 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (20, 4);
INSERT INTO item_ingredients (products_id, item_id) VALUES (25, 4);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 4);
INSERT INTO item_ingredients (products_id, item_id) VALUES (30, 4);

-- Item ID 5 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 5);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 5);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 5);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 5);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 5);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 5);

-- Item ID 6 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 6);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 6);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 6);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 6);

-- Item ID 7 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 7);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 7);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 7);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 7);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 7);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 7);

-- Item ID 8 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 8);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 8);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 8);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 8);

-- Item ID 9 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 9);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 9);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 9);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 9);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 9);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 9);

-- Item ID 10 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 10);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 10);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 10);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 10);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 10);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 10);

-- Item ID 11 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 11);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 11);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 11);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 11);

-- Item ID 12 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 12);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 12);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 12);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 12);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 12);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 12);

-- Item ID 13 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 13);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 13);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 13);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 13);

-- Item ID 14 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 14);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 14);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 14);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 14);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 14);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 14);

-- Item ID 15 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 15);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 15);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 15);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 15);

-- Item ID 16 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 16);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 16);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 16);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 16);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 16);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 16);

-- Item ID 17 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 17);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 17);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 17);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 17);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 17);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 17);

-- Item ID 18 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 18);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 18);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 18);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 18);

-- Item ID 19 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 19);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 19);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 19);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 19);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 19);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 19);

-- Item ID 20 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 20);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 20);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 20);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 20);

-- Item ID 21 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 21);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 21);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 21);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 21);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 21);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 21);

-- Item ID 22 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 22);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 22);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 22);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 22);

-- Item ID 23 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 23);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 23);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 23);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 23);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 23);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 23);

-- Item ID 24 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 24);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 24);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 24);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 24);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 24);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 24);

-- Item ID 25 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 25);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 25);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 25);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 25);

-- Item ID 26 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 26);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 26);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 26);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 26);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 26);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 26);

-- Item ID 27 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 27);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 27);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 27);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 27);

-- Item ID 28 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 28);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 28);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 28);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 28);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 28);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 28);

-- Item ID 29 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 29);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 29);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 29);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 29);

-- Item ID 30 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 30);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 30);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 30);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 30);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 30);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 30);

-- Item ID 31 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 31);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 31);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 31);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 31);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 31);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 31);

-- Item ID 32 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 32);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 32);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 32);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 32);

-- Item ID 33 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 33);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 33);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 33);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 33);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 33);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 33);

-- Item ID 34 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 34);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 34);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 34);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 34);

-- Item ID 35 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 35);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 35);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 35);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 35);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 35);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 35);

-- Item ID 36 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 36);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 36);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 36);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 36);

-- Item ID 37 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 37);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 37);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 37);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 37);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 37);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 37);

-- Item ID 38 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 38);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 38);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 38);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 38);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 38);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 38);

-- Item ID 39 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 39);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 39);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 39);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 39);

-- Item ID 40 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 40);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 40);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 40);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 40);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 40);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 40);

-- Item ID 41 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 41);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 41);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 41);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 41);

-- Item ID 42 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 42);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 42);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 42);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 42);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 42);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 42);

-- Item ID 43 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 43);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 43);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 43);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 43);

-- Item ID 44 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 44);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 44);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 44);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 44);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 44);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 44);

-- Item ID 45 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 45);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 45);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 45);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 45);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 45);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 45);

-- Item ID 46 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 46);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 46);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 46);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 46);

-- Item ID 47 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 47);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 47);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 47);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 47);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 47);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 47);

-- Item ID 48 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (21, 48);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 48);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 48);
INSERT INTO item_ingredients (products_id, item_id) VALUES (29, 48);

-- Item ID 49 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (4, 49);
INSERT INTO item_ingredients (products_id, item_id) VALUES (8, 49);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 49);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 49);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 49);
INSERT INTO item_ingredients (products_id, item_id) VALUES (18, 49);

-- Item ID 50 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (22, 50);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 50);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 50);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 50);

-- Item ID 51 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (1, 51);
INSERT INTO item_ingredients (products_id, item_id) VALUES (5, 51);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 51);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 51);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 51);
INSERT INTO item_ingredients (products_id, item_id) VALUES (14, 51);

-- Item ID 52 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (2, 52);
INSERT INTO item_ingredients (products_id, item_id) VALUES (6, 52);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 52);
INSERT INTO item_ingredients (products_id, item_id) VALUES (13, 52);
INSERT INTO item_ingredients (products_id, item_id) VALUES (9, 52);
INSERT INTO item_ingredients (products_id, item_id) VALUES (16, 52);

-- Item ID 53 (Smoothie)
INSERT INTO item_ingredients (products_id, item_id) VALUES (19, 53);
INSERT INTO item_ingredients (products_id, item_id) VALUES (24, 53);
INSERT INTO item_ingredients (products_id, item_id) VALUES (27, 53);
INSERT INTO item_ingredients (products_id, item_id) VALUES (28, 53);

-- Item ID 54 (Sandwich)
INSERT INTO item_ingredients (products_id, item_id) VALUES (3, 54);
INSERT INTO item_ingredients (products_id, item_id) VALUES (7, 54);
INSERT INTO item_ingredients (products_id, item_id) VALUES (10, 54);
INSERT INTO item_ingredients (products_id, item_id) VALUES (11, 54);
INSERT INTO item_ingredients (products_id, item_id) VALUES (12, 54);
INSERT INTO item_ingredients (products_id, item_id) VALUES (15, 54);
