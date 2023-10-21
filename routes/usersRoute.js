const express = require('express');
const {createUsers, getAllUsers,getUser,updateUser, currentUser,loginUser, getOnlineUsers} = require('../controllers/usersController');
const validatetoken = require('../middleware/validate');
const router = express.Router();


router.post('/create',createUsers);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.get('/online', getOnlineUsers);
router.get('/current', validatetoken , currentUser);


module.exports = router;