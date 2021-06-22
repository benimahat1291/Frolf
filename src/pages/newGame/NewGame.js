import React, { useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField"
import "./NewGame.css"
import { motion } from "framer-motion"
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import AddPlayers from '../../components/buttons/AddPlayers'
import { useHistory } from "react-router-dom"
import firebase from "firebase"

const NewGame = () => {

    let history = useHistory()
    const [user, loading] = useAuthState(auth)
    const [playersDisplay, setPlayersDisplay] = useState(false)
    const [gameForm, setGameForm] = useState({
        name: "",
        par: "",
        rounds: "",
        playerCount: "",
        players: {}
    })

    const [playersForm, setPlayersForm] = useState({
    })

    const playerElements = [];

    useEffect(() => {
        
    }, [gameForm])


    const handleInputChange = (e) => {
        e.preventDefault();
        setGameForm({...gameForm, [e.target.name]: e.target.value})
    }

    const handlePlayersInputChange = (e) => {
        e.preventDefault();
        const count = parseInt(gameForm.rounds)
        console.log("count", count)
        let rounds = []
        for(let i = 1; i < count+1; i++){
            rounds.push({round: i, score: 0})
        }
        setPlayersForm({...playersForm, [e.target.name]: {name: e.target.value, scores: rounds}})
    }
    console.log(gameForm)
    console.log(playersForm)

    const toggleDispaly = () => {
        if(playersDisplay === false){
            setPlayersDisplay(true)
            setPlayersForm({})
        } else {
            setPlayersDisplay(false)
        }
    }

    const saveGame = (e) => {
        // e.preventDefault();

        // if (gameName !== "" && gameDificulty !== "" && gamePlayerCount !== "" && gameRounds !== "") {
        //     db.collection("games").add({
        //         user: user.email,
        //         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //         gameName,
        //         gameDificulty,
        //         gameRounds,
        //         gamePlayerCount
        //     })
        //     history.push("./newgame/addplayers")

        // } else {
        //     return alert("No empty fields")
        // }

    }

    if(gameForm.playerCount !== "" && gameForm.rounds !== "") {
        const count = parseInt(gameForm.playerCount)
        let playerIndexArr = []
        for (let i = 1; i < count + 1; i++) {
            playerIndexArr.push(i)
        }
        console.log("indexARr", playerIndexArr)

        for (const [index, val] of playerIndexArr.entries()) {
            playerElements.push(
                <TextField
                style={{ width: "100%" }}
                id={`player${val}`}
                value={playersForm[`p${val}.name`]}
                name={`p${val}`}
                label={`player ${val}`}
                onChange={handlePlayersInputChange}
            />
            )
        }  

     
    }

    console.log("playerEle", playerElements)






    // console.log(gameName, gameDificulty, gamePlayerCount, gameRounds, playerLables)

    return (
        <motion.div
            className="newGame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
               
            <div className="newGame__form">
            {!playersDisplay ?
    (             <form>
                 <div className="newGame__textInput">
                     <TextField
                         style={{ width: "100%" }}
                         id="name"
                         name="name"
                         value={gameForm.name}
                         label="Game Name"
                         onChange={handleInputChange}
                     />
                 </div>
                 <div className="newGame__numberInput">
                     <TextField
                         style={{ width: "30%" }}
                         id="par"
                         type="number"
                         name="par"
                         value={gameForm.par}
                         label="Par Value"
                         
                         onChange={handleInputChange}
                     />
                     <TextField
                         style={{ width: "30%" }}
                         id="rounds"
                         type="number"
                         name="rounds"
                         value={gameForm.rounds}
                         label="Rounds"
                         onChange={handleInputChange}
                         
                     />

                     <TextField
                         style={{ width: "30%" }}
                         id="count"
                         type="number"
                         name="playerCount"
                         value={gameForm.playerCount}
                         label="Players"
                         onChange={handleInputChange}
                     />
                 </div>
                 <div className="newGame__saveGame" onClick={(e) => {
                     e.preventDefault()
                     toggleDispaly()
                     }}>
                     <AddPlayers />
                 </div>

             </form>) : (
                 <form>
                     {playerElements}
                     <button onClick={toggleDispaly}> back</button>
                 </form>
             )
            }

               
            </div>
        </motion.div>
    )
}

export default NewGame;
