const { get } = require("http");
const db = require("../config");
const squelize = require("sequelize");


const createOrders = async(req, res)=>{
  const {
    companyname,
    producttype,
    productname,
    temprange,
    pickuplocation,
    dropofflocation,
    customersname,
    customersnumber,
  } = req.body;

  // Perform data validation specific to the 'deliveries' table here

  const sql =
    'INSERT INTO orders (companyname, producttype, productname, temprange, pickuplocation, dropofflocation, customersname, customersnumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [
    companyname,
    producttype,
    productname,
    temprange,
    pickuplocation,
    dropofflocation,
    customersname,
    customersnumber,
  ];
};

const getOrders = async (req, res) => {
    // Define a SQL query to select all orders from the 'orders' table
    const sql = 'SELECT * FROM orders';
  
    // Execute the query to fetch orders from the database
    db.query(sql, (err, results) => {
      if (err) {
        console.error('Error fetching orders: ' + err.message);
        res.status(500).json({ success: false, error: err.message });
      } else {
        // Send the fetched orders as a JSON response
        res.json({ success: true, orders: results });
      }
    });
  };

module.exports = {getOrders,createOrders};