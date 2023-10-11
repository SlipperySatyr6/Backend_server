//container stores the data for the packages in the container.
//the container should have the following properties:
//driverId, orderID, location, temperature, status, batteryLevel, iceLevel
//the container should be able to store multiple packages

const db = require("../config");
const { DataTypes } = require("sequelize");
const Container = db.define("container", container);

const container = {
    driverId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    batteryLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    iceLevel: {
        type: DataTypes.STRING,
        allowNull: false,
    },
};


module.exports = Container;