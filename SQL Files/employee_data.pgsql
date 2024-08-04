CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    is_Manager bool NOT NULL DEFAULT FALSE, 
    phone char(20) NOT NULL UNIQUE,
    email varchar(150) UNIQUE, 
    gender char(1) NOT NULL,
    passwordhash varchar(255) NOT NULL, 
    CONSTRAINT chk_member_gender CHECK (gender IN ('M', 'F'))
);


INSERT INTO employee (firstName, lastName, is_Manager, phone, email, gender, passwordhash)
    VALUES ('Ying Xuan', 'Ling', TRUE, '+65 8815 2902', 'yingxuan@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Jumana', 'Haseen', TRUE, '+65 9445 9502', 'jumana@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Wilson', 'Gwee', TRUE, '+65 8388 5674', 'wilson.gwee@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');


INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash)
    VALUES ('Guorong', 'Wu', '+65 9138 5447', 'guorong@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad'),
        ('Quim', 'Mohammad', '+65 8161 4144', 'quim@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad'),
        ('Suet Sin', 'Chen', '+65 8130 6639', 'suetsinchen@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Christine', 'Wong', '+65 9834 5672', 'christine@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Rachel', 'Tang', '+65 8240 7754', 'rachel@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Nancy', 'Cheah', '+65 8237 7463', 'nancy@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Irvine', 'Loh', '+65 9811 9816', 'irvine@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad'),
        ('Cynthia', 'Foo', '+65 8254 9264', 'cynthia@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Stephanie', 'Tie', '+65 9367 8250', 'stephanie@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Silviya', 'Tan', '+65 9876 9876', 'silviya@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Joli', 'Tay', '+65 8126 8126', 'joli@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Jenny', 'Chong', '+65 8726 8726', 'jenny@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Fiona', 'Loh', '+65 8675 8675', 'fiona@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Edward', 'Reyes', '+65 8674 8674', 'edward@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad'),
        ('Rhaimax', 'Manibo', '+65 8752 8752', 'rhaimax@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad'),
        ('Kathrina', 'Abuel', '+65 9876 4325', 'kathrina@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad'),
        ('Connie', 'Teh', '+65 8364 8929', 'connie@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad');

INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Andres', 'Espie', '+65 2695 9811', 'EspieAndres@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Amity', 'Patton', '+65 3442 2159', 'PattonAmity@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Marla', 'Streeten', '+65 3347 4239', 'StreetenMarla@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Alejandrina', 'Chatenier', '+65 0280 4780', 'ChatenierAlejandrina@biteDelight.com', 'F', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Cecil', 'Pandey', '+65 5075 8624', 'PandeyCecil@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Andy', 'Masser', '+65 0918 0050', 'MasserAndy@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Ellsworth', 'Leadston', '+65 1946 6171', 'LeadstonEllsworth@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Lyn', 'Renvoys', '+65 0473 4376', 'RenvoysLyn@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Arvy', 'Calway', '+65 8197 5279', 'CalwayArvy@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Gaspard', 'Kasperski', '+65 2171 8193', 'KasperskiGaspard@biteDelight.com', 'M', '25d55ad283aa400af464c76d713c07ad');

    
SELECT * FROM employee;
