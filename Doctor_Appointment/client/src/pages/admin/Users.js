import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { getAllUser } from '../../utils/service/apis'
import { Table, Tag } from 'antd'

const Users = () => {
    const [users, setUsers] = useState([])
    const token = localStorage.getItem('token')
    const getUser = async () => {
        try {
            const response = await getAllUser(token)
            console.log(response)
            if (response.data.success) {
                setUsers(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const columns = [
        {
            title: "Name",
            dataIndex: "name"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "Is Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => {
                let color = record.isDoctor === true ? 'green' : (record.isDoctor === false ? 'volcano' : null);
                return (
                    <Tag color={color} key={record.isDoctor}>
                        {record.isDoctor === true ? "YES" : "NO"}
                    </Tag>
                );
            }
        },

        {
            title: "Action",
            dataIndex: "action",
            render: (text, render) => (
                <div className='d-flex'>
                    <button className='btn btn-danger'>Block</button>
                </div>
            )
        }
    ]

    return (
        <Layout>
            <Table columns={columns} dataSource={users} size="small" />
        </Layout>
    )
}

export default Users 