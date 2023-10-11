const express = require('express');
const {registerDriver, loginDriver, getDriverOrder, getDriver, updateDriver, updateDriverOrder, assignOrderToDriver} = require('../controllers/driversController');
const router = express.Router();

router.post('/register', registerDriver);
router.post('/login', loginDriver);
router.get('/:id', getDriver);
router.put('/:id', updateDriver);
router.get('/:id', getDriverOrder);
router.get('/:id', updateDriverOrder);
router.get('/orders/:id', assignOrderToDriver);

module.exports = router;


