const express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');



const db = new Sequelize(
  'deliveryapp',
  'root',
  //'12345',
  'congabeatZ86',
  {host: 'localhost',dialect: 'mysql'}
)

// const db = new Sequelize(
//   'sql11654106',
//   'sql11654106',
//   'cFnMy9nWFY',
//   {host: 'sql11.freesqldatabase.com',dialect: 'mysql'}
// )

module.exports = db;

