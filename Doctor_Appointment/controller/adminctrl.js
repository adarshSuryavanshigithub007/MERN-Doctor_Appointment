
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
            message: 'Error While users',
            success: false,
            error
        })
    }

}


const getAllDoctorController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({})
        res.status(200).send({
            message: 'Doctors data',
            success: true,
            data: doctors,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error While doctors ',
            success: false,
            error
        })
    }
}

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body
        const docotor = await doctorModel.findByIdAndUpdate(doctorId, (status))
        console.log(docotor)

        const user = await userModel.findOne({ _id: docotor.userId })
        console.log(docotor)
        const notification = user.notification

        notification.push({
            type: 'docotor-account-request-updated',
            message: `Your Request Accepted ${status}`,
        })
        user.isDoctor === 'approved' ? true : false
        await user.save()
        res.status(200).send({
            message: 'Docotor Approve Successfully',
            success: true,
            data: docotor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error While doctors ',
            success: false,
            error
        })
    }

}

module.exports = { getAllUsersController, getAllDoctorController, changeAccountStatusController }