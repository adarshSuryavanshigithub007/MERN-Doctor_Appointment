const mongoose = require('mongoose')

const userModel = require("../model/userModel")

const bcrypt = require('bcrypt')

const registerController = async (req, resp) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        if (exisitingUser) {
            return resp.status(200).send({ message: `user Already exist`, success: false })
        }

        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body) 
        await newUser.save()
        res.status(200).send({message:`Register succesfull`,success:true})

    } catch (error) {
        console.log(error)
        resp.status(5000).send({ success: false, message: `Register Controller ${error.message}` })
    }
}
const loginController = () => { }

module.exports = { loginController, registerController }