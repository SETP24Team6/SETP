DROP DATABASE IF EXISTS bite_and_delight;
CREATE DATABASE bite_and_delight;

\c bite_and_delight;

CREATE TABLE member (
    user_id SERIAL PRIMARY KEY, 
    user_lastName varchar(100) NOT NULL, 
    user_firstName varchar(100) NOT NULL, 
    user_email varchar(150) UNIQUE, 
    user_phone char(8) UNIQUE,   
    user_birthday date NOT NULL, 
    user_accPassword varchar(30) NOT NULL
);


CREATE TABLE menu (
    item_id SERIAL PRIMARY KEY, 
    item_name varchar(150) NOT NULL, 
    item_description TEXT, 
    item_price DECIMAL(4,2) NOT NULL,
    image_path varchar(255) NOT NULL
);


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


INSERT INTO menu 
    VALUES(1, 'Cucumber Sandwich', 'This creamy, crunchy cucumber sandwich recipe strikes a lovely balance between decadent and light.', 7.88, LOAD_FILE'https://www.eatingwell.com/thmb/Q41yPc8R2PKlBSXZNbBpyzaom_A=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cucumber-sandwich-eddcc95811f5426094ea5dbea6a6b026.jpg'); 