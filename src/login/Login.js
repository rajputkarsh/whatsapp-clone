import { Button } from '@mui/material'
import React from 'react'
import { actionTypes } from '../data-layer/reducer'
import { useStateValue } from '../data-layer/StateProvider'
import { authentifier, provider } from '../db/backend'
import { GoogleAuthProvider } from "firebase/auth";

import './Login.css'

function Login() {

    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        authentifier.signInWithPopup(provider).then(result => {
            
            localStorage.setItem("user-token", JSON.stringify(
                result.credential
            ));

            localStorage.setItem("user", JSON.stringify(
                result.user
            ));

            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
        })
        .catch(err => {
            console.log(err);
            alert("Error occured while signing in");
        });
    }

    return (
        <div className = 'login'>
            <div className="login-container">
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt="Login Image"/>
                <div className="login-text">
                    <h1>Login to Whatsapp</h1>
                </div>
                <Button type="submit" className="login-button" onClick={signIn} >Sign In with Google</Button>
            </div>
        </div>
    )
}

export default Login
