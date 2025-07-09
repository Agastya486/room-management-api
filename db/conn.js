require('dotenv').config()
const pg = require('pg')

const { Pool } = pg

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
})

pool.on('error', (err) =>{
    console.error(err)
    process.exit(-1)
})


module.exports = pool