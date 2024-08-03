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
    VALUES ('Ying Xuan', 'Ling', TRUE, '+65 8815 2902', 'yingxuan@biteDelight.com', 'F', '44f0185d20eebde9932b365c29cb09bf'),
        ('Jumana', 'Haseen', TRUE, '+65 9445 9502', 'jumana@biteDelight.com', 'F', '18e8657032c4eb7390d2085e0bacc500'),
        ('Wilson', 'Gwee', TRUE, '+65 8388 5674', 'wilson.gwee@biteDelight.com', 'M', '827ccb0eea8a706c4c34a16891f84e7b');


INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash)
    VALUES ('Guorong', 'Wu', '+65 9138 5447', 'guorong@biteDelight.com', 'M', '19e92ba5a6dae8dc4c78d950ce187f1d'),
        ('Quim', 'Mohammad', '+65 8161 4144', 'quim@biteDelight.com', 'M', '61eef8483a359479dbe68385b17fc55b'),
        ('Suet Sin', 'Chen', '+65 8130 6639', 'suetsinchen@biteDelight.com', 'F', '2c3351dbd2b3f1d4bda62f707174fe2c'),
        ('Christine', 'Wong', '+65 9834 5672', 'christine@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Rachel', 'Tang', '+65 8240 7754', 'rachel@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Nancy', 'Cheah', '+65 8237 7463', 'nancy@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Irvine', 'Loh', '+65 9811 9816', 'irvine@biteDelight.com', 'M', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Cynthia', 'Foo', '+65 8254 9264', 'cynthia@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Stephanie', 'Tie', '+65 9367 8250', 'stephanie@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Silviya', 'Tan', '+65 9876 9876', 'silviya@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Joli', 'Tay', '+65 8126 8126', 'joli@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Jenny', 'Chong', '+65 8726 8726', 'jenny@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Fiona', 'Loh', '+65 8675 8675', 'fiona@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Edward', 'Reyes', '+65 8674 8674', 'edward@biteDelight.com', 'M', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Rhaimax', 'Manibo', '+65 8752 8752', 'rhaimax@biteDelight.com', 'M', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Kathrina', 'Abuel', '+65 9876 4325', 'kathrina@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b'),
        ('Connie', 'Teh', '+65 8364 8929', 'connie@biteDelight.com', 'F', '827ccb0eea8a706c4c34a16891f84e7b');

INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Andres', 'Espie', '+65 2695 9811', 'EspieAndres@biteDelight.com', 'M', '57862f2c3d08ccfcff252a1dd71846c8a95b003a22453cca58e683828b49c8cc');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Amity', 'Patton', '+65 3442 2159', 'PattonAmity@biteDelight.com', 'F', 'a427a3e8bc82b0efba020fe7e03eab5e0977c6dbe8b6ffa4361eee5711bd17ce');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Marla', 'Streeten', '+65 3347 4239', 'StreetenMarla@biteDelight.com', 'F', '8f87c9b9ea2820e09964fec2887349837375aa07472f60ae9579c9b59fde31a8');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Alejandrina', 'Chatenier', '+65 0280 4780', 'ChatenierAlejandrina@biteDelight.com', 'F', 'a62ac88aebfb7029e99e07c4a9d2be26270a5420d4b96cb2a1d2b670f9f74e95');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Cecil', 'Pandey', '+65 5075 8624', 'PandeyCecil@biteDelight.com', 'M', 'f3bdd9810bcff8bc1ac0348dd1378e713fa444562b4a35b70055729c25036124');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Andy', 'Masser', '+65 0918 0050', 'MasserAndy@biteDelight.com', 'M', '1f4ed8ff8a784b7483a31aa113286372a04c29d08218332295e8ce60230cbc13');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Ellsworth', 'Leadston', '+65 1946 6171', 'LeadstonEllsworth@biteDelight.com', 'M', 'ba5a445db9b9d0bdf4ce1c22a4f61f456a1c2f0e812a8d23aa7b7bf05f3a0d65');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Lyn', 'Renvoys', '+65 0473 4376', 'RenvoysLyn@biteDelight.com', 'M', '0774cedeaa9561a794ff559c5ffc1112c4e9bc4fe912f0abdf6f82c83e588c45');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Arvy', 'Calway', '+65 8197 5279', 'CalwayArvy@biteDelight.com', 'M', '7344859641e860a290e609e01874f3e20ff25a1e0371807ac6132134d082d504');
INSERT INTO employee (firstName, lastName, phone, email, gender, passwordhash) 
    VALUES ('Gaspard', 'Kasperski', '+65 2171 8193', 'KasperskiGaspard@biteDelight.com', 'M', '1fb5f024b26c177cb6e9a4080e5ecc45a16f9a9804085bac5ca066a11d6e426e');

    
SELECT * FROM employee;