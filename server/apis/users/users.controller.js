const { Register, Login, GetAllUsers, DeleteUser, GetUserIdFromToken, GetById } = require('./users.service');

async function httpRegisterUser(req, res) {
    try{
        const { username, password, confirmPassword } = req.body;
        if(password !== confirmPassword){
            const data = 'Password is not the same in both fields!'
            res.render('../register', {
                data
            });
        }

        await Register(username, password);

        const data = 'Regjistrimi u krye me sukses!'
        res.redirect('/');
    }catch(Error){
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
    try{
        const { username, password } = req.body;
        const token = await Login(username, password);

        res.cookie('token', token, {httpOnly: true});
        req.session.loggedin = true;

        const isAdmin = await isUserAdmin(token);
        req.session.isAdmin = isAdmin;

        if(isAdmin){
            res.redirect('../../users');
        }else{
            res.redirect('../../vehicles');
        }
    }catch(error){
        console.log(error);
    } 
}

async function httpLogUserOut(req, res) {
    try{
        res.clearCookie('token');
        req.session.loggedin = false;
        res.redirect('/');
    }catch(Error){
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

async function isUserAdmin(token){
    const userId = await GetUserIdFromToken(token);
    const user = await GetById(userId);

    return user.username === 'admin';
}

module.exports = {
    httpRegisterUser,
    httpLogUserIn,
    httpLogUserOut,
    httpGetRegister,
    httpGetAllUsers,
    httpDeleteUser
};