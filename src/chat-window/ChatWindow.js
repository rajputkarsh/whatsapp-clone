import { AttachFile, InsertEmoticon, MicOutlined } from '@mui/icons-material';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import { Avatar, IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useState, useEffect} from 'react'

import './ChatWindow.css'
import { useParams } from 'react-router-dom';
import { dblClick } from '@testing-library/user-event/dist/click';
import database from '../db/backend';


function ChatWindow() {

    const {roomId} = useParams();

    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [avatarSeed, setAvatarSeed] = useState("");

    const handleUserMessage = (message) => {
        setUserMessage(message);
    }
    
    const sendMessage = (e) => {
        e.preventDefault();

        handleUserMessage("");
    }

    useEffect(() => {
        if(roomId){
            database.collection('rooms').doc(roomId)
            .onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            });

            database.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(
                snapshot => {
                    setMessages(snapshot.docs.map(doc => doc.data()))
                }
            )
        }
    }, [roomId]);

    useEffect(() => {
        setAvatarSeed(Math.floor(Math.random() * 1234));
    }, []);


    return (
        <div className='chat-window'>
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} />
                <div className="chat-header-info">
                    <h3>{roomName} </h3>
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

                {
                    messages.map((message, i)  => (
                            <p className="chat-message" key={i}>
                                <span className="chat-name">
                                    {message.name}
                                </span>
                                {message.message}
                                <span className="chat-timestamp">
                                    {new String(message.timestamp)}
                                </span>
                            </p>                            
                        )
                    )
                }

                <p className="chat-message">
                    <span className="chat-name">
                        Karsh
                    </span>
                    hey peeps
                    <span className="chat-timestamp">
                        3:54pm
                    </span>
                </p>

                <p className="chat-message message-sender">
                    <span className="chat-name">
                        Karsh
                    </span>
                    hey peeps
                    <span className="chat-timestamp">
                        3:54pm
                    </span>
                </p>


            </div>
            <div className="chat-footer">
                <InsertEmoticon />
                <form>
                    <input type="text" value={userMessage} onChange={e => {handleUserMessage(e.target.value)}} placeholder="Type a message" />
                    <button type="submit" onClick={(e) => {sendMessage(e)} }>Send</button>
                </form>
                <MicOutlined />
            </div>
        </div>
    )
}

export default ChatWindow
