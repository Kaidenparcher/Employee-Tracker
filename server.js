const mysql = require('mysql2');
const mysqlpromise = require('mysql2/promise');
const inquirer = require('inquirer');

const db = mysql.createConnection( 
    {
        host: `127.0.0.1`,
        user: 'root',
        password: "password",
        database: 'staff_db'
    },
    console.log("You are now connected to Staff db!")
);

const dbpromise = mysqlpromise.createPool(  
    {
        host: `127.0.0.1`,
        user: 'root',
        password: "password",
        database: 'staff_db'
    },
);

function startPrompt() { 
    inquirer
        .prompt([
            {
                type: 'list',    
                name: 'action',
                message: 'What are you looking to do today?',
                choices: [
                    'View all Employees',
                    'Update an Employee',
                    'View All Roles',
                    'Add a Role',
                    'View All Departments',
                    'Add a Department',
                    
                ]
            }
        ])
        .then(answer => {
            switch (answer.action) {
                case 'View all Employees':
                    db.query('SELECT employee.id,employee.first_name, employee.last_name, role.title, department.name, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;', (err, results) => {
                        console.table(results);
                        console.log(err);
                    })
                    exitPrompt()
                    break;


}