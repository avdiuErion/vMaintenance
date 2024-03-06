const { Register, Login, GetAllUsers, DeleteUser, GetUserIdFromToken, GetById } = require('./users.service');
const vMaintUtility = require('../../helpers/vmaintenance.utility');

async function httpRegisterUser(req, res) {
    try {
        const { username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            const data = 'Password is not the same in both fields!'
            res.render('register', {
                data
            });
        }else{
            await Register(username, password);

            res.redirect('/');
        }
    } catch (Error) {
        if (Error.code === 11000) {
            res.status(409).json({ message: 'User already in use' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }

}

async function httpGetRegister(req, res) {
    const data = '';
    res.render('/register', {
        data
    });
}

async function httpLogUserIn(req, res) {
    try {
        const { username, password } = req.body;
        let token;

        try {
            token = await Login(username, password);
        } catch (error) {
            // Handle the error when login fails
            res.status(401).json({ message: error.message });
            return;
        }

        // Authentication successful
        res.cookie('token', token, { httpOnly: true });
        req.session.loggedin = true;

        await vMaintUtility.redirectToDashboard(req, res, token, true);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function httpLogUserOut(req, res) {
    try {
        res.clearCookie('token');
        req.session.loggedin = false;
        res.redirect('/');
    } catch (Error) {
        return res.status(400).json(`${Error}`)
    }
}

async function httpGetAllUsers(req, res) {
    try {
        const userId = await GetUserIdFromToken(req.cookies.token);
        const data = await GetAllUsers(userId);

        res.render('users/users', {
            data
        });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

async function httpDeleteUser(req, res) {
    try {
        const id = req.params.id;
        await DeleteUser(id);

        res.status(200).json({ message: 'User deleted' });
    } catch (Error) {
        return res.status(400).json(`${Error}`);
    }
}

module.exports = {
    httpRegisterUser,
    httpLogUserIn,
    httpLogUserOut,
    httpGetRegister,
    httpGetAllUsers,
    httpDeleteUser
};