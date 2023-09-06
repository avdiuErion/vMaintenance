const User = require('./users.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function Register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({ username, password: hashedPassword });
}

async function Login(username, password) {
    const user = await User.findOne({ username: username });
    if (!user) {
        return('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return('Invalid credentials');
    }

    return jwt.sign({ userId: user._id }, jwtSecret);
}

async function GetUserIdFromToken(token) {
    const decoded = jwt.verify(token, jwtSecret);  
    const userId = decoded.userId;  

    return userId;
}

async function GetAllUsers(userId){
    const user = await User.findById(userId);
    if(user.username !== 'admin'){
        throw new Error('Not authorized to see data!');
    }

    return await User.find({}, {
        '__v': 0
    });
}

async function DeleteUser(id){
    const user = User.findById(id);
    if(!user){
        throw new Error(`User doesn't exist`);
    }

    await User.findByIdAndDelete(id);
}

async function GetById(id){
    return await User.findById(id);
}

module.exports = {
    Register,
    Login,
    GetUserIdFromToken,
    GetAllUsers,
    DeleteUser,
    GetById
};