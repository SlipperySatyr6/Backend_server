const express = require('express');
const mysql = require('mysql2');
const Sequelize = require('sequelize');



const db = new Sequelize(
  'deliveryapp',
  'root',
  '12345',
  {host: 'localhost',dialect: 'mysql'}
)

module.exports = db;

