const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getDoctorInfoController, getUpdatedProfileController } = require('../controller/doctorctrl')


// router object
const router = express.Router()

//GET single doctor 
router.post('/getDoctorInfo',authMiddleware,getDoctorInfoController)

// update Doctor

router.post('/updateProfile',authMiddleware,getUpdatedProfileController)

module.exports = router