import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/feature/alertSlice'
import axios from 'axios'
import { getUserData } from '../service/apis'
import { setUser } from '../redux/feature/userSlice'

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.user)
    console.log(user)
    const token = localStorage.getItem('token')
    const getUser = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await getUserData(token)
            console.log(response)
            if (response.success) {
                dispatch(setUser(response.data))
            } else {
                navigate('/login')
                // <Navigate to="/login" />
                localStorage.clear()
            }
        } catch (error) {
            console.log(error)
            localStorage.clear()
        }
    }
    useEffect(() => {
        if (!user) {
            getUser()
        }
    }, [user])

    if (token) {
        return children
    } else {
        // <Navigate to="/login" />
        navigate('/login')
    }

}