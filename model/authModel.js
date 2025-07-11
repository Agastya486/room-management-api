const fetchUserDatas = 'SELECT * FROM users WHERE email = $1';


// register
const registerUserQuery = 'INSERT INTO users(name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';

module.exports = {
    fetchUserDatas,
    registerUserQuery
};