const express = require('express')
const router = express.Router()

// import middleware
const verifyToken = require('../middleware/verifyToken') 
const isUser = require('../middleware/isUser')

// import controller
const { getReservations, addReservation } = require('../controller/reservationController')

router.get('/reservations', verifyToken, isUser(), getReservations) // GET all user's reservations 
router.post('/reservations', verifyToken, isUser(), addReservation) // add reservation

module.exports = router