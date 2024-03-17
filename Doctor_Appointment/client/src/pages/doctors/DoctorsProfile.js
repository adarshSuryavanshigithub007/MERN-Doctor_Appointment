import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { getDoctorInfo, getDoctorProfile, getUpdateProfile } from '../../utils/service/apis'
import { useNavigate, useParams } from 'react-router-dom'
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/feature/alertSlice'
import moment from 'moment'

const DoctorsProfile = () => {
    const [doctorProfile, setDoctorProfile] = useState(null)
    const { user } = useSelector(state => state.user || {})
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    // const formattedTimings = doctorProfile.timings?.map(time => moment(time, 'HH:mm').format('HH:mm'));
    // console.log(formattedTimings)
    const getDoctorsInfo = async () => {
        try {
            const res = await getDoctorInfo({ userId: params.id, token });
            console.log(res.data);
            if (res.data.success) {
                setDoctorProfile(res.data.data)
            }
        } catch (error) {
            console.log(error);
            message.error(`Something went wrong`);
        }
    }
    const handleFinish = async (values) => {
        console.log(values);
        try {
            dispatch(showLoading());
            const res = await getUpdateProfile({
                data: values,
                userId: user._id,
                token,
                timings:values.timings
            });
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate('/');
            } else {
                message.error(res.data.message);
            }
            console.log(res);
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error(error.message);
        }
    }

    useEffect(() => {
        getDoctorsInfo()
    }, [])
    return (
        <Layout>
            <div style={{ padding: '0px 20px', marginTop: '30px' }}>
                {doctorProfile && (
                    <Form
                        name="basic"
                        layout="vertical"
                        onFinish={handleFinish}
                        initialValues={{
                            ...doctorProfile,
                            timings: doctorProfile.timings?.map(time => moment(time, 'HH:mm'))
                        }}
                        
                    >

                        <h3 className='text-left'>Personal Details:</h3>
                        <Row gutter={30}>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='firstName' name='firstName' required rules={[{ required: true, message: 'Please Enter Your First Name!', }]}>
                                    <Input type='text' placeholder='Enter Your Name' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='lastName' name='lastName' required rules={[{ required: true, message: 'Please Enter Your Last Name!', }]}>
                                    <Input type='text' placeholder='Enter Your Last Name' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='phone' name='phone' required rules={[{ required: true, message: 'Please Enter Your Phone Number!', }]}>
                                    <Input type='Number' placeholder='Enter Your Phone Number' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="email" name="email" rules={[{ required: true, message: 'Please input your Email!', },]}>
                                    <Input type='email' placeholder='Enter Your Email' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="website" name="website" >
                                    <Input type='text' placeholder='Enter Your Website' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="address" name="address" rules={[{ required: true, message: 'Please input your Address!', },]} >
                                    <Input type='text' placeholder='Enter Your Address' required />
                                </Form.Item>
                            </Col>
                        </Row>
                        <h3 className='text-left'>professional Details:</h3>
                        <Row gutter={30}>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='specialization' name='specialization' required rules={[{ required: true, message: 'Please Enter Your Specialization!', }]}>
                                    <Input type='text' placeholder='Enter Your Specialization' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='experience' name='experience' required rules={[{ required: true, message: 'Please Enter Your Experience!', }]}>
                                    <Input type='text' placeholder='Enter Your Experience' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label='feesPerCunsalation' name='feesPerCunsalation' required rules={[{ required: true, message: 'Please Enter Your FeesPerCunsalation!', }]}>
                                    <Input type='text' placeholder='Enter Your FeesPerCunsalation' required />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={8}>
                                <Form.Item label="Timings" name="timings" rules={[{ required: true, message: 'Please input your Timing!', },]}>
                                    <TimePicker.RangePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Col xs={24} md={24} lg={8}>
                            <button className='btn btn-primary form-btn' type='submit'>Update</button>
                        </Col>
                    </Form>
                )}
            </div>
        </Layout>
    )
}

export default DoctorsProfile