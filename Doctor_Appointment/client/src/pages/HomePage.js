import React, { useEffect } from 'react'
import { getUserData } from '../service/apis'
const HomePage = () => {
    const token = localStorage.getItem('token')
    useEffect(()=>{
        getUserData(token)
    },[])
return (
    <div>HomePage</div>
)
}

export default HomePage