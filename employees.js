const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employeesDB",
});

connection.connect((err) => {
  if (err) throw err;
  runProgram();
});

const runProgram = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Roles",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
            displayAll();
          break;

        case "Add Employee":
            addEmployee();
          break;

        case "Add Role":
            addRole();
          break;

        case "Add Department":
            addDepartment();
          break;

        case "Update Employee Roles":
            updateEmployee();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
