function isAdmin(req,res,next){
    if(req.user && req.user.role === 'admin'){
        return next()
    } else{
        return res.status(401).json({error: 'Access denied. Admin only'})
    }
}

module.exports = isAdmin;