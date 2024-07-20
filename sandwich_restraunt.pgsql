
-- Changes made to aligned with html page: registration of membership only require email and account password --- 
CREATE TABLE member (
    user_id SERIAL PRIMARY KEY, 
    user_email varchar(150) UNIQUE, 
    user_accPassword varchar(30) NOT NULL
);


-- table created to store information of ingredients separately --  

-- ingredients for sandwich --

CREATE TABLE bread (
    bread_id SERIAL PRIMARY KEY, 
    bread_type varchar(100) NOT NULL UNIQUE, 
    bread_quantity_in_slice INT NOT NULL 
); 

INSERT INTO bread (bread_id, bread_type, bread_quantity_in_slice) 
    VALUES (1, 'Sourdough', 100),
        (2, 'Wholemeal', 100),  
        (3, 'Oat bread', 100),
        (4, 'Italian Herb', 100); 

CREATE TABLE protein (
    protein_id SERIAL PRIMARY KEY, 
    protein_type varchar(100) NOT NULL UNIQUE, 
    protein_quantity_in_g DECIMAL(5,2) NOT NULL 
); 

INSERT INTO protein (protein_id, protein_type, protein_quantity_in_kg) 
    VALUES (1, 'lamb', 8.0), 
        (2, 'chicken', 8.0), 
        (3, 'beef', 8.0), 
        (4, 'salmon', 8.0);   


CREATE TABLE veggie (
    veg_id SERIAL PRIMARY KEY, 
    veg_type varchar(100) NOT NULL UNIQUE,
    veg_quantity_in_kg DECIMAL(5,2) NOT NULL
); 

INSERT INTO veggie (veg_id, veg_type, veg_quantity_in_kg) 
    VALUES (1, 'lettuce', 5.0), 
        (2, 'tomato', 5.0), 
        (3, 'cucumber', 5.0), 
        (4, 'onion', 5.0),
        (5, 'bell pepper', 5.0); 


CREATE TABLE sauce (
    sauce_id SERIAL PRIMARY KEY, 
    sauce_type varchar(100) NOT NULL UNIQUE,
    sauce_quantity_in_kg DECIMAL(5,2) NOT NULL 
); 

INSERT INTO sauce (sauce_id, sauce_type, sauce_quantity_in_kg) 
    VALUES (1, 'cranberry-caramalised onion', 5.0), 
        (2, 'honey mustard', 5.0), 
        (3, 'egg-mayo', 5.0), 
        (4, 'avocado lime crema', 5.0),
        (5, 'bbq', 5.0); 

-----------------------------------------------------------


-- ingredients for smoothie --

CREATE TABLE fruit (
    fruit_id SERIAL PRIMARY KEY, 
    fruit_type varchar(100) NOT NULL UNIQUE,
    fruit_quantity_in_kg DECIMAL(6,2) NOT NULL 
); 


INSERT INTO fruit (fruit_id, fruit_type, fruit_quantity_in_kg) 
    VALUES (1, 'banana', 10.0), 
        (2, 'strawberry', 10.0), 
        (3, 'blueberrry', 10.0), 
        (4, 'mango', 10.0),
        (5, 'orange', 10.0); 



CREATE TABLE smoothie_veg (
    smoothieVeg_id SERIAL PRIMARY KEY, 
    smoothieVeg_type varchar(100) NOT NULL UNIQUE,
    smoothieVeg_quantity_in_kg DECIMAL(6,2) NOT NULL 
); 


INSERT INTO smoothie_veg (smoothieVeg_id, smoothieVeg_type, smoothieVeg_quantity_in_kg) 
    VALUES (1, 'spinach', 8.0), 
        (2, 'kale', 8.0), 
        (3, 'avocado', 8.0); 


CREATE TABLE yogurt (
    yogurt_id SERIAL PRIMARY KEY, 
    yogurt_type varchar(100) NOT NULL UNIQUE,
    yogurt_quantity_in_kg DECIMAL(6,2) NOT NULL 
); 

INSERT INTO yogurt (yogurt_id, yogurt_type, yogurt_quantity_in_kg) 
    VALUES (1, 'greek yogurt', 8.0); 



CREATE TABLE liquid_base (
    base_id SERIAL PRIMARY KEY, 
    base_type varchar(100) NOT NULL UNIQUE,
    base_quantity_in_kg DECIMAL(6,2) NOT NULL 
); 

INSERT INTO liquid_base (base_id, base_type, base_quantity_in_kg) 
    VALUES (1, 'low-fat milk', 10.0), 
        (2, 'full-cream milk', 10.0), 
        (3, 'oat milk', 10.0); 

-------------------------------------------------------------------------


-- will make more changes to this table according to the needs of UI --
CREATE TABLE orders ( 
    order_id SERIAL, 
    user_id INT NOT NULL, 
    item_id INT NOT NULL, 
    order_quantity int NOT NULL,  
    order_date date NOT NULL, 
    order_status varchar(10) NOT NULL,  
    CONSTRAINT chk_order_status CHECK (order_status IN ('ordered', 'completed')), 
    FOREIGN KEY (user_id) REFERENCES member(user_id), 
    FOREIGN KEY (item_id) REFERENCES menu(item_id), 
    CONSTRAINT orders_composite_key PRIMARY KEY (order_id, user_id, item_id)
);
-------------------------------------------------------------------------