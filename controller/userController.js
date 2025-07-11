const pool = require('../db/conn')

// import model
const { getUserQuery, editUserQuery, deleteUserQuery } = require('../model/userModel');

async function getUser(req,res){
    const id = req.user.id;
    try{
        const result = await pool.query(getUserQuery, [id]);
        return res.status(200).json(result.rows)
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function editUser(req, res){    
    try{
        let { name, email } = req.body;
        const id = req.params.id;
    
        name = name ?? null;
        email = email ?? null;

        await pool.query(editUserQuery, [name, email, id]);
        return res.status(200).json({message: 'Edited successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})  
    }
}

async function deleteUser(req, res){
    try{
        const id = req.params.id;
        await pool.query(deleteUserQuery, [id]);
        return res.status(200).json({message: 'Deleted successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }

}

module.exports = {
    getUser,
    editUser,
    deleteUser
};