const mongoose = require('mongoose')
const userModel = require("../model/userModel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const doctorModel = require("../model/doctorModel")
const bodyParser = require('body-parser')

const registerController = async (req, resp) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        if (exisitingUser) {
            return resp.status(200).send({ message: `user Already exist`, success: false })
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        resp.status(200).send({ message: `Register succesfull`, success: true })
    } catch (error) {
        console.log(error)
        resp.status(5000).send({ success: false, message: `Register Controller ${error.message}` })
    }
}
const loginController = async (req, resp) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        console.log(user)
        if (!user) {
            return resp.status(200).send({ message: `User Not Found`, success: false })
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            return resp.status(200).send({ message: `invalid Email and password `, success: false })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        resp.status(200).send({ message: `Login success`, success: true, token })
    } catch (error) {
        console.log(error)
        resp.status(5000).send({ success: false, message: `error while login ${error.message}` })
    }
}

const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId })
        user.password = undefined
        if (!user) {
            return res.status(200).send({
                message: 'user not found',
                success: false
            })
        } else {
            res.status(200).send({
                success: true,
                data: user
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: 'pending' })
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = await adminUser.notification
        notification.push({
            type: 'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
            success: true,
            message: 'Doctor Account Applied Successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: ' Error While Applying For Doctor',
            success: false,
            error
        })
    }
}

const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id:req.body.userId })
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(201).send({
            success: true,
            message: 'All message seen',
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: ' Error While notification',
            success: false,
            error
        })
    }
}


const deleteAllNotificationController = async (req,res) => {

    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.seennotification = []
        user.notification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(201).send({
            success: true,
            message: 'All message Deleted',
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: ' Error While notification',
            success: false,
            error
        })
    }
}
module.exports = {
    loginController,
    registerController,
    authController,
    applyDoctorController,
    getAllNotificationController,
    deleteAllNotificationController
}