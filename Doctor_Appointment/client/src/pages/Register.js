import React from 'react'
import { Form, Input, message } from 'antd';
import '../style/RegisterStyles.css'
import axio from 'axios'
import { Link } from 'react-router-dom'
const Register = () => {
  const onFinishHandler = async (values) => {
    console.log(values)
    try {

      const res = await axio.post('/api/v1/user/register',values)
      if(res.data.success){
        message.success(`Register successfully`)
      }
      console.log(res)

    } catch (error) {
      message.error(`something went wrong`)
    }
  }
  return (
    <div className='form-container'>
      <Form name="basic" layout='vertical' onFinish={onFinishHandler} className='register-form card'>
        <h1>Register Form</h1>
        <Form.Item label="Name" name="Name" rules={[{ required: true, message: 'Please input your name!', },]}>
          <Input type="text" required />
        </Form.Item>
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

export default Register