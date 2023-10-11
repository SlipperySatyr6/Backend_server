const db = require("../config");   
const { DataTypes } = require("sequelize");

const Driver = db.define("drivers", {

    driverId: {
        type: DataTypes.UUID,
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
    licenseNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        validate:{
            isNumeric: true,
        },
    },
    vehicleNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique:true,
        validate:{
            isNumeric: true,
        },
    },
    vehicleType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //orderID will contain the orderID of the order that the driver is currently delivering
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: true,
    },
    
});


module.exports = Driver;
