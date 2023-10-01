const {DataTypes} = require("sequelize");
console.log("date type ok")
const SQLconnection = require("../db/connection");
console.log("sql connection ok")




const User = SQLconnection.define("User",{
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;