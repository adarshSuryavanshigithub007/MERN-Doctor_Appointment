const express = require('express')
const { loginController, registerController, authController } = require('../controller/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

// router object
const router = express.Router()

//routes

//login ,post
router.post('/login',loginController)

//register, post 
router.post('/register',registerController)

// Auth
router.post('/getUserData',authMiddleware,authController)

module.exports = router