const express = require('express');
const router = express.Router();

// import middleware
const verifyToken = require('../../middleware/verifyToken') ;
const isAdmin = require('../../middleware/isAdmin');

// import controller
const { getAllRooms, createRoom, editRoom, deleteRoom } = require('../../controller/roomController');

router.get('/rooms', verifyToken, isAdmin, getAllRooms); // list all rooms
router.post('/rooms', verifyToken, isAdmin, createRoom); // create rooms
router.patch('/rooms/:id', verifyToken, isAdmin, editRoom); // update rooms
router.delete('/rooms/:id', verifyToken , isAdmin, deleteRoom); // delete rooms

module.exports = router;