const db = require("../config");   
const { DataTypes } = require("sequelize");

const User = db.define("users", {

    // userId should be assigned by the validation middleware from the JWT token
    userId: {
        type: DataTypes.STRING(100),
        defaultValue: DataTypes.UUIDV4,
        required: true,
        primaryKey: true,
        allowNull: false,        
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false,   
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        validate:{
            isNumeric: true,
        },
    },
    logginStatus: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
});

// const create = async () => await db.sync({ force: true }).then(console.log("User table created"));

// create(),

module.exports = User;
