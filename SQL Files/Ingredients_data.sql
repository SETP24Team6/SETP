
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
    products_id INT NOT NULL,
    store_id INT NOT NULL,
    quantity_amount INT NOT NULL,
    uom_id INT NOT NULL,
    CONSTRAINT CK_inventory PRIMARY KEY (products_id, store_id)
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




SELECT i.products_id, p.product_name, i.quantity_amount, u.uom_name
FROM inventory i 
LEFT JOIN product p on i.products_id = p.products_id
LEFT JOIN uom u on u.uom_id = i.uom_id
ORDER BY i.quantity_amount;

