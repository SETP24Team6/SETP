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

CREATE TABLE orders_items ( 
    item_id SERIAL PRIMARY KEY,
    order_id INT, 
    item_type VARCHAR(10), --sandwich or smoothie--
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE item_ingredients ( 
    products_id INT NOT NULL,
    item_id INT NOT NULL, 
    FOREIGN KEY (item_id) REFERENCES orders_items(item_id), 
    FOREIGN KEY (products_id) REFERENCES product(products_id),
    PRIMARY KEY (products_id, item_id)
);

-- -------------------------------------------------------------------------
