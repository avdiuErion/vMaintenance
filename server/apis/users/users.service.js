const User = require('./users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function Register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return await User.create({ username, password: hashedPassword });
}

async function Login(username, password) {
    const user = await User.findOne({ where: { username: username }, raw: true });

    if (!user) {
        throw new Error('Autentifikimi deshtoi. Ju lutemi shikoni kredencialet!');
    }

    if (!user.isActive) {
        throw new Error('Perdoruesi eshte jo aktiv!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Autentifikimi deshtoi. Ju lutemi shikoni kredencialet!');
    }

    return jwt.sign({ userId: user.id }, jwtSecret);
}

async function GetUserIdFromToken(token) {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;

    return userId;
}

async function GetAllUsers(userId) {
    const user = await User.findByPk(userId);
    if (user.username !== 'admin') {
        throw new Error('Not authorized to see data!');
    }

    return await User.find({ isActive: true, username: { $ne: 'admin' } }, {
        '__v': 0
    });
}

async function DeleteUser(id) {
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User doesn't exist`);
    }

    user.isActive = false;
    console.log(user);

    return await User.findByIdAndUpdate(id, user);
}

async function GetById(id) {
    return await User.findByPk(id);
}

module.exports = {
    Register,
    Login,
    GetUserIdFromToken,
    GetAllUsers,
    DeleteUser,
    GetById
};