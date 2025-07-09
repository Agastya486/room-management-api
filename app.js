const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// import routes
const authRoutes = require('../room-management/route/authRoutes')
const roomRoutes = require('../room-management/route/admin/roomRoutes')
const userRoutes = require('../room-management/route/userRoutes')
const reservationRoutes = require('../room-management/route/reservationRoutes')

// user routes
app.use(authRoutes)
app.use(roomRoutes)
app.use(userRoutes)
app.use(reservationRoutes)

app.listen(port, () =>{
    console.log('Connected on port ' + port)
})