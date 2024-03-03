import React from 'react'
import Layout from '../../layout/Layout'
import { Avatar, Card, Tabs, message, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import Meta from 'antd/es/card/Meta'
import { deleteApplyDoctorNotification, getApplyDoctorNotification } from '../../utils/service/apis'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../../redux/feature/alertSlice'


const NotificationPage = () => {
    const { user } = useSelector(state => state.user || {})
    console.log(user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    // let getInitials = function (string) {
    //     // Remove leading and trailing spaces using trim()
    //     string = string.trim();
    //     console.log(string, string.split(' '))
    //     let names = string.split(' '),
    //         initials = names[0].substring(0, 1).toUpperCase();
    //     console.log(initials)
    //     if (names.length > 1) {
    //         initials += names[names.length - 1].substring(0, 1).toUpperCase();
    //     }
    //     return initials
    // };
    const handleMarkAllRead = () => {
        try {
            dispatch(showLoading())
            const res = getApplyDoctorNotification({ userId: user._id, token })
            dispatch(hideLoading())
            if (res.data.success) {
                navigate('/')
                localStorage.setItem("token", res.data.token)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDeleteAllRead = () => {
        try {
            dispatch(showLoading())
            const res = deleteApplyDoctorNotification({ userId: user._id, token })
            dispatch(hideLoading())
            console.log(res)
            if (res.data.success) {
                navigate('/')
                localStorage.setItem("token", res.data.token)
                message.success(res.data.message)
            } else {
                message.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <Tabs>
                <Tabs.TabPane tab='unRead' key={0}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleMarkAllRead}>Mark All Read</h4>
                    </div>
                    {
                        user?.notification.map(item => (
                            <Card style={{ width: 500, marginTop: 16 }}>
                            <Meta
                                title={item.message}
                                description={item.type}
                                onClick={() => navigate(item.onClickPath)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Card>
                        
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab='Read' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h4 className='p-2' onClick={handleDeleteAllRead}>Delete All Read</h4>
                    </div>
                    {
                        user?.seennotification.map(item => (
                            <Card style={{ width: 500, marginTop: 16 }}>
                            <Meta
                                title={item.message}
                                description={item.type}
                                onClick={() => navigate(item.onClickPath)}
                                style={{ cursor: 'pointer' }}
                            />
                        </Card>
                        ))
                    }
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default NotificationPage