
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { getUserData } from '../utils/service/apis'
import { setUser } from '../redux/feature/userSlice'
import { useEffect } from 'react'

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