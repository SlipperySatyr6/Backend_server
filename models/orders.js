const db = require("../config");
const { DataTypes } = require("sequelize");

const Order = db.define("orders", {

    //userID should be the same as the userID of the user that created the order
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        required: true,
        ref: 'User',
        primaryKey: true,
        allowNull: false,
    }, 

    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productType: {
        type: DataTypes.STRING,
        allowNull: false,
    },  
    productName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempRange: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pickupLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dropoffLocation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customersName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    customersNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
    },
    //driverID will contain the driverID of the driver that is currently delivering the order
    driverId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        ref: 'Driver',
        allowNull: true,
    },

});


module.exports = Order;


