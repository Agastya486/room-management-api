const isUser = (checkParams = false) =>{
    return (req,res,next) => {
        const paramsId = req.params.id
        const tokenId = req.user.id
        const userRole = req.user.role
        if(userRole !== 'user'){
            return res.status(401).json({error: 'User only. Unauthorized'})
        }
        
        if(checkParams && String(paramsId) !== String(tokenId)){
            return res.status(401).json({error: 'ID mismatch. Unauthorized'})
        }

        next()
    }
}

module.exports = isUser