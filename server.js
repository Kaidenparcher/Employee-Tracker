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

  function viewDepartments() {
    connection.query("SELECT * FROM departments", (err, res) => {
      if (err) throw err;
      console.table(res);
      start();
    });
  }

// Function to view all roles
function viewRoles() {
    connection.query(
      "SELECT roles.id, roles.name, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON roles.dept_id = departments.id",
      (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      }
    );
  }
  
  // Function to view all employees
function viewEmployees() {
    connection.query(
      "SELECT employees.id, employees.first_name, employees.last_name, roles.name AS title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.dept_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id",
      (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
      }
    );
  }
  
// Function to add a department to the database
function addDepartment() {
    inquirer
      .prompt({
        name: "departmentName",
        type: "input",
        message: "Enter the name of the department you want to add: ",
        validate: (input) => {
          if (input) {
            return true;
          } else {
            console.log("Please enter the name of the department.");
            return false;
          }
        },
      })
      .then((answer) => {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            name: answer.departmentName,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department inserted!\n`);
            // re-prompt the user for what they want to do
            start();
          }
        );
      });
}

// Function to add a role to the database
function addRole() {
    connection.query("SELECT * FROM departments", (err, results) => {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "roleTitle",
            type: "input",
            message: "Enter the name of the role you want to add: ",
            validate: (input) => {
              if (input) {
                return true;
              } else {
                console.log("Please enter the name of the role.");
                return false;
              }
            },
          },
          {
            name: "roleSalary",
            type: "input",
            message: "Enter the salary for this role: ",
            validate: (input) => {
              if (isNaN(input)) {
                console.log("Please enter a valid salary.");
                return false;
              } else {
                return true;
              }
            },
          },
          {
            name: "roleDepartment",
            type: "list",
            message: "Select the department for this role: ",
            choices: function () {
              let choiceArray = [];
              results.forEach((department) => {
                choiceArray.push(department.name);
              });
              return choiceArray;
            },
          },
        ])
        .then((answer) => {
          let chosenDepartment;
          results.forEach((department) => {
            if (department.name === answer.roleDepartment) {
              chosenDepartment = department;
            }
          });
          connection.query(
            "INSERT INTO roles SET ?",
            {
              name: answer.roleTitle,
              salary: answer.roleSalary,
              dept_id: chosenDepartment.id,
            },
            (err, res) => {
              if (err) throw err;
              console.log(`${res.affectedRows} role inserted!\n`);
              // re-prompt the user for what they want to do
              start();
            }
          );
        });
    });
}

function addEmployee() {
    console.log("Please provide the following information for the new employee:");
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "First Name: ",
          validate: function (input) {
            if (input === "") {
              return "Please provide a valid first name";
            } else {
              return true;
            }
          },
        },
        {
          name: "last_name",
          type: "input",
          message: "Last Name: ",
          validate: function (input) {
            if (input === "") {
              return "Please provide a valid last name";
            } else {
              return true;
            }
          },
        },
        {
          name: "role_id",
          type: "list",
          message: "Select the employee's role:",
          choices: roleChoices,
        },
        {
          name: "manager_id",
          type: "list",
          message: "Select the employee's manager:",
          choices: managerChoices,
        },
      ])
      .then((answer) => {
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id,
          },
          function (err) {
            if (err) throw err;
            console.log("The new employee was added successfully!");
            start();
          }
        );
      });
}
  
