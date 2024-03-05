
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
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true }) // Corrected the update parameter
        console.log(doctor)

        if (!doctor) {
            return res.status(404).send({
                message: 'Doctor not found',
                success: false
            });
        }
        const user = await userModel.findOne({ _id: doctor.userId })
        console.log(user)
        if (!user) {
            return res.status(404).send({
                message: 'User not found',
                success: false
            });
        }
        const notification = user.notification
        notification.push({
            type: 'doctor-account-request-updated', // Corrected spelling
            message: `Your Request Accepted ${status}`,
        })

        user.isDoctor = status === 'approved' // Updated isDoctor based on status
        await user.save()

        res.status(200).send({
            message: 'Doctor Approved Successfully',
            success: true,
            data: doctor // Return the updated doctor document
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'Error While updating doctor status',
            success: false,
            error: error.message // Return error message for debugging
        })
    }
}


module.exports = { getAllUsersController, getAllDoctorController, changeAccountStatusController }