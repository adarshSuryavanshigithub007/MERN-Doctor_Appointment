const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController, getAllDoctorController, changeAccountStatusController } = require('../controller/adminctrl')



// router object
const router = express.Router()

//GET METHOD || USERS
router.get('/getAllUsers',authMiddleware,getAllUsersController)

//GET METHOD || ADMIN 
router.get('/getAllDoctors',authMiddleware,getAllDoctorController)

//GET ACCOUNT STATUS
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports = router