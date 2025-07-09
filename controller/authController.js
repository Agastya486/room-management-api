const pool = require('../db/conn')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const SECRET_KEY = process.env.SECRET_KEY

// import model
const { fetchUserDatas, registerUserQuery } = require('../model/authModel')

async function registerUser(req, res){
    try{
        const { name, email, password } = req.body
        // check if email exist
        const fetchEmail = await pool.query(fetchUserDatas, [email])
        const existingUser = fetchEmail.rows[0]
        if(existingUser){
            return res.status(400).json({error: 'Email already exist'})
        }

        // salt and hash the password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // execute query
        await pool.query(registerUserQuery, [name, email, hashedPassword, 'user'])
        return res.status(201).json({
            message: 'Register Successfully'
        })
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function registerAdmin(req, res){
    try{
        const { name, email, password } = req.body
        // check if email exist
        const fetchEmail = await pool.query(fetchUserDatas, [email])
        const existingUser = fetchEmail.rows[0]
        if(existingUser){
            return res.status(400).json({error: 'Email already exist'})
        }

        // salt and hash the password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        
        // execute query
        await pool.query(registerUserQuery, [name, email, hashedPassword, 'admin'])
        return res.status(201).json({
            message: 'Register Successfully'
        })
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function loginController(req, res){
    try{
        // fetch user's input and database's data
        const { email, password } = req.body
        const storedDatas = await pool.query(fetchUserDatas, [email])
        
        // fetch email and password from db
        const matchedEmail = storedDatas.rows[0].email
        const storedPassword = storedDatas.rows[0].password
        
        const matchedPassword = await bcrypt.compare(password, storedPassword)
    
        if(matchedEmail && matchedPassword){
            const token = jwt.sign({
                id: storedDatas.rows[0].id,
                name: storedDatas.rows[0].name,
                email: storedDatas.rows[0].email,
                role: storedDatas.rows[0].role
            }, SECRET_KEY, {expiresIn: '24h'})
    
            return res.status(200).json({
                token,
                message: 'Login success'
            })
        } else{
            return res.status(401).json({error: 'invalid email or password'})
        }
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})       
    }
}


module.exports = {
    registerUser,
    registerAdmin,
    loginController
}