const bcrypt = require('bcrypt');
const password = 'admin123'; // your password here. Example: 'admin123'
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) throw err
  console.log('Hashed password:', hash);
})