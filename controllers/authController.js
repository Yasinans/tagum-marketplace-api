const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authModel = require('../models/authModel');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

const login = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await authModel.getUserByUsername(username); 
        if(!user) return res.status(401).json({message: "Invalid Username or Password." });
        const isPassCorrect = await bcrypt.compare(password, user.Password);

        if(!isPassCorrect) return res.status(401).json({message: "Invalid Username or Password." });
        const token = jwt.sign({
            id:user.Employee_ID,
            username:user.Username,
            role:user.Role
            }, config.jwt.secret, {expiresIn:'3h'});

        res.status(200).json({message: "Login successful",token});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const getUser = async (req, res) => {
    const {id} = req.decodedToken;
    try {
        const user = await authModel.getUserById(id); 
        if(!user) return res.status(401).json({message: "User not found." });
        res.json(user);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

const updateUser = async (req, res) => {
    const {id} = req.decodedToken;
    const {password, username} = req.body;
    if (!password  || !username) return res.status(400).json({error: "All fields are required."});
    try {
        const user = await authModel.getUserById(id); 
        if(!user) return res.status(401).json({message: "User not found." });
        const userWithPass = await authModel.getUserByUsername(user.Username); 
        const isPassCorrect = await bcrypt.compare(password, userWithPass.Password);
        if (isPassCorrect) return res.status(400).json({error: "New password must be different from the old one."});
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateUser = await authModel.updateUser(id, username, hashedPassword);
        res.json(updateUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
module.exports = {login, getUser, updateUser};