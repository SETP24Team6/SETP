-- migrated to sandwich_restaurant.pgsql --
CREATE TABLE employee (
    employee_id SERIAL PRIMARY KEY, 
    firstName varchar(100) NOT NULL,
    lastName varchar(100) NOT NULL,
    is_Manager bool NOT NULL DEFAULT FALSE, 
    phone char(8) NOT NULL UNIQUE,
    email varchar(150) UNIQUE, 
    passwordhash varchar(50) NOT NULL
);


INSERT INTO employee (firstName, lastName, is_Manager, phone, email, passwordhash) VALUES 
    ('Ying Xuan', 'Ling', TRUE, '88152902', 'yingxuan@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Jumana', 'Haseen', TRUE, '94459502', 'jumana@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Wilson', 'Gwee', TRUE, '83885674', 'wilson.gwee@biteDelight.com', '25d55ad283aa400af464c76d713c07ad');

INSERT INTO employee (firstName, lastName, phone, email, passwordhash) VALUES 
    ('Guorong', 'Wu', '91385447', 'guorong@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Quim', 'Mohammad', '81614144', 'quim@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Suet Sin', 'Chen', '81306639', 'suetsinchen@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Christine', 'Wong', '98345672', 'christine@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Rachel', 'Tang', '82407754', 'rachel@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Nancy', 'Cheah', '82377463', 'nancy@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Irvine', 'Loh', '98119816', 'irvine@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Cynthia', 'Foo', '82549264', 'cynthia@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Stephanie', 'Tie', '93678250', 'stephanie@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Silviya', 'Tan', '98769876', 'silviya@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Joli', 'Tay', '81268126', 'joli@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Jenny', 'Chong', '87268726', 'jenny@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Fiona', 'Loh', '86758675', 'fiona@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Edward', 'Reyes', '86748674', 'edward@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Rhaimax', 'Manibo', '87528752', 'rhaimax@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Kathrina', 'Abuel', '98764325', 'kathrina@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Connie', 'Teh', '83648929', 'connie@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Andres', 'Espie', '26959811', 'EspieAndres@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Amity', 'Patton', '34422159', 'PattonAmity@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Marla', 'Streeten', '33474239', 'StreetenMarla@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Alejandrina', 'Chatenier', '02804780', 'ChatenierAlejandrina@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Cecil', 'Pandey', '50758624', 'PandeyCecil@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Andy', 'Masser', '09180050', 'MasserAndy@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Ellsworth', 'Leadston', '19466171', 'LeadstonEllsworth@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Lyn', 'Renvoys', '04734376', 'RenvoysLyn@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Arvy', 'Calway', '81975279', 'CalwayArvy@biteDelight.com', '25d55ad283aa400af464c76d713c07ad'),
    ('Gaspard', 'Kasperski', '21718193', 'KasperskiGaspard@biteDelight.com', '25d55ad283aa400af464c76d713c07ad');

