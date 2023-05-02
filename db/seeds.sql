INSERT INTO departments (name)
VALUES ("Sales and Marketing"),
       ("Finance and Accounting"),
       ("Research and Development"),
       ("Human Resources"),
       ("Customer Service");
       

INSERT INTO roles (name)
VALUES  ("CEO/Executive Director"),
        ("COO/Chief Operations Officer"),
        ("CFO/Chief Financial Officer"),
        ("Account Executive"),
        ("Lead Scientist"),
        ("Daily Manager"),
        ("Talent Scout"),
        ("Customer Service Manager");


INSERT INTO employees (first_name, last_name, dept_id, role_id, manager_id, salary)
VALUES  ('Liana', 'Bird', null, 1, null, 200000),
        ('Evan', 'Pittman', 1, 6, 2, 75000),
        ('Kelly', 'Johnson', 1, 7, 2, 50000),
        ('Ray', 'Branch', 3, 5, 3, 90000),
        ('Trey', 'Olsen', 3, 5, 1, 90000),
        ('Louisa', 'Hammond', 5, 8, 3, 60000),
        ('Rebekah', 'Yang', 4, 2, 5, 110000),
        ('Leo', 'Kerr', 2, 3, 2, 150000),
        ('Marissa', 'Cooper', 2, 4, 1, 80000);
