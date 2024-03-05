import { message } from "antd"
import axios from "axios"
import { ADMIN_URL, USER_URL } from "../API_URLS"

export const getRegister = async (data) => {
    try {
        const response = await axios.post(`${USER_URL}/register`, data)
        return response
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getLogin = async (data) => {
    try {
        const response = await axios.post(`${USER_URL}/login`, data)
        return response
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getUserData = async (token) => {
    try {
        const response = await axios.post(`${USER_URL}/getUserData`, {}, {
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
        const response = await axios.post(`${USER_URL}/apply-doctor`, { ...data, userid }, {
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

export const getApplyDoctorNotification = async ({ userId, token }) => {
    try {
        const response = await axios.post(`${USER_URL}/get-all-notification`, userId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        message.error(`something went wrong`)
    }
}

export const deleteApplyDoctorNotification = async ({ userId, token }) => {
    console.log(userId)
    try {
        const response = await axios.post(`${USER_URL}/delete-all-notification`, userId, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        message.error(`something went wrong`)
    }
}

export const getAllUser = async (token) => {
    try {
        const response = await axios.get(`${ADMIN_URL}/getAllUsers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        return response;

    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getAllDoctors = async (token) => {
    try {
        const response = await axios.get(`${ADMIN_URL}/getAllDoctors`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}

export const getStatusChange = async  ( {record,token,status}) => {
    console.log(record)
    try {
        const response = await axios.post(`${ADMIN_URL}/changeAccountStatus`,{ doctorId:record._id, userId:record.userId, status:status},{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        return response;
    } catch (error) {
        console.log(message.error)
        message.error(`something went wrong`)
    }
}
