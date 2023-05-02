const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'staff_db'
},
  console.log('Connected to the database')
);



// Prompt user to select an option
function init() {
  inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View departments', 'View roles', 'View employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee\'s role']
  }]).then((choice) => {
      switch(choice.action) {
          case 'View departments':
              viewDepartments();
              break;
          case 'View roles':
              viewRoles();
              break;
          case 'View employees':
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
          case 'Update an employee\'s role':
              updateEmployeeRole();
              break;
      }
  })
}

function viewDepartments() {
  db.query(`SELECT * FROM departments`, (err, result) => {
      if (err) {
          console.error(err);
          return 'error: Failed to find list of departments.';
      }
      console.table(result);
      init();
  });
}

// Function to view all roles
function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, result) => {
      if (err) {
          console.error(err);
          return 'error: failed to retrieve department list.';
      }
      console.table(result);
      init();
  }); 
}
  
  // Function to view all employees
  function viewEmployees() {
    db.query(`SELECT * FROM employees`, (err, result) => {
        if (err) {
            console.error(err);
        }
        console.table(result);
        init();
    });
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
  
init();