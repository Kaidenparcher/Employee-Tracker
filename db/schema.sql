DROP DATABASE IF EXISTS staff_db;
CREATE DATABASE staff_db;

Use staff_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(500) NOT NULL
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(500) NOT NULL,
    last_name VARCHAR(500) NOT NULL,
    dept_id INT,
    role_id INT,
    manager_id INT,
    salary INT NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES departments(id) ON DELETE SET NULL, 
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,  
);