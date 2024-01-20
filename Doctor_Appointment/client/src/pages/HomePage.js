import React, { useEffect } from 'react'
import { getUserData } from '../utils/service/apis'
import Layout from '../layout/Layout'
const HomePage = () => {
    
    const token = localStorage.getItem('token')
    useEffect(()=>{
        getUserData(token)
    },[])
return (
    <Layout>HomePage </Layout>
)
}

export default HomePage