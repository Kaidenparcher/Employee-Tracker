USE staff_db;

INSERT INTO departments (name)
VALUES ("Sales and Marketing"),
       ("Finance and Accounting"),
       ("Consulting"),
       ("Human Resources"),
       ("Customer Service");
       

INSERT INTO roles (title, salary, department_id)
VALUES  ("CEO/Executive Director", 200000, null),
        ("COO/Chief Operations Officer", 150000, 1),
        ("CFO/Chief Financial Officer", 150000, 2),
        ("Account Executive", 95000, 2),
        ("Lead Consultant", 120000, 3),
        ("HR Manager" 85000, 4),
        ("Talent Scout" 65000, 3),
        ("Customer Service Manager", 70000, 5);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Liana', 'Bird', 1, null),
        ('Evan', 'Pittman', 2, 1),
        ('Kelly', 'Johnson', 3, 1),
        ('Ray', 'Branch', 4, 3),
        ('Trey', 'Olsen', 4, 3),
        ('Louisa', 'Hammond', 6, 2),
        ('Rebekah', 'Yang', 7, 2),
        ('Leo', 'Kerr', 8, 2),
        ('Marissa', 'Cooper', 7, 2);
