const express = require('express');
const mysql = require('mysql');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'deliveryapp',
});

module.exports = db;

