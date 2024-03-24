import React, { useEffect, useState } from 'react'
import { getAllDoctorsList, getUserData } from '../utils/service/apis'
import Layout from '../layout/Layout'
import { Row, message } from 'antd'
import DoctorsList from './users/DoctorsList'
const HomePage = () => {
    const [doctorsList,setDoctorsList] = useState([])
    console.log(doctorsList)
    const token = localStorage.getItem('token')
    const getAllDoctors = async()=>{
        try {
            const res = await getAllDoctorsList(token)
            console.log(res.data);
            if(res.data.success){
                setDoctorsList(res.data.data)
            }
        } catch (error) {
            message.error(error.message)
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllDoctors()
    },[])
    
return (
    <Layout> 
    <Row>
    {doctorsList && doctorsList.map((doctor)=>{return  <DoctorsList doctors={doctor}/>})}
    </Row>
    </Layout>
)
}

export default HomePage