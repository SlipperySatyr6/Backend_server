const Driver = require('../models/drivers');
//const orders = require('../models/orders');

//the driver controller should have the following functions:
//1. registerDriver
//2. loginDriver
//4. getDriverDetails
//5. updateDriverDetails
//6. getDriverOrder (order number is assigned to a contianer)
//7. updateDriverOrder



//1. registerDriver
//this function should take in the following parameters:
//name, surname, email, password, phoneNumber, licenseNumber, vehicleNumber, vehicleType
//this function should return the following:
//a success message if the driver is successfully registered (create driver account)
const registerDriver = async (req, res) => {
    const { name, surname, email, password, phoneNumber, licenseNumber, vehicleNumber, vehicleType } = req.body;

    //perform data validation specific to the 'drivers' table here
    if(!name || !surname || !email || !password || !phoneNumber || !licenseNumber || !vehicleNumber || !vehicleType){
        return res.status(400).json({ success: false, error: 'Please provide all the required fields' });
    }
    const driverAlreadyExists = await Driver.findOne({ where: { email } });
    if (driverAlreadyExists) {
        return res.status(400).json({ success: false, error: 'Driver already exists' });
    }

    const driver = await Driver.create({
        //driver id should be assigned by the validation middleware from the JWT token
        driverId: req.driver,
        name,
        surname,
        email,
        password,
        phoneNumber,
        licenseNumber,
        vehicleNumber,
        vehicleType,
    });

    console.log('Driver created ${driver}');
    //sending response using try catch
    try {
        if (driver) {
            res.status(201).json({ _id: driver._id, email: driver.email, 
                success: true, driver});
        }
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid driver data' });
    }
    // res.json({ success: true, driver });
};
//2. loginDriver
//this function should take in the following parameters:
//email, password
//this function should return the following:
//a success message if the driver is successfully logged in (create driver session)
const loginDriver = async (req, res) => {
//check is driver exists
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide all the required fields' });
        
    }
    const drivers = await Driver.findOne({where: {email}});

    if (drivers && (password === drivers.password)) {
        const token = jwt.sign({
            driverId: drivers.driverId,
            name: drivers.name,
            surname: drivers.surname,
            email: drivers.email,
            phoneNumber: drivers.phoneNumber,
            licenseNumber: drivers.licenseNumber,
            vehicleType: drivers.vehicleType,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d' });
        console.log(drivers);
        res.json({
            _id: drivers.id,

            name: drivers.name,
            surname: drivers.surname,
            token,
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
    
}
//4. getDriverDetails
//this function should take in the following parameters:
//name, surname, phoneNumber, licenseNumber, vehicleNumber, vehicleType
//this function should return the following:
//a success message if the driver details are successfully retrieved
const getDriver = async (req, res) => {
    const driver = await Driver.findOne({where: {driverId: req.driverId}});
    if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
    }
    res.json({ success: true, driver });
}

//5. updateDriverDetails
//this function should take in the following parameters:
//name, surname, phoneNumber, licenseNumber, vehicleNumber, vehicleType
//this function should return the following:
//a success message if the driver details are successfully updated
const updateDriver = async (req, res) => {
    const { name, surname, phoneNumber, licenseNumber, vehicleNumber, vehicleType } = req.body;
    const driver = await Driver.findOne({where: {driverId: req.driverId}});
    if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
    }
    driver.name = name;
    driver.surname = surname;
    driver.phoneNumber = phoneNumber;
    driver.licenseNumber = licenseNumber;
    driver.vehicleNumber = vehicleNumber;
    driver.vehicleType = vehicleType;
    await driver.save();
    res.json({ success: true, driver });
}

//6. getDriverOrder
//this function should take in the following parameters:
//orderId
//this function should return the following:
//the order details of the order that the driver is currently delivering
const getDriverOrder = async (req, res) => {
    const driver = await Driver.findOne({where: {driverId: req.driverId}});
    if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
    }
    res.json({ success: true, driver });
}

//7. updateDriverOrder
//this function should take in the following parameters:
//orderId, status
//this function should return the following:
//a success message if the order status is successfully updated
const updateDriverOrder = async (req, res) => {
    const { orderId, status } = req.body;
    const driver = await Driver.findOne({where: {driverId: req.driverId}});
    if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
    }
    driver.orderId = orderId;
    driver.status = status;
    await driver.save();
    res.json({ success: true, driver });
}

//assign order to driver
//this function should take in the following parameters:
//orderId (is the order number from orders), driverId
//this function should return the following:
//a success message if the order is successfully assigned to the driver
const assignOrderToDriver = async (req, res) => {
    const { orderId } = req.body;
    const driver = await Driver.findOne({where: {driverId: req.driverId}});
    if (!driver) {
        return res.status(404).json({ success: false, error: 'Driver not found' });
    }
    driver.orderId = orderId;
    await driver.save();
    res.json({ success: true, driver });
}
//assign driver to order
//this function should take in the following parameters:
//orderId (is the order number from orders), driverId
//this function should return the following:
//a success message if the order is successfully assigned to the driver
const assignDriverToOrder = async (req, res) => {
    const { driverId } = req.body;
    const order = await Order.findOne({where: {orderId: req.orderId}});
    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }
    order.driverId = driverId;
    await order.save();
    res.json({ success: true, order });
}

module.exports = {
    registerDriver,
    loginDriver,
    getDriver,
    updateDriver,
    getDriverOrder,
    updateDriverOrder,
    assignOrderToDriver,
    assignDriverToOrder,
};



