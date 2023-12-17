import { message } from "antd"
import axios from "axios"

const url = 'http://localhost:8080/api/v1/user'
export const getRegister = async (data) => {
    try {

        const res = await axios.post(`${url}/register`, data)
        return res
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getLogin = async (data) => {
    try {
        const res = await axios.post(`${url}/login`, data)
        return res
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getUserData = async (token) => {
    try {
        
        const response = await axios.post(`${url}/getUserData`, {}, {
            headers: {
                Authorization: "Bearer " + token
            }
        })
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}