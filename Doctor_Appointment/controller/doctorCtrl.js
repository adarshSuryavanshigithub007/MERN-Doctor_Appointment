const doctorModel = require("../model/doctorModel")

const getDoctorInfoController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            // message:"Doctor Profile",
            data: doctor
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

const getUpdatedProfileController = async(req,res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({userId:req.body.userId},req.body,{new:true})
        res.status(200).send({
            success:true,
            message:'Updated successfully',
            data:doctor
        }) 
    } catch (error) {
        res.status(500).send({
            message: 'Error While doctors ',
            success: false,
            error
        })
    }
}
module.exports = { getDoctorInfoController, getUpdatedProfileController }