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