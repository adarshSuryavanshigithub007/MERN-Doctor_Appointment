import React from 'react'
import {doctor } from '../images/Images'
import { Avatar } from 'antd'

const Layout = ({children}) => {
    return (
        <div className='main'>
            <div className='layout'>
                <div className='sidebar'>
                    <div className='logo'>
                    <Avatar size={64} src={doctor} />
                    </div>
                    <div className='menu'>Menu</div>
                </div>
                <div className='content'>
                    <div className='header'>
                    <div className='header'>Header</div>
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
