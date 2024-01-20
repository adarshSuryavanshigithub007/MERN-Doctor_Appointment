
const doctorModel = require("../model/doctorModel");
const userModel = require("../model/userModel");

const getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            message: 'user data',
            success: true,
            data: users,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: ' Error While users',
            success: false,
            error
        })
    }

}


const getAllDoctorController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            message: 'user data',
            success: true,
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: ' Error While doctors ',
            success: false,
            error
        })
    }
}

module.exports = { getAllUsersController, getAllDoctorController }