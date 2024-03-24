import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorsList = ({ doctors }) => {
    console.log(doctors)
    const navigate = useNavigate()
    return (
            <div className='card' style={{ margin: 10, cursor:'pointer'}} onClick={()=>navigate(`/doctor-appointment/${doctors._id}`)}>
                <div className='card-header'>
                    {`  Dr.${doctors.firstName} ${doctors.lastName}`}
                </div>
                <div className='card-body'>
                    <p>
                        <b>Specialization</b> : {doctors.specialization}
                    </p>
                    <p>
                        <b> Experience</b> : {doctors.experience}
                    </p>
                    <p>
                        <b> Fees</b> : {doctors.feesPerCunsalation}
                    </p>
                    <p>
                        <b> Timings</b> : {doctors.timings}
                    </p>
                </div>
            </div>
    )
}

export default DoctorsList