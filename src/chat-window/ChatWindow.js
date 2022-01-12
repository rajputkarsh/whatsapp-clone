import { AttachFile } from '@mui/icons-material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useState, useEffect} from 'react'

import './ChatWindow.css'


function ChatWindow() {


    const [avatarSeed, setAvatarSeed] = useState("");

    useEffect(() => {
        setAvatarSeed(Math.floor(Math.random() * 1234));
    }, []);

    return (
        <div className='chat-window'>
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} />
                <div className="chat-header-info">
                    <h3>Room Name</h3>
                    <p>Last seen at ......</p>
                </div>
                <div className="chat-header-rightside">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat-body">
                <p className="chat-message">
                    gey peeps
                </p>
            </div>
            <div className="chat-footer"></div>
        </div>
    )
}

export default ChatWindow
