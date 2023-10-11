const express = require('express');
const { getOrders, createOrders, getOrder, updateOrder, currentOrders, deleteOrder} = require('../controllers/ordersController');
const router = express.Router();
const validatetoken = require('../middleware/validate');

router.use(validatetoken);
router.get('/', getOrders);  
router.post('/',createOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.get('/current', currentOrders);
router.delete('/:id', deleteOrder);


module.exports = router;
