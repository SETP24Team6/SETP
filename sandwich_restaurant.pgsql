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

-- -- will make more changes to this table according to the needs of UI --
CREATE TABLE orders ( 
    order_id SERIAL PRIMARY KEY, 
    member_id INT NOT NULL, 
    store_id INT NOT NULL, 
    order_date date NOT NULL, 
    order_status varchar(10) NOT NULL,  
    CONSTRAINT chk_order_status CHECK (order_status IN ('ordered', 'completed')), 
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);


INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (1, 15, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (2, 7, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (3, 4, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (4, 3, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (5, 9, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (6, 11, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (7, 4, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (8, 11, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (9, 12, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (10, 17, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (11, 4, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (12, 3, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (13, 6, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (14, 8, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (15, 14, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (16, 8, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (17, 12, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (18, 12, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (19, 1, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (20, 3, 1, '2024-07-20', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (21, 9, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (22, 7, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (23, 16, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (24, 18, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (25, 9, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (26, 3, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (27, 20, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (28, 11, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (29, 6, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (30, 16, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (31, 19, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (32, 17, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (33, 18, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (34, 20, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (35, 17, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (36, 17, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (37, 18, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (38, 12, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (39, 6, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (40, 16, 1, '2024-07-21', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (41, 9, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (42, 2, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (43, 13, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (44, 15, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (45, 7, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (46, 17, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (47, 12, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (48, 16, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (49, 14, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (50, 16, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (51, 11, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (52, 3, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (53, 11, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (54, 8, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (55, 15, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (56, 11, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (57, 5, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (58, 13, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (59, 16, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (60, 11, 1, '2024-07-22', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (61, 12, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (62, 6, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (63, 15, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (64, 11, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (65, 18, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (66, 2, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (67, 14, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (68, 12, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (69, 4, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (70, 11, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (71, 9, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (72, 10, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (73, 7, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (74, 5, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (75, 12, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (76, 16, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (77, 13, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (78, 5, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (79, 16, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (80, 5, 1, '2024-07-23', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (81, 12, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (82, 1, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (83, 10, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (84, 5, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (85, 3, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (86, 17, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (87, 15, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (88, 16, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (89, 17, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (90, 13, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (91, 2, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (92, 16, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (93, 15, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (94, 20, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (95, 15, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (96, 6, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (97, 16, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (98, 14, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (99, 12, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (100, 11, 1, '2024-07-24', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (101, 13, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (102, 12, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (103, 13, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (104, 4, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (105, 4, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (106, 15, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (107, 17, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (108, 10, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (109, 8, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (110, 20, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (111, 16, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (112, 11, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (113, 18, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (114, 17, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (115, 9, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (116, 11, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (117, 9, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (118, 13, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (119, 11, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (120, 1, 1, '2024-07-25', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (121, 4, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (122, 14, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (123, 2, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (124, 19, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (125, 7, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (126, 14, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (127, 12, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (128, 1, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (129, 18, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (130, 10, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (131, 10, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (132, 1, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (133, 13, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (134, 11, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (135, 19, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (136, 11, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (137, 5, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (138, 2, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (139, 3, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (140, 5, 1, '2024-07-26', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (141, 13, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (142, 11, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (143, 9, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (144, 1, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (145, 18, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (146, 17, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (147, 5, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (148, 19, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (149, 11, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (150, 4, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (151, 19, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (152, 3, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (153, 1, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (154, 11, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (155, 8, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (156, 1, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (157, 12, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (158, 8, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (159, 14, 1, '2024-07-27', 'completed');
INSERT INTO orders (order_id, member_id, store_id, order_date, order_status) VALUES (160, 5, 1, '2024-07-27', 'completed');



CREATE TABLE orders_items ( 
    item_id SERIAL PRIMARY KEY,
    order_id INT, 
    item_type VARCHAR(10), --sandwich or smoothie--
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

insert into orders_items (item_id, order_id, item_type) values (1, 1, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (2, 2, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (3, 3, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (4, 4, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (5, 5, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (6, 6, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (7, 7, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (8, 8, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (9, 9, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (10, 10, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (11, 11, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (12, 12, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (13, 13, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (14, 14, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (15, 15, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (16, 16, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (17, 17, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (18, 18, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (19, 19, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (20, 20, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (21, 21, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (22, 22, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (23, 23, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (24, 24, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (25, 25, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (26, 26, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (27, 27, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (28, 28, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (29, 29, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (30, 30, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (31, 31, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (32, 32, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (33, 33, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (34, 34, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (35, 35, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (36, 36, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (37, 37, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (38, 38, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (39, 39, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (40, 40, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (41, 41, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (42, 42, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (43, 43, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (44, 44, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (45, 45, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (46, 46, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (47, 47, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (48, 48, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (49, 49, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (50, 50, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (51, 51, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (52, 52, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (53, 53, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (54, 54, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (55, 55, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (56, 56, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (57, 57, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (58, 58, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (59, 59, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (60, 60, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (61, 61, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (62, 62, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (63, 63, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (64, 64, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (65, 65, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (66, 66, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (67, 67, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (68, 68, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (69, 69, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (70, 70, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (71, 71, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (72, 72, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (73, 73, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (74, 74, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (75, 75, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (76, 76, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (77, 77, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (78, 78, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (79, 79, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (80, 80, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (81, 81, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (82, 82, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (83, 83, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (84, 84, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (85, 85, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (86, 86, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (87, 87, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (88, 88, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (89, 89, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (90, 90, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (101, 101, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (102, 102, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (103, 103, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (104, 104, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (105, 105, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (106, 106, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (107, 107, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (108, 108, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (109, 109, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (100, 100, 'smoothie');

insert into orders_items (item_id, order_id, item_type) values (101, 101, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (102, 102, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (103, 103, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (104, 104, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (105, 105, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (106, 106, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (107, 107, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (108, 108, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (109, 109, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (110, 110, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (111, 111, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (112, 112, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (113, 113, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (114, 114, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (115, 115, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (116, 116, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (117, 117, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (118, 118, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (119, 119, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (120, 120, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (121, 121, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (122, 122, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (123, 123, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (124, 124, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (125, 125, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (126, 126, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (127, 127, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (128, 128, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (129, 129, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (130, 130, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (131, 131, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (132, 132, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (133, 133, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (134, 134, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (135, 135, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (136, 136, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (137, 137, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (138, 138, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (139, 139, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (140, 140, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (141, 141, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (142, 142, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (143, 143, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (144, 144, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (145, 145, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (146, 146, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (147, 147, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (148, 148, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (149, 149, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (150, 150, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (151, 151, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (152, 152, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (153, 153, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (154, 154, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (155, 155, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (156, 156, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (157, 157, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (158, 158, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (159, 159, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (160, 160, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (161, 161, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (162, 162, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (163, 163, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (164, 164, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (165, 165, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (166, 166, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (167, 167, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (168, 168, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (169, 169, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (170, 170, 'sandwich');
insert into orders_items (item_id, order_id, item_type) values (171, 171, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (172, 172, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (173, 173, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (174, 174, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (175, 175, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (176, 176, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (177, 177, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (178, 178, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (179, 179, 'smoothie');
insert into orders_items (item_id, order_id, item_type) values (180, 180, 'smoothie');



CREATE TABLE item_ingredients ( 
    products_id INT NOT NULL,
    item_id INT NOT NULL, 
    FOREIGN KEY (item_id) REFERENCES orders_items(item_id), 
    FOREIGN KEY (products_id) REFERENCES product(products_id),
    PRIMARY KEY (products_id, item_id)
);

-- -------------------------------------------------------------------------
