const db = require("../config");
const orders = require("../models/orders");
const users = require("../models/users");
const createOrderNumber = require("../middleware/ordernumber");

// i want to get the user id from the users table and insert it into the orders table




//@desc     Create a new order
//@route    POST /orders
//@access   private
const createOrders = async (req, res) => {
  console.log('The request body is :', req.body);
  const {
    companyName,
    productType,
    productName,
    tempRange,
    pickupLocation,
    dropoffLocation,
    customersName,
    customersNumber,
  } = req.body;

  // Perform data validation specific to the 'orders' table here
  orders.create({
    userID: users.id,
    orderID: createOrderNumber,
    companyName, 
    productType,
    productName,
    tempRange,
    pickupLocation,
    dropoffLocation,
    customersName,
    customersNumber,
  }).then((order) => {
    res.json({ success: true, order });
  }).catch((err) => {
    console.error('Error inserting data into the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
};
//@desc     Get all orders
//@route    GET /orders
//@access   private
const getOrders = async (req, res) => {
  orders.findAll().then((orders) => {
    res.json({ success: true, orders });
  }).catch((err) => {
    console.error('Error retrieving data from the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
}

//@desc     Get a single order
//@route    GET /orders/:id
//@access   private
const getOrder = async (req, res) => {
  const order = await order.find({ _id: req.params.id })
  orders.findByPk(req.params.id).then((order) => {
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.json({ success: true, order });
  }).catch((err) => {
    console.error('Error retrieving data from the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
}

//@desc     Update an order
//@route    PUT /orders/:id
//@access   private
const updateOrder = async (req, res) => {
  orders.findByPk(req.params.id).then(async (order) => {
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    
    const updatedOrder = await order.update(req.body, { where: { id: req.params.id } }, { new: true });
    res.json({ success: true, order });
  }).catch((err) => {
    console.error('Error retrieving data from the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
}

//@desc     Get all current orders
//@route    GET /orders/current
//@access   private
const currentOrders = async (req, res) => {
  orders.findAll({ where: { status: 'current' } }).then((orders) => {
    res.json({ success: true, orders });
  }).catch((err) => {
    console.error('Error retrieving data from the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
}

//@desc     Delete an order
//@route    DELETE /orders/:id
//@access   private
const deleteOrder = async (req, res) => {
  orders.findByPk(req.params.id).then(async (order) => {
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    await order.destroy();
    res.json({ success: true, message: 'Order has been cancelled' });
  }).catch((err) => {
    console.error('Error retrieving data from the orders table: ' + err.message);
    res.status(500).json({ success: false, error: err.message });
  });
}

module.exports = { getOrders, createOrders, getOrder, updateOrder, currentOrders, deleteOrder };