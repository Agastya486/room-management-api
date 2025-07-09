const pool = require('../db/conn')

// import model
const { getAllRoomsQuery, createRoomQuery, editRoomQuery, deleteRoomQuery } = require('../model/roomModel')

async function getAllRooms(req,res){
    try{
        const result = await pool.query(getAllRoomsQuery)
        return res.status(200).json(result.rows)
    } catch(err){
        return res.status(500).json({error: 'Something went wrong'})
    }
}

async function createRoom(req,res){
    try{
        const { name, floor, price, capacity } = req.body
        await pool.query(createRoomQuery, [ name, floor, price, capacity])
        return res.status(201).json({message: 'Room added successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function editRoom(req, res) {
    try{
        let {name, floor, price, capacity } = req.body
        const id = req.params.id
        
        name = name ?? null
        floor = floor ?? null
        price = price ?? null
        capacity = capacity ?? null
    
        await pool.query(editRoomQuery, [name, floor, price, capacity, id])
        return res.status(200).json({message: 'Room edited successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function deleteRoom(req, res){
    try{
        const id = req.params.id
    
        await pool.query(deleteRoomQuery, [id])
        return res.status(200).json({message: 'Deleted successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

module.exports = {
    getAllRooms,
    createRoom,
    editRoom,
    deleteRoom
}