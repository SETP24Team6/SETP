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
    VALUES ('Bread'), ('Protein'), ('Vegetable'), ('Sauce'), ('Fruit'), ('Yougurt'), ('Smoothie Vegetable'), ('Liquid Base'); 

CREATE TABLE products (
    products_id SERIAL PRIMARY KEY, 
    product_type_id INT NOT NULL,
    quantity_amount INT NOT NULL,
    uom_id INT NOT NULL,
    product_name VARCHAR(100),
    FOREIGN KEY (uom_id) REFERENCES uom(uom_id), 
    FOREIGN KEY (product_type_id) REFERENCES product_type(product_type_id)
); 
INSERT INTO products (product_type_id, quantity_amount, uom_id, product_name) 
    VALUES (1, 100, 2, 'Sourdough'),
        (1, 100, 2, 'Wholemeal'),
        (1, 100, 2, 'Oat bread'),
        (1, 100, 2, 'Italian Herb'),
        (2, 8000, 1, 'Lamb'),
        (2, 8000, 1, 'Chicken'),
        (2, 8000, 1, 'Beef'),
        (2, 8000, 1, 'Salmon'),
        (3, 5000, 1, 'Lettuce'),
        (3, 5000, 1, 'Tomato'),
        (3, 5000, 1, 'Cucumber'),
        (3, 5000, 1, 'Onion'),
        (3, 5000, 1, 'Bell Pepper'),
        (4, 5000, 1, 'Cranberry Caramalised onion'),
        (4, 5000, 1, 'Honey Mustard'),
        (4, 5000, 1, 'Egg Mayo'),
        (4, 5000, 1, 'Avocado Lime Crema'),
        (4, 5000, 1, 'BBQ'),
        (5, 10000, 1, 'Banana'),
        (5, 10000, 1, 'Strawberry'),
        (5, 10000, 1, 'Blueberry'),
        (5, 10000, 1, 'Mango'),
        (5, 10000, 1, 'Orange'),
        (6, 8000, 1, 'Spinach'),
        (6, 8000, 1, 'Kale'),
        (6, 8000, 1, 'Avocado'),
        (7, 8000, 1, 'Greek Yogurt'),
        (8, 10000, 1, 'Low Fat Milk'),
        (8, 10000, 1, 'Full Cream Milk'),
        (8, 10000, 1, 'Oat Milk')

-------------------------------------------------------------------------

-- SELECT * FROM member;
-- SELECT * FROM product 
-- INNER JOIN product_type ON product.product_type_id = product_type.product_type_id
-- INNER JOIN uom ON product.uom_id = uom.uom_id;

-- -- will make more changes to this table according to the needs of UI --
-- CREATE TABLE orders ( 
--     order_id SERIAL, 
--     member_id INT NOT NULL, 
--     item_id INT NOT NULL, 
--     order_quantity int NOT NULL,  
--     order_date date NOT NULL, 
--     order_status varchar(10) NOT NULL,  
--     CONSTRAINT chk_order_status CHECK (order_status IN ('ordered', 'completed')), 
--     FOREIGN KEY (member_id) REFERENCES member(member_id), 
--     FOREIGN KEY (item_id) REFERENCES menu(item_id), 
--     CONSTRAINT orders_composite_key PRIMARY KEY (order_id, user_id, item_id)
-- );
-- -------------------------------------------------------------------------
