import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';
import database from '../db/backend';

import './Sidebar.css'
import { useStateValue } from '../data-layer/StateProvider';

function Sidebar() {

    const [chatRooms, setChatRooms] = useState([]);
    const [userSearch, setUserSearch] = useState("");
    const [{ user }, dispatch] = useStateValue();


    useEffect(()=>{
        const unsubscribe = database.collection('rooms').orderBy("createdOn", "desc").onSnapshot((snapshot) => {
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

    const handleUserSearch = (value) => {
        setUserSearch(value);
    }

    const isKeywordInName = (keyword, name) => {
        if(keyword.length > 0){
            return name.toLowerCase().includes(keyword.toLowerCase());
        }
        return true;
    }

    return (
        <div className='sidebar'>
            <div className="sidebar-header">
                <Avatar src={user?.photoURL} />
                <h3>Welcome, {user?.displayName}</h3>
            </div>

            <div className="sidebar-search">
                <div className="sidebar-search-container">
                    <SearchOutlinedIcon />
                    <input type="text" value={userSearch} onChange={e => {handleUserSearch(e.target.value)}} placeholder="Search or start a new chat" />
                </div>
                
            </div>
            
            <div className="sidebar-chat-container">
                <SidebarChat addNewChat/>
                
                {
                    chatRooms.map(room => (
                        isKeywordInName(userSearch, room.data.name) ? <SidebarChat key={room.id} id={room.id} name={room.data.name} /> : ""
                    ))
                }

            </div>
        </div>
    )
}
export default Sidebar
