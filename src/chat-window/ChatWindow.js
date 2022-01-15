import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, IconButton } from '@mui/material'
import React, {useState, useEffect} from 'react'
import InputEmoji from 'react-input-emoji'
import { useParams } from 'react-router-dom';
import database from '../db/backend';
import firebase from 'firebase';
import { useStateValue } from '../data-layer/StateProvider';

import './ChatWindow.css'

function ChatWindow() {

    const { roomId } = useParams();
    const [{ user }, dispatch] = useStateValue();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState("");
    const [avatarSeed, setAvatarSeed] = useState("");

    const handleUserMessage = (message) => {
        setUserMessage(message);
    }
    
    const sendMessage = (e) => {
        database.collection("rooms").doc(roomId).collection("messages").add({
            message  : userMessage,
            name     : user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            email   : user.email
        });
        handleUserMessage("");
    }

    const logout = () => {
        localStorage.clear();
        window.location.reload();
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
                {
                    roomId ? (
                        <>
                            <Avatar src={`https://avatars.dicebear.com/api/human/${avatarSeed}.svg`} />
                            <div className="chat-header-info">
                                <h3>{roomName} </h3>
                                <p>Last seen at {messages.length > 0 ? new String(messages[messages.length - 1].timestamp) : ""}</p>
                            </div>                        
                        </>                        
                    ) : 
                        (<div className="chat-header-info"></div>)
                }
                <div className="chat-header-rightside">
                    <IconButton onClick={() => { logout() }}>
                        <LogoutIcon />
                    </IconButton>
                </div>
            </div>

            {
                roomId ? (
                    <>
                        <div className="chat-body">

                            {
                                messages.map((message, i) => (
                                    <p className={"chat-message" + (message.email == user.email ? " message-sender" : "")} key={i}>
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

                        </div>
                        <div className="chat-footer">
                            <form>
                                <InputEmoji
                                    value={userMessage}
                                    onChange={handleUserMessage}
                                    onEnter={sendMessage}
                                    placeholder="Type a message"
                                />
                                {/* <input type="text" value={userMessage} onChange={e => {handleUserMessage(e.target.value)}} placeholder="Type a message" /> */}
                                <button type="submit" onClick={(e) => { sendMessage(e) }}>Send</button>
                            </form>
                        </div>                    
                    </>
                ) : (
                    <h1 className="select-chat-warning">Select a chat to continue</h1>
                )
            }

        </div>
    )
}

export default ChatWindow
