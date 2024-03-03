import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { getAllDoctors, getStatusChange } from '../../utils/service/apis'
import { Table, Tag, message } from 'antd'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  console.log(doctors)
  const token = localStorage.getItem('token')

  const handleChangeStatus = async(record,status) => {
    console.log(record)
    const resp = await getStatusChange({record, status,token})
    if (resp.data.success) {
     message.success(resp.data.message )
    }
    console.log(resp)
  }

  const getDoctors = async () => {
    try {
      const response = await getAllDoctors(token)
      console.log(response) 
      if (response.data.success) {
        setDoctors(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getDoctors()
  }, [])
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName"
    },
    {
      title: "Last Name",
      dataIndex: "lastName"
    },
    {
      title: "Specialization",
      dataIndex: "specialization"
    },
    {
      title: "Experience",
      dataIndex: "experience"
    },
    {
      title: "FeesPerCunsalation",
      dataIndex: "feesPerCunsalation"
    },
    {
      title: "Timings",
      dataIndex: "timings"
    },  
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        let color = record.status === "pending" ? 'volcano' : (record.status === "approved" ? 'green' : null);
        return (
          <Tag color={color} key={record.status}>
            {record.status === "pending" ? "pending" : "approved"}
          </Tag>
        );
      }
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className='d-flex'>
        {record.status === "pending" ? <button className='btn btn-success' onClick={()=>handleChangeStatus(record,"approved")}>Approve</button> :<button className='btn btn-danger'>unApprove</button>}  
        </div>
      )
    }
  ]
  return (
    <Layout>
      <Table columns={columns} dataSource={doctors} size="small" />
    </Layout>
  )
}

export default Doctors