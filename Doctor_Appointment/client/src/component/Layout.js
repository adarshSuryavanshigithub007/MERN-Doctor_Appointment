import React, { useState } from 'react'
import { doctor } from '../images/Images'
import { Avatar, Button } from 'antd'
import { SidebarMenu } from './data'
import { Link, useLocation } from 'react-router-dom'
const Layout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation()
    return (
        <div className={`main ${collapsed ? 'collapsed' : ''}`}>
            <div className='layout'>
                <div className='sidebar'>
                    <Button
                        type="text"
                        icon={collapsed ? <i class="fa-solid fa-bars"></i> : <i class="fa-solid fa-bars"></i>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            color: '#fff',
                            fontSize: '26px',
                            width: 30,
                            height: 30,
                        }}
                    />

                    <div className='menu'>
                        {SidebarMenu.map(menu => {
                            const isActive = location.pathname === menu.path
                            return (
                                <>
                                    <div className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link Link={menu.path}>{menu.name}</Link>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                    <div className='logo'>
                                <Avatar size={55} src={doctor} />
                            </div>
                    </div>
                    <div className='body'>
                        <div className='body'>{children}</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Layout
