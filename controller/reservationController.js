const pool = require('../db/conn')

// import model
const { getReservationsQuery, addReservationQuery, checkReservationQuery } = require('../model/reservationsModel');

async function getReservations(req,res){
    const id = req.user.id;
    try{
        const result = await pool.query(getReservationsQuery, [id]);
        return res.status(200).json(result.rows)
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }
}

async function addReservation(req, res){
    try{
        const user_id = req.user.id;
        const { room_id, start_date, end_date } = req.body;
        
        // check if already reserved
        const checkReservation = await pool.query(checkReservationQuery, [room_id, start_date, end_date]);
        if(checkReservation.rows.length > 0){
            return res.status(400).json({Error: "Room already reserved"})
        }
        
        // insert to DB
        await pool.query(addReservationQuery, [user_id, room_id, start_date, end_date]);
        return res.status(200).json({message: 'Added successfully'})
    } catch(err){
        return res.status(500).json({error: 'Something went wrong: ' + err})
    }

}

module.exports = {
    getReservations,
    addReservation
};