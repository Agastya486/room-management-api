const getUserQuery = 'SELECT id, name, email, role FROM users WHERE id = $1'
const editUserQuery = 'UPDATE users SET name = COALESCE($1,name), email = COALESCE($2,email) WHERE id = $3'
const deleteUserQuery = 'DELETE from users WHERE id = $1'

module.exports = {
    getUserQuery,
    editUserQuery,
    deleteUserQuery
}