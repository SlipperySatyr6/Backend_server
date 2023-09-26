const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config');

const app = express();
const port = 3000;

// db.connect(err => {
//     if (err) {
//       console.error('Error connecting to the database: ' + err.message);
//     } else {
//       console.log('Connected to the database');
//     }
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const ordersRoute = require('./routes/ordersRoute');
app.use('/orders', ordersRoute);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/users', (req, res) => {
  const { name, surname, email, password, phoneNumber, location } = req.body;

  // Perform data validation here (e.g., check if fields are not empty)

  const sql = 'INSERT INTO users (name, surname, email, password, phoneNumber, location) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, surname, email, password, phoneNumber, location], (err, result) => {
    if (err) {
      console.error('Error inserting data into the users table: ' + err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log('Data inserted into the orders table  ');
      res.json({ success: true });
    }
  });
});

app.post('/orders', (req, res) => {
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

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into the orders table: ' + err.message);
      res.status(500).json({ success: false, error: err.message });
    } else {
      console.log('Data inserted into the orders table');
      res.json({ success: true });
    }
  });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });