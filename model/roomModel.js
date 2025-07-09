const getAllRoomsQuery = 'SELECT * FROM rooms'
const createRoomQuery = 'INSERT INTO rooms(name, floor, price, capacity) VALUES($1, $2, $3, $4)'
const editRoomQuery = 'UPDATE rooms SET name = COALESCE($1, name), floor = COALESCE($2, floor), price = COALESCE($3, price), capacity = COALESCE($4, capacity) WHERE id = $5'
const deleteRoomQuery = 'DELETE from rooms WHERE id = $1'

module.exports = {
    getAllRoomsQuery,
    createRoomQuery,
    editRoomQuery,
    deleteRoomQuery
}