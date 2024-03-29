import React, { useEffect, useState } from 'react'
import { doctor } from '../images/Images'
import { Avatar, Badge, Button, Dropdown, Menu, message } from 'antd'
import { adminMenu, userMenu } from './data'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Layout = ({ children }) => {
    const { user } = useSelector(state => state.user || {})
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    const [pageTitle, setPageTitle] = useState('Doctor-Appointment')
    console.log(user)

    useEffect(() => {
        // Update the page title whenever the location changes
        const pathname = location.pathname;
        const newTitle = getPageTitle(pathname);
        setPageTitle(newTitle);
    }, [location]);
    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'fa-solid fa-house'
        },
        {
            name: 'Appointments',
            path: '/appointment',
            icon: 'fa-solid fa-calendar-check'
        },
        {
            name: 'Profile',
            path: `/doctor/Profile/${user?._id}`,
            icon: 'fa-solid fa-user'
        },
    
    ]
    
    const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu 
    const handleLogout = () => {
        localStorage.clear()
        message.success('logout successful')
        navigate('/login')
    }

    function getPageTitle(pathname) {
        switch (pathname) {
            case '/':
                return
            case '/apply-doctor':
                return <h3 className='text-center'>Apply Doctor</h3>
            case '/notificationpage':
                return <h3 className='text-center'>Notification</h3>
            case '/admin/doctors':
                return <h3 className='text-center'>Doctors</h3>
            case '/admin/users':
                return <h3 className='text-center'>Users</h3>
            case `/doctor/Profile/${user?._id}`:
                return <h3 className='text-center'>{`Dr.Profile`}</h3>
            default:
                return;
        }
    }


    return (
        <div className={`main ${collapsed ? 'collapsed' : ''}`}>
            <div className='layout'>
                <div className='sidebar'>

                    <div className='menu'>
                        {SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                        <div className={`menu-item`} onClick={handleLogout}>
                            <i className='fa-solid fa-right-from-bracket'></i>
                            <Link to='/logout'>Logout</Link>
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        <h3 className='textcenter'>{pageTitle}</h3>
                        <div className='header-content'>
                            <Badge count={user && user?.notification.length} size="small" style={{ marginRight: '20px' }}>
                                <i className="fa-solid fa-bell" onClick={() => navigate('/notificationpage')} style={{ cursor: 'pointer' }}></i>
                            </Badge>
                            <Link to='/profile'>{user?.name}</Link>
                        </div>
                    </div>
                    <div className='body'>
                        <div className='body-content'>{children}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
