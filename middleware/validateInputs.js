// register
function userValidateInputsRegister(req, res, next){
    const { name, email, password, confirmPassword } = req.body

    if(!name || !email || !password || !confirmPassword){
       return res.status(401).json({error: 'Must input all the required fields'})
    } 
    else if(password != confirmPassword){
        return res.status(401).json({error: 'Password does not match'})
    }     
    next()
}

function adminValidateInputsRegister(req, res, next){
    const { name, email, password, confirmPassword } = req.body

    if(!name || !email || !password || !confirmPassword){
       return res.status(401).json({error: 'Must input all the required fields'})
    } 
    else if(password != confirmPassword){
        return res.status(401).json({error: 'Password does not match'})
    }
    else if(req.user.role !== 'admin'){
        return res.status(403).json({error: 'Only admin can register admin. Unauthorized'})
    }     
    next()
}

function validateInputsLogin(req, res, next){
    const { email, password } = req.body
    if(!email || !password){
       return res.status(401).json({error: 'Must input all the required fields'})
    } 
    next()
}

module.exports = {
    userValidateInputsRegister,
    validateInputsLogin,
    adminValidateInputsRegister
}