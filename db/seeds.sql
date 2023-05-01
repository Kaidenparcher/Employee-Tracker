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
        ("Customer Service Manager"),


INSERT INTO employees (first_name, last_name, dept_id, role_id, salary)
VALUES  ('Liana', 'Bird', null, 1, 200000),
        ('Evan', 'Pittman', 1, 6, 75000),
        ('Louisa', 'Hammond', 5, 8, 60000),
        ('Ray', 'Branch', 3, 5, 90000),
        ('Trey', 'Olsen', 3, 5, 90000),
        ('Kelly', 'Johnson', 1, 7, 50000),
        ('Leo', 'Kerr', 2, 3, 150000),
        ('Rebekah', 'Yang', 4, 2, 110000),
        ('Marissa', 'Cooper', 2, 4, 80000),
