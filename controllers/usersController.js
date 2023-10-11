const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const createUsers = async (req, res) => {
    const { name, surname, email, password, phoneNumber } = req.body;

    // Perform data validation specific to the 'users' table here
    if (!name || !surname || !email || !password || !phoneNumber) {
        return res.status(400).json({ success: false, error: 'Please provide all the required fields' });
    }
    const userAlreadyExists = await User.findOne({ where: { email } });
    if (userAlreadyExists) {
        return res.status(400).json({ success: false, error: 'User already exists' });
    }

    //Hash password
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword); 
   
    const user = await User.create({
        //User id should be assigned by the validation middleware from the JWT token
        userId: req.user,
        name,
        surname,
        email,
        password: hashedpassword,
        phoneNumber,
    });

    console.log('User created ${user}');
    //sending response using try catch
    try {
        if (user) {
            res.status(201).json({ _id: user._id, email: user.email });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid user data' });
    }
    //res.json({ success: true, user });

};

const loginUser = async (req, res) => {
    // console.log('The request body is :', req.body);

    const {email, password } = req.body;
    console.log(email);
    console.log(   password);
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Please provide all the required fields' });
        
    }
    const users = await User.findOne({where: {email}});
    

    // console.log({ message: 'loginUser' });
    //console.log(user);
    //compare password with hashedpassword
    //const hashedpassword = await bcrypt.hash(password, 10);
    // console.log(hashedpassword);
    console.log(users.password);
    // console.log(password);
    // if (users && (await bcrypt.compare(password, users.password))) {
    // comparing that the password is correct
    if (users && (password === users.password)) {
        const token = jwt.sign({
            users: {
                id: users.id,
                name: users.name,
                surname: users.surname,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10d' });
        console.log(users);
        res.json({
            _id: users.id,
            name: users.name,
            surname: users.surname,
            token,
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid email or password' });
    }
};

const getUsers = async (req, res) => {
    const users = await User.findAll();
    res.json({ success: true, users });
};

const getUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    }
    res.json({ success: true, user });
};

const updateUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    } res.json({ success: true, user });
};

const currentUser = async (req, res) => {
    const user = await User.findByPk(req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
    } res.json({ success: true, user });
};

module.exports = { createUsers, getUsers, getUser, updateUser, currentUser, loginUser };