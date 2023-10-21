const db = require("../config");
const { DataTypes } = require("sequelize");
const users = require("./users");
const drivers = require("./drivers");

const Order = db.define("orders", {

    //userID should be the same as the userID of the user that created the order
    userId: {
        type: DataTypes.STRING(100),
        required: true,
        ref: 'User',
        foreignKey: true,
        allowNull: false,
    }, 

    orderId: {
        type: DataTypes.STRING(100),
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
        foreignKey: true,
        ref: 'Driver',
        allowNull: true,
    },

});
Order.belongsTo(users, { foreignKey: "userId" });
Order.belongsTo(drivers, { foreignKey: "driverId" });



module.exports = Order;


