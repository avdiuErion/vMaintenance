const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

async function Authorize(req, res, next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized'});
    }else{
        try{
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            next();
        }catch(error){
            return res.status(401).json({ message: 'Unauthorized'});
        }
    }
}

module.exports = {
    Authorize
};