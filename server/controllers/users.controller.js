const { Register, Login } = require('../models/users/users.model');

async function httpRegisterUser(req, res) {
    try{
        const { username, password } = req.body;

        const user = await Register(username, password);

        return res.status(201).json({ message: 'User Created', user });
    }catch(Error){
        if (Error.code === 11000) {
            res.status(409).json({ message: 'User already in use' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

async function httpLogUserIn(req, res) {
    try{
        const { username, password } = req.body;

        const token = await Login(username, password);

        res.cookie('token', token, {httpOnly: true});

        res.redirect('/');
    }catch(error){
        console.log(error);
    } 
}

async function httpLogUserOut(req, res) {
    try{
        res.clearCookie('token');
        res.status(200).json({
            message: "Logged out successfully!"
        });
    }catch(Error){
        return res.status(400).json(`${Error}`)
    }
}

module.exports = {
    httpRegisterUser,
    httpLogUserIn,
    httpLogUserOut
};