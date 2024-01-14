import { message } from "antd"
import axios from "axios"

const url = 'http://localhost:8080/api/v1/user'
export const getRegister = async (data) => {
    try {

        const response = await axios.post(`${url}/register`, data)
        return response
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getLogin = async (data) => {
    try {
        const response = await axios.post(`${url}/login`, data)
        return response
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getUserData = async (token) => {
    try {

        const response = await axios.post(`${url}/getUserData`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const applyDoctor = async ({ data, userid, token }) => {
    console.log(data, userid, token)
    try {
        const response = await axios.post(`${url}/apply-doctor`, { ...data, userid }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data);
        return response;
    } catch (error) {
        console.log(error)
        message.error(`something went wrong`)
    }
}


export const getApplyDoctorNotification = async({userId,token})=>{
    try {
        const response = await axios.post(`${url}/get-all-notification`,userId,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        message.error(`something went wrong`)
    }
}


export const deleteApplyDoctorNotification = async({userId,token})=>{
    console.log(userId)
    try {
        const response = await axios.post(`${url}/delete-all-notification`,userId,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        message.error(`something went wrong`)
    }
}
