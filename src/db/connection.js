const {Sequelize} = require("sequelize");
require("dotenv").config();
// dotenv for testing purposes only
console.log("pre SQl connection")
const SQLconnection = new Sequelize(process.env.SQL_URI);

SQLconnection.authenticate();
console.log("Connection to DB Working");

module.exports = SQLconnection;