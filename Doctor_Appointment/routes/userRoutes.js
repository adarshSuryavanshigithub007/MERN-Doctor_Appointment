const express = require('express')
const { loginController, registerController, authController, applyDoctorController } = require('../controller/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

// router object
const router = express.Router()

//routes

//login ,post
router.post('/login', loginController)

//register, post 
router.post('/register', registerController)

// Auth
router.post('/getUserData', authMiddleware, authController)

// doctor Auth
router.post('/apply-doctor', authMiddleware, applyDoctorController)

module.exports = router