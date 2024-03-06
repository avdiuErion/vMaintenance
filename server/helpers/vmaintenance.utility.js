const userService = require('../apis/users/users.service');

async function isUserAdmin(token) {
    const userId = await userService.GetUserIdFromToken(token);
    const user = await userService.GetById(userId);

    return user.username === 'admin';
}

async function redirectToDashboard(req, res, token = null, setHeader = false) {
    if(token != null){
        const isAdmin = await isUserAdmin(token);
        if (setHeader)
            req.session.isAdmin = isAdmin;
    
        if (isAdmin) {
            res.redirect('../../users');
        } else {
            res.redirect('../../vehicles');
        }
    }else{
        res.render('index', {
            data: '',
        })
    }
    
}
module.exports = { isUserAdmin, redirectToDashboard };