const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection to the database
const db = mysql.createConnection(
  {
    host: '127.0.0.1',
    user: 'root',
    password: 'password', 
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);


function viewDepartments() {
  db.query(`SELECT * FROM departments`, (err, result) => {
      if (err) {
          console.error(err);
          return 'error: cannot find the list of deparments.';
      }
      console.table(result);
      init();
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, (err, result) => {
      if (err) {
          console.error(err);
          return 'error: cannot find the list of roles.';
      }
      console.table(result);
      init();
  }); 
}

function viewEmployees() {
  db.query(`SELECT * FROM employees`, (err, result) => {
      if (err) {
          console.error(err);
      }
      console.table(result);
      init();
  });
}

function addDepartment(departmentName) {
  inquirer.prompt([
      {
          type: 'input',
          name: 'departmentName',
          message: 'What is the name of the new department?'
      }
  ]).then((data) => {
      const { departmentName } = data;
      db.query(`INSERT INTO departments (name) VALUES ("${departmentName}");`, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log(`${departmentName} successfully added!`);
          init();
      });
  });
}

function addRole() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'What is the new roles title?'
      },
      {
          type: 'input',
          name: 'salary',
          message: 'What is the new roles salary?'
      },
      {
          type: 'input',
          name: 'departmentId',
          message: 'What is the department ID of the new role?'
      }
  ]).then((data) => {
      const { title, salary, departmentId } = data;
      db.query(`INSERT INTO roles (title, salary, department_id) VALUES ("${title}", ${salary}, ${departmentId});`, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log(`${title} successfully added!`);
          init();
      });
  });
}

function addEmployee() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'firstName',
          message: 'What is the employees first name?'
      },
      {
          type: 'input',
          name: 'lastName',
          message: 'What is the employees last name?'
      },
      {
          type: 'input',
          name: 'roleId',
          message: 'What is the role ID?'
      },
      {
          type: 'input',
          name: 'managerId',
          message: 'What is the manager ID?'
      }
  ]).then((data) => {
      const { firstName, lastName, roleId, managerId } = data;
      db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) 
                  VALUES ("${firstName}", "${lastName}", ${roleId}, ${managerId});`, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log(`${firstName} successfully added!`);
          init();
      });
  });
}

function updateEmployeeRole() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'employeeId',
          message: 'Which employee are you looking update?'
      },
      {
          type: 'input',
          name: 'roleId',
          message: 'What is their new role?'
      }
  ]).then((data) => {
      const { employeeId, roleId } = data;
      db.query(`UPDATE employees
                  SET role_id = ${roleId}
                  WHERE id = ${employeeId}`, (err, result) => {
          if (err) {
              console.error(err);
              return;
          }
          console.log(`Employee ${employeeId} successfully updated!`);
          init();
      });
  });
}


function init() {
  inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: ['View departments', 'View roles', 'View employees', 'Add a new department', 'Add a new role', 'Add a new employee', 'Update an employees role', 'Exit']
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
          case 'Add new department':
              addDepartment();
              break;
          case 'Add new role':
              addRole();
              break;
          case 'Add new employee':
              addEmployee();
              break;
          case 'Update an employees role':
              updateEmployeeRole();
              break;
          case 'Exit':
              exitPrompt();
              break;
        
      }
  })
}

init();

function exitPrompt(){ 
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Done?',
                choices: [
                    'Exit'
                ]
            }
        ]).then (action => {
            console.clear();
            startPrompt();

        })
}