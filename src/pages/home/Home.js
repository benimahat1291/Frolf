import React, { useState, useEffect } from 'react'
import "./Home.css"
import NetImg from "../../images/net.png"
import StartButton from '../../components/buttons/StartButton'
import { useHistory } from "react-router-dom"
import { auth, db } from "../../firebase.js"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "firebase"

const Home = () => {
    const [discToss, setDiscToss] = useState(false);
    let history = useHistory();
    const [user, loading] = useAuthState(auth);

    const startGame = () => {
        if (discToss) {
            setDiscToss(false);
        } else (
            setDiscToss(true)
        )

        setTimeout(() => {
            history.push("/newgame")

        }, 800)
    }


    if(loading) {
        return <h1>...</h1>
    }


    return (
        <div className="home">
           <div className="buttonContainer" onClick={() => startGame()} >
                    <StartButton />
                </div>
            <div className="netContainer">
                <img className="net" src={NetImg} alt="img" />
            </div>
            <div className={discToss ? "frisbee frisbeeToss" : "frisbee"}>

            </div>

        </div>
    )
}

export default Home
