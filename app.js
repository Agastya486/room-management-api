const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// import routes
const authRoutes = require('../room-management/route/authRoutes');
const roomRoutes = require('../room-management/route/admin/roomRoutes');
const userRoutes = require('../room-management/route/userRoutes');
const reservationRoutes = require('../room-management/route/reservationRoutes');

// use routes
app.use(authRoutes);
app.use(roomRoutes);
app.use(userRoutes);
app.use(reservationRoutes);

app.listen(port, () =>{
    console.log('Connected on port ' + port);
})