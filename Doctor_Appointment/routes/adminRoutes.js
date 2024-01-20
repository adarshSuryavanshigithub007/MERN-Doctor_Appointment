const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllDoctorController } = require('../controller/adminctrl')



// router object
const router = express.Router()

router.get('/getAllUsers',authMiddleware,getAllUsersController)
router.get('/getAllAdmin',authMiddleware,getAllDoctorController)
module.exports = router