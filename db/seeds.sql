INSERT INTO department(id, name)
    VALUES
    (1, "Management"),
    (2, "Human Resources"),
    (3, "Finance"),
    (4, "Sales");

INSERT INTO role(id, title, salary, department_id)
    VALUES
    (1, "Regional Manager", 60000, 1),
    (2, "Assist to the Regional Manager", 40000, 1),
    (3, "HR Rep", 40000, 2),
    (4, "Chief Accountant", 60000, 3),
    (5, "Accountant", 40000, 3),
    (6, "Sales Rep", 40000, 4),
    (7, "Traveling Sales Representative", 50000, 4);


INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
    VALUES
    (1, "Michael", "Scott", 1,1),
    (2, "Dwight", "Schrute", 2, 1),
    (3, "Jim", "Halpert", 6, 1),
    (4, "Pam", "Beesly", 6, 1),
    (5, "Ryan", "Howard", 6, 2),
    (6, "Stanley", "Hudson", 6, 1),
    (7, "Kevin", "Malone", 5, 1),
    (8, "Angela", "Martin", 5, 1),
    (9, "Oscar", "Martinez", 4, 1),
    (10, "Phyllis", "Vance", 6, 1),
    (11, "Toby", "Flenderson", 3, 3),
    (12, "Danny", "Cordray", 7, 3),
    (13, "Holly", "Flax", 3, 2),
    (14, "Andy ", "Bernard", 1,1);


