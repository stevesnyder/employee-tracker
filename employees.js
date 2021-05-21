const mysql = require("mysql2");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Jeffreys10",
  database: "employeesdb",
});

connection.connect((err) => {
  if (err) throw err;
  runProgram();
});

const runProgram = () => {
  inquirer
    .prompt({
      name: "start",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.start) {
        case "View All Employees":
          viewEmployees();
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

        case "Update Employee Role":
          updateRole();
          break;

        case "Exit":
          connection.end();
          console.log("Goodbye");
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, data) {
    if (err) throw err;
    console.table(data);
    runProgram();
  });
};
const addEmployee = () => {
  connection.query("SELECT * FROM role", function (err, roleData) {
    const roles = roleData.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL", function (err, managerData) {
      const managerID = managerData.map(({first_name, last_name, id}) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the First Name of the New Employee?",
            name: "firstName",
          },
          {
            type: "input",
            message: "What is the Last Name of the New Employee?",
            name: "lastName",
          },
          {
            type: "list",
            message: "Select this employee's role",
            name: "roleID",
            choices: roles,
          },
          {
            type: "list",
            message: "Select this employee's manager",
            name: "managerID",
            choices: managerID,
          },
        ])

        .then(function (answer) {
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES(?,?,?,?)",
            [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
            function (err, data) {
              console.log("Employee has been Added.");
              runProgram();
            }
          );
        });
    });
  });
};

const addRole = () => {
  connection.query("SELECT * FROM department", function (err, departmentData) {
    const departments = departmentData.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "Name of role you would like to add?",
          name: "roleName",
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "salary",
        },
        {
          type: "list",
          message: "Select which department this role falls under",
          name: "department",
          choices: departments,
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO role(title, salary, department_id)VALUES(?,?,?)",
          [answer.roleName, answer.salary, answer.department],
          function (err, data) {
            console.log("Role has been Added.");
            runProgram();
          }
        );
      });
  });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Name of department you would like to add?",
        name: "addDept",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department(name)VALUES(?)",
        answer.addDept,
        function (err, data) {
          console.log("Department has been Added.");
          runProgram();
        }
      );
    });
};
const updateRole = () => {
  connection.query("SELECT * FROM employee", function (err, empData) {
    const empList = empData.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    connection.query("SELECT * FROM role", function (err, roleData) {
      const roles = roleData.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });

      inquirer
        .prompt([
          {
            type: "list",
            message: "Employee whose role you would like to update?",
            name: "employee",
            choices: empList,
          },
          {
            type: "list",
            message: "What is the Employee's Updated Role?",
            name: "role",
            choices: roles,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [answer.role, answer.employee],
            function (err, data) {
              console.log('Employee role has been updated');
              runProgram();
            }
          );
        });
    });
  });
}
