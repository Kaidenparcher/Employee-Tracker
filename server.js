const inquirer = require('inquirer');
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'staff_db'
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database');
  start();
});

// Prompt user to select an option
function start() {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit'
        ]
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all departments':
            viewDepartments();
            break;
  
          case 'View all roles':
            viewRoles();
            break;
  
          case 'View all employees':
            viewEmployees();
            break;
  
          case 'Add a department':
            addDepartment();
            break;
  
          case 'Add a role':
            addRole();
            break;
  
          case 'Add an employee':
            addEmployee();
            break;
  
          case 'Update an employee role':
            updateEmployeeRole();
            break;
  
          case 'Exit':
            connection.end();
            break;
        }
      });
  }
