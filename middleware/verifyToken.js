const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

async function verifyToken(req, res, next){
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.status(401).json({error: 'No token provided'})
    }
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(403).json({error: 'Failed to authenticate token'})
        }

        console.log(decoded)
        req.user = decoded
        next()
    })
}

module.exports = verifyToken