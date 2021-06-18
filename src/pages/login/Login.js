import React from 'react'
import "./Login.css"
import LoginButton from '../../components/buttons/LoginButton'
import { auth, provider } from '../../firebase'


const Login = () => {

    
    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <div className="loginPage">
            <div className="loginCard">
                <h1 className="loginCard__title">Frolf</h1>
                <h2 className="loginCard__desc">Easy Frisbee Golf Score keeper</h2>
                <div onClick={()=> signIn()}>
                    <LoginButton />
                </div>
            </div>

        </div>
    )
}

export default Login
