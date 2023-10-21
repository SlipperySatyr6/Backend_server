const express = require('express');
const { getOrders, createOrders, getOrder, updateOrder, currentOrders, deleteOrder, getAll} = require('../controllers/ordersController');
const router = express.Router();
const validatetoken = require('../middleware/validate');

router.use(validatetoken);
router.get('/', getOrders);
router.get('/all', getAll);  
router.post('/',validatetoken,createOrders);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.get('/current', currentOrders);
router.delete('/:id', deleteOrder);


module.exports = router;
