const getReservationsQuery = 'SELECT * FROM reservations WHERE user_id = $1';
const addReservationQuery = 'INSERT INTO reservations(user_id, room_id, start_date, end_date) VALUES($1, $2, $3, $4)';

const checkReservationQuery = 'SELECT * FROM reservations WHERE room_id = $1 AND start_date < $3 AND end_date > $2';

module.exports = {
    getReservationsQuery,
    addReservationQuery,
    checkReservationQuery
};