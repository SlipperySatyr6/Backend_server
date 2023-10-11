const express = require('express');
const {createUsers, getUsers,getUser,updateUser, currentUser,loginUser} = require('../controllers/usersController');
const validatetoken = require('../middleware/validate');
const router = express.Router();


router.post('/create', createUsers);
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);
router.get('/current', validatetoken , currentUser);


module.exports = router;