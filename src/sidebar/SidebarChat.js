import { Avatar } from '@mui/material'
import React, {useState, useEffect} from 'react'
import database from '../db/backend';

import './SidebarChat.css'

function SidebarChat({ id, name, addNewChat }) {

    const [avatarSeed, setAvatarSeed] = useState("");

    useEffect(() => {
        setAvatarSeed(Math.floor(Math.random()*1234));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter a room name");

        if(roomName){
            //add room
            database.collection('rooms').add({
                name: roomName,
                createdOn: new Date(),
                status: true,
            })
        }
        else{
            
        }

    }

    return !addNewChat ? (
        <div className="sidebar-chat" onClick={() => { window.location = `/rooms/${id}`}}>
            <Avatar src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} />
            <div className="chat-info">
                <h2>{name}</h2>
                <p>Last message here....</p>
            </div>
        </div>
    )
    : (
            <div className="sidebar-chat" onClick={(e) => { createChat()}}>
            <h2>Add new chat</h2>
        </div>
    )
}

export default SidebarChat
