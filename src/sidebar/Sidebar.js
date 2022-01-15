import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import database from '../db/backend';

import './Sidebar.css'
import { useStateValue } from '../data-layer/StateProvider';

function Sidebar() {

    const [chatRooms, setChatRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(()=>{
        const unsubscribe = database.collection('rooms').onSnapshot((snapshot) => {
            setChatRooms(snapshot.docs.map( doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )))
        });

        return () =>{
            unsubscribe();
        }
    }, []);

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
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
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start a new chat" />
                </div>
                
            </div>
            
            <div className="sidebar-chat-container">
                <SidebarChat addNewChat/>
                
                {
                    chatRooms.map(room => (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                    ))
                }

            </div>
        </div>
    )
}
export default Sidebar
