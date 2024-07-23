DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

CREATE TABLE member (
    member_id SERIAL PRIMARY KEY, 
    lastName varchar(100) NOT NULL, 
    firstName varchar(100) NOT NULL, 
    email varchar(150) UNIQUE, 
    phone char(8) UNIQUE,   
    birthday date NOT NULL, 
    passwordhash varchar(30) NOT NULL
);

INSERT INTO member(lastName, firstName, email, phone, birthday, passwordhash)
    VALUES('Gwee', 'Wilson', 'wilson.gwee@gmail.com', '83885674', '19-05-1991', 'gnzLDuqKcGxMNKFokfhOew'),
        ('FAKER', 'Wilson', 'wilson.gwee22@gmail.com', '83885675', '19-05-1991', 'gnzLDuqKcGxMNKFokfhOew'); 


CREATE TABLE menu (
    menu_id SERIAL PRIMARY KEY, 
    name varchar(150) NOT NULL, 
    description TEXT, 
    price DECIMAL(4,2) NOT NULL,
    path varchar(255) NOT NULL
);


CREATE TABLE orders ( 
    order_id SERIAL, 
    member_id INT NOT NULL, 
    menu_id INT NOT NULL, 
    order_quantity int NOT NULL,  
    order_date date NOT NULL, 
    order_status varchar(10) NOT NULL,  
    CONSTRAINT chk_order_status CHECK (order_status IN ('ordered', 'completed')), 
    FOREIGN KEY (member_id) REFERENCES member(member_id), 
    FOREIGN KEY (menu_id) REFERENCES menu(menu_id), 
    CONSTRAINT orders_composite_key PRIMARY KEY (order_id, member_id, menu_id)
);


INSERT INTO menu 
    VALUES(1, 'Cucumber Sandwich', 'This creamy, crunchy cucumber sandwich recipe strikes a lovely balance between decadent and light.', 7.88, ''); 