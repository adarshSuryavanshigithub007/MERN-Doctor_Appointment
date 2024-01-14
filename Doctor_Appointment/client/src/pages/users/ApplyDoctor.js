import React from 'react'
import Layout from '../../layout/Layout'
import { Button, Col, Form, Input, Row, TimePicker, message } from 'antd'
import { applyDoctor } from '../../service/apis'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/feature/alertSlice'

const ApplyDoctor = () => {
    const { user } = useSelector(state => state.user || {})
    console.log(user)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const handleFinish = async (values) => {
        console.log(values);
        try {
            dispatch(showLoading())
            const res = await applyDoctor({ data: values, userid: user._id, token });
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message)
            }else{
                message.error(res.data.message)
            }
            console.log(res);
        } catch (error) {
            dispatch(hideLoading())
            console.log(error);
            message.error(error.message)
        }
    }
    
    return (
        <Layout>

            <div style={{ padding: '0px 20px', marginTop: '30px' }}>
                <Form name="basic" layout="vertical" onFinish={handleFinish}>
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
                        <button className='btn btn-primary form-btn' type='submit'>SUBMIT</button>
                    </Col>

                </Form>

            </div>
        </Layout>
    )
}

export default ApplyDoctor