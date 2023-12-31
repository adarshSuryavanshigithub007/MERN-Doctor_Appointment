import React from 'react'
import { Form, Input, message } from 'antd';
import '../style/RegisterStyles.css'
import { Link, useNavigate } from 'react-router-dom'
import { getLogin } from '../service/apis';
import {useDispatch} from 'react-redux'
import { showLoading,hideLoading } from '../redux/feature/alertSlice';
const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onFinishHandler = async (values) => {
        console.log(values)
        try {
            dispatch(showLoading())
            const res = await getLogin(values)
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
            dispatch(hideLoading())
            console.log(error)
            message.error(`something went wrong ${error.message}`)
        }
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