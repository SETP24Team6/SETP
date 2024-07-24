
CREATE TABLE member (
    user_id SERIAL PRIMARY KEY, 
    user_firstName varchar(100) NOT NULL,
    user_lastName varchar(100) NOT NULL,
    user_birthday date NOT NULL,
    user_phone char(8) NOT NULL UNIQUE,
    user_email varchar(150) UNIQUE, 
    user_accPassword varchar(30) NOT NULL
);


INSERT INTO member (user_id, user_firstName, user_lastName, user_birthday, user_phone, user_email, user_accPassword)
    VALUES (1, 'Ying Xuan', 'Ling', '2000-07-18', '88152902', 'yingxuan@gmail.com', 'YingXuan'),
        (2, 'Jumana', 'Haseen', '1999-01-01', '94459502', 'jumana@gmail.com', 'Jumana'),
        (3, 'Guorong', 'Wu', '1992-02-02', '91385447', 'guorong@gmail.com', 'Guorong'),
        (4, 'Wilson', 'Gwee', '1994-05-05', '83885674', 'wilson@gmail.com', 'WilsonGwee'),
        (5, 'Quim', 'Mohammad', '1995-06-06', '81614144', 'quim@gmail.com', 'Quim0606'),
        (6, 'Suet Sin', 'Chen', '2000-07-09', '81306639', 'suetsinchen@gmail.com', 'SuetSin'),
        (7, 'Christine', 'Wong', '1994-06-28', '98345672', 'christine@gmail.com', 'Christine'),
        (8, 'Rachel', 'Tang', '1999-03-22', '82407754', 'rachel@gmail.com', 'HongYing'),
        (9, 'Nancy', 'Cheah', '2000-10-01', '82377463', 'nancy@gmail.com', 'NancyCheah'),
        (10, 'Irvine', 'Loh', '1994-02-05', '98119816', 'irvine@gmail.com', 'Irvine'),
        (11, 'Cynthia', 'Foo', '1999-02-02', '82549264', 'cynthia@gmail.com', 'Cynthia'),
        (12, 'Stephanie', 'Tie', '1999-08-08', '93678250', 'stephanie@gmail.com', 'Stephanie'),
        (13, 'Silviya', 'Tan', '1985-01-01', '98769876', 'silviya@gmail.com', 'Silviya'),
        (14, 'Joli', 'Tay', '1995-05-05', '81268126', 'joli@gmail.com', 'JoliTay'),
        (15, 'Jenny', 'Chong', '1996-06-06', '87268726', 'jenny@gmail.com', 'JennyChong'),
        (16, 'Fiona', 'Loh', '2000-06-05', '86758675', 'fiona@gmail.com', 'FionaLoh'),
        (17, 'Edward', 'Reyes', '1990-01-01', '86748674', 'edward@gmail.com', 'Edward'),
        (18, 'Rhaimax', 'Manibo', '1988-01-01', '87528752', 'rhaimax@gmail.com', 'Rhaimax'),
        (19, 'Kathrina', 'Abuel', '1990-03-03', '98764325', 'kathrina@gmail.com', 'Kathrina'),
        (20, 'Connie', 'Teh', '2002-02-02', '83648929', 'connie@gmail.com', 'Connie');




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
    protein_quantity_in_g DECIMAL(8,2) NOT NULL 
); 

INSERT INTO protein (protein_id, protein_type, protein_quantity_in_g) 
    VALUES (1, 'lamb', 8000.0), 
        (2, 'chicken', 8000.0), 
        (3, 'beef', 8000.0), 
        (4, 'salmon', 8000.0);   


CREATE TABLE veggie (
    veg_id SERIAL PRIMARY KEY, 
    veg_type varchar(100) NOT NULL UNIQUE,
    veg_quantity_in_g DECIMAL(8,2) NOT NULL
); 

INSERT INTO veggie (veg_id, veg_type, veg_quantity_in_g) 
    VALUES (1, 'lettuce', 5000.0), 
        (2, 'tomato', 5000.0), 
        (3, 'cucumber', 5000.0), 
        (4, 'onion', 5000.0),
        (5, 'bell pepper', 5000.0); 


CREATE TABLE sauce (
    sauce_id SERIAL PRIMARY KEY, 
    sauce_type varchar(100) NOT NULL UNIQUE,
    sauce_quantity_in_g DECIMAL(8,2) NOT NULL 
); 

INSERT INTO sauce (sauce_id, sauce_type, sauce_quantity_in_g) 
    VALUES (1, 'cranberry-caramalised onion', 5000.0), 
        (2, 'honey mustard', 5000.0), 
        (3, 'egg-mayo', 5000.0), 
        (4, 'avocado lime crema', 5000.0),
        (5, 'bbq', 5000.0); 

-----------------------------------------------------------


-- ingredients for smoothie --

CREATE TABLE fruit (
    fruit_id SERIAL PRIMARY KEY, 
    fruit_type varchar(100) NOT NULL UNIQUE,
    fruit_quantity_in_g DECIMAL(8,2) NOT NULL 
); 


INSERT INTO fruit (fruit_id, fruit_type, fruit_quantity_in_g) 
    VALUES (1, 'banana', 10000.0), 
        (2, 'strawberry', 10000.0), 
        (3, 'blueberrry', 10000.0), 
        (4, 'mango', 10000.0),
        (5, 'orange', 10000.0); 



CREATE TABLE smoothie_veg (
    smoothieVeg_id SERIAL PRIMARY KEY, 
    smoothieVeg_type varchar(100) NOT NULL UNIQUE,
    smoothieVeg_quantity_in_g DECIMAL(8,2) NOT NULL 
); 


INSERT INTO smoothie_veg (smoothieVeg_id, smoothieVeg_type, smoothieVeg_quantity_in_g) 
    VALUES (1, 'spinach', 8000.0), 
        (2, 'kale', 8000.0), 
        (3, 'avocado', 8000.0); 


CREATE TABLE yogurt (
    yogurt_id SERIAL PRIMARY KEY, 
    yogurt_type varchar(100) NOT NULL UNIQUE,
    yogurt_quantity_in_g DECIMAL(8,2) NOT NULL 
); 

INSERT INTO yogurt (yogurt_id, yogurt_type, yogurt_quantity_in_g) 
    VALUES (1, 'greek yogurt', 8000.0); 



CREATE TABLE liquid_base (
    base_id SERIAL PRIMARY KEY, 
    base_type varchar(100) NOT NULL UNIQUE,
    base_quantity_in_g DECIMAL(8,2) NOT NULL 
); 

INSERT INTO liquid_base (base_id, base_type, base_quantity_in_g) 
    VALUES (1, 'low-fat milk', 10000.0), 
        (2, 'full-cream milk', 10000.0), 
        (3, 'oat milk', 10000.0); 

-------------------------------------------------------------------------

SELECT * FROM member;
SELECT * FROM bread;
SELECT * FROM fruit;
SELECT * FROM liquid_base;
SELECT * FROM protein;
SELECT * FROM sauce;
SELECT * FROM smoothie_veg;
SELECT * FROM veggie;
SELECT * FROM yogurt;



DROP TABLE bread;
DROP TABLE fruit;
DROP TABLE liquid_base;
DROP TABLE protein;
DROP TABLE sauce;
DROP TABLE smoothie_veg;
DROP TABLE veggie;
DROP TABLE yogurt;




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
