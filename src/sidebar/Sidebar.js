import { Avatar, IconButton } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react'
import './Sidebar.css'

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <Avatar />
                <div className="sidebar-header-right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar-search">
                <SearchOutlinedIcon />
                <input type="text" placeholder="Search or start a new chat"/>
            </div>
            
            <div className="sidebar-chats"></div>
        </div>
    )
}
export default Sidebar
