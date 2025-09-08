const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// import routes
const authRoutes = require('./route/authRoutes');
// Admin routes
const roomRoutes = require('./route/admin/roomRoutes');
const adminUserRoutes = require('./route/admin/adminUserRoutes');
// User routes
const userRoutes = require('./route/user/userRoutes');
const reservationRoutes = require('./route/user/reservationRoutes');

// use routes
app.use(authRoutes);
app.use(roomRoutes);
app.use(userRoutes);
app.use(reservationRoutes);
app.use(adminUserRoutes);

app.listen(port, () =>{
    console.log('Connected on port ' + port);
})