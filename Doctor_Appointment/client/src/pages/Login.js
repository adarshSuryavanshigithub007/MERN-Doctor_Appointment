import React from 'react'
import { Form, Input } from 'antd';
import '../style/RegisterStyles.css'
import { Link } from 'react-router-dom'
const Login = () => {
    const onFinishHandler = (values) => {
        console.log(values)
    }
    return (
        <div className='form-container'>
            <Form name="basic" layout='vertical' onFinish={onFinishHandler} className='register-form card'>
                <h1>Login Form</h1>
                <Form.Item label="email" name="email" rules={[{ required: true, message: 'Please input your name!', },]}>
                    <Input type='email' required />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
                    <Input type="password" required />
                </Form.Item>
                <Link to='/login'>Already user Login here</Link>
                <button className='btn btn-primary' type='submit'>
                    Submit
                </button>
            </Form>
        </div>
    )
}

export default Login