USE employeesdb;

INSERT INTO department(name)
VALUES ("Robotics"), ("Legal"), ("Finance"), ("Web Development"), ("HR");

INSERT INTO role(title, salary, department_id)
VALUES ("Lead Robotics Engineer", 150000, 1),
("Legal Team Lead", 250000, 2),
("Accountant", 125000, 3),
("Senior Developer", 120000, 4),
("Guy from HR", 20000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("Lil", "Wayne", 1, NULL),
("Snoop", "Dogg", 2, NULL),
("Billie", "Eyelash", 3, NULL),
("Peter", "Parker", 4, NULL),
("Bruce", "Banner", 5, NULL);
