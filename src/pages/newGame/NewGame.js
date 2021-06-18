import React, { useState } from 'react'
import TextField from "@material-ui/core/TextField"
import "./NewGame.css"
import { motion } from "framer-motion"
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import AddPlayers from '../../components/buttons/AddPlayers'
import {useHistory} from "react-router-dom"

const NewGame = () => {

    const [user, loading] = useAuthState(auth)
    let history = useHistory()

    const [gameName, setGameName] = useState("")
    const [gameDificulty, setGameDificulty] = useState("");
    const [gamePlayerCount, setGamePlayerCount] = useState("");

    const saveGame = (e) => {
        e.preventDefault();

        if(gameName !== "" && gameDificulty !== "" && gamePlayerCount !== ""){
            db.collection("games").add({
                user: user.email,
                gameName,
                gameDificulty,
                gamePlayerCount
            })
            history.push("./newgame/addplayers")

        }else {
            return alert("No empty fields")
        }
      
    }

    console.log(gameName, gameDificulty, gamePlayerCount)

    return (
        <motion.div
            className="newGame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className="newGame__form">
                <form>
                    <div className="newGame__textInput">
                        <TextField
                            style={{ width: "100%" }}
                            id="standard-basic"
                            value={gameName}
                            label="Game Name"
                            onChange={(e) => (setGameName(e.target.value))}
                        />
                    </div>

                    <div className="newGame__numberInput">
                        <TextField
                            style={{ width: "30%" }}
                            id="standard-basic"
                            type="number"
                            value={gameDificulty}
                            label="Par Value"
                            onChange={(e) => (setGameDificulty(e.target.value))}


                        />
                        <TextField
                            style={{ width: "60%" }}
                            id="standard-basic"
                            type="number"
                            value={gamePlayerCount}
                            label="Number of Players"
                            onChange={(e) => (setGamePlayerCount(e.target.value))}

                        />
                    </div>
                    <div className="newGame__saveGame" onClick= {saveGame}>
                        <AddPlayers />
                    </div>

                </form>
            </div>
        </motion.div>
    )
}

export default NewGame;
