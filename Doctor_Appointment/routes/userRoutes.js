const express = require('express')
const { loginController, registerController, authController, applyDoctorController, notificationController, getAllNotificationController, deleteAllNotificationController } = require('../controller/userCtrl')
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

// doctornotifiction Auth
router.post('/get-all-notification', authMiddleware, getAllNotificationController)
module.exports = router

// doctornotifiction Auth
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)
module.exports = router