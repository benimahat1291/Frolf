import React, { useEffect, useState } from 'react'
import TextField from "@material-ui/core/TextField"
import "./NewGame.css"
import { motion } from "framer-motion"
import { auth, db } from '../../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import uuid from 'react-uuid'
import { useHistory } from "react-router-dom"
import firebase from "firebase"

const NewGame = () => {

    let history = useHistory()
    const [user] = useAuthState(auth)
    const [playersDisplay, setPlayersDisplay] = useState(false)
    const [gameForm, setGameForm] = useState({
        name: "",
        par: "",
        rounds: "",
        playerCount: "",
    })

    const gameId = uuid()

    const [playersForm, setPlayersForm] = useState({})

    const playerElements = [];

    useEffect(() => {

    }, [gameForm])


    const handleInputChange = (e) => {
        e.preventDefault();
        setGameForm({ ...gameForm, [e.target.name]: e.target.value })
    }

    const handlePlayersInputChange = (e) => {
        e.preventDefault();
        const count = parseInt(gameForm.rounds)
        let rounds = []
        for (let i = 1; i < count + 1; i++) {
            rounds.push({ round: i, score: 0 })
        }

        setPlayersForm({ ...playersForm, [e.target.name]: { name: e.target.value, scores: rounds } })


        // setPlayersForm({...playersForm, [e.target.name]:{name:e.target.value, rounds}})
        console.log("pform", playersForm)
    }


    const toggleDispaly = () => {
        if (playersDisplay === false
            && gameForm.name !== ""
            && gameForm.par !== ""
            && gameForm.rounds !== ""
            && gameForm.playerCount !== "") {
            setPlayersDisplay(true)
            setPlayersForm({})
        } else {
            setPlayersDisplay(false)
        }
    }

    const saveGame = (e) => {
        e.preventDefault();
        console.log(Object.keys(playersForm).length, gameForm.playerCount)
        let playersArr = []
        let playersArrLength = Object.keys(playersForm).length
        for (let i = 1; i < playersArrLength + 1; i++) {
            playersArr.push(playersForm[i])
        }


        if (Object.keys(playersForm).length === parseInt(gameForm.playerCount)) {

            db.collection("games").add({
                gameId: gameId,
                user: user.email,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                gameName: gameForm.name,
                parValue: gameForm.par,
                rounds: gameForm.rounds,
                players: playersArr
            })

            db.collection("players").add({
                gameId: gameId,
                players: playersArr
            })
            history.push(`/game/${gameId}/1`)
        }




    }

    if (gameForm.playerCount !== "" && gameForm.rounds !== "") {
        const count = parseInt(gameForm.playerCount)
        let playerIndexArr = []
        for (let i = 1; i < count + 1; i++) {
            playerIndexArr.push(i)
        }

        for (const [index, val] of playerIndexArr.entries()) {
            playerElements.push(
                <div className="newGame__addPlayer">
                    <TextField
                        style={{ width: "100%" }}
                        id={`player${val}`}
                        value={playersForm[val["name"]]}
                        name={val}
                        label={`player ${val}`}
                        onChange={handlePlayersInputChange}
                        required
                    />
                </div>

            )
        }


    }






    return (
        <motion.div
            className="newGame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <div className="newGame__form">
                {!playersDisplay ?
                    (<form>
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
                                pattern="[0-9]" 
                                inputmode="numeric"
                                min="1" max="5"
                                onChange={handleInputChange}
                            />
                            <TextField
                                style={{ width: "30%" }}
                                id="rounds"
                                pattern="[0-9]" 
                                inputmode="numeric"
                                type="number"
                                name="rounds"
                                min="1" max="30"
                                value={gameForm.rounds}
                                label="Rounds"
                                onChange={handleInputChange}

                            />

                            <TextField
                                style={{ width: "30%" }}
                                id="count"
                                type="number"
                                pattern="[0-9]" 
                                inputmode="numeric"
                                name="playerCount"
                                min="1" max="10"
                                value={gameForm.playerCount}
                                label="Players"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="newGame__saveGame" onClick={(e) => {
                            e.preventDefault()
                            toggleDispaly()
                        }}>
                            <button>Next</button>
                        </div>

                    </form>) : (
                        <form>
                            <div className={parseInt(gameForm.playerCount) <= 3 ? "newGame__addPlayersFew" : "newGame__addPlayers"}>
                                {playerElements}
                            </div>

                            <div className="newGame__buttons">
                                <button onClick={toggleDispaly}> back</button>
                                <button onClick={saveGame}> Next</button>
                            </div>

                        </form>
                    )
                }
            </div>
        </motion.div>
    )
}

export default NewGame;
