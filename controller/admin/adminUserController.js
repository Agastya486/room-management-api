const pool = require('../../db/conn');

const getAllUsersQuery = require('../../model/admin/adminUserModel');

async function getAllUsers(req, res){
    try{
        const result = await pool.query(getAllUsersQuery);
        return res.status(200).json(result.rows)
    } catch(err){
        return res.status(500).json({error: 'Something went wrong'})
    }
}

module.exports = getAllUsers;