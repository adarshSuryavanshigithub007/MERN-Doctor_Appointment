import React from 'react'
import { Form, Input, message } from 'antd';
import '../style/RegisterStyles.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getRegister } from '../service/apis';
const Register = () => {
  const onFinishHandler = async (values) => {
    console.log(values)
    try {
      const res = await getRegister(values)
      console.log(res)
      if (res.data.success) {
        message.success(res.data.message)
    }else{
        message.error(res.data.message)
    }

    } catch (error) {
      console.log(error)
      message.error(`something went wrong ${error.message}`)
    }
  }
  return (
    <div className='form-container'>
      <Form name="basic" layout='vertical' onFinish={onFinishHandler} className='register-form card'>
        <h1>Register Form</h1>
        <Form.Item label="name" name="name" rules={[{ required: true, message: 'Please input your name!', },]}>
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="email" name="email" rules={[{ required: true, message: 'Please input your name!', },]}>
          <Input type='email' required />
        </Form.Item>
        <Form.Item label="password" name="password" rules={[{ required: true, message: 'Please input your password!', },]}>
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

export default Register