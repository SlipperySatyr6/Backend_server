const express = require('express');
const { getOrders, createOrders } = require('../controllers/ordersController');
const router = express.Router();

router.get('/', getOrders);  
router.post('/', createOrders);




module.exports = router;
