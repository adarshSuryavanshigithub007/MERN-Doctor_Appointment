import React from 'react'
import Layout from '../../component/Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'

const ApplyDoctor = () => {
    const handleFinish = (value) => {
        console.log(value)
    }
    return (
        <Layout>

            <div style={{ padding: '0px 20px', marginTop: '30px' }}>
                <Form name="basic" layout="vertical" onFinish={handleFinish}>
                    <h3 className='text-left'>Personal Details:</h3>
                    <Row gutter={30}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='First Name' name='firstName' required rules={[{ required: true, message: 'Please Enter Your First Name!', }]}>
                                <Input type='text' placeholder='Enter Your Name' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Last Name' name='LastName' required rules={[{ required: true, message: 'Please Enter Your Last Name!', }]}>
                                <Input type='text' placeholder='Enter Your Last Name' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Phone Number' name='PhoneNumber' required rules={[{ required: true, message: 'Please Enter Your Phone Number!', }]}>
                                <Input type='Number' placeholder='Enter Your Phone Number' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your Email!', },]}>
                                <Input type='email' placeholder='Enter Your Email' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="WebSite" name="website" >
                                <Input type='text' placeholder='Enter Your Website' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your Address!', },]} >
                                <Input type='text' placeholder='Enter Your Address' required />
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3 className='text-left'>professional Details:</h3>
                    <Row gutter={30}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Specialization' name='specialization' required rules={[{ required: true, message: 'Please Enter Your Specialization!', }]}>
                                <Input type='text' placeholder='Enter Your Specialization' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='Experience' name='experience' required rules={[{ required: true, message: 'Please Enter Your Experience!', }]}>
                                <Input type='text' placeholder='Enter Your Experience' required />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label='FeesPerCunsalation' name='feesPerCunsalation' required rules={[{ required: true, message: 'Please Enter Your FeesPerCunsalation!', }]}>
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