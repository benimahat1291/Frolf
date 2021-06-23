import React, { useState, useEffect } from 'react'
import "./GameRounds.css"
import { motion } from "framer-motion"
import { db } from '../../firebase'
import { useParams, useHistory } from 'react-router-dom'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import NumericInput from 'react-numeric-input';


const GameRounds = () => {
    let history = useHistory()
    const [gameData, setGameData] = useState()
    const { gameId, round } = useParams()
    const [playersArr, setPlayersArr] = useState()

    useEffect(() => {
        getGames();
    }, [])

    const getGames = () => {
        db.collection("games").where("gameId", "==", gameId).onSnapshot((GamesSnapshot) => {
            setGameData(
                GamesSnapshot.docs.map((doc) => ({
                    gameId: doc.data().gameId,
                    gameName: doc.data().gameName,
                    par: doc.data().parValue,
                    rounds: doc.data().rounds,
                    players: doc.data().players,
                }))
            )
            setPlayersArr(
                GamesSnapshot.docs.map((doc) => ([
                    doc.data().players,
                ]))
            )
        })
    }

    const handleLastPage = () => {
        let nextRound = parseInt(round) - 1
        history.push(`../${gameId}/${nextRound}`)
    }

    const handleNextPage = () => {
        let nextRound = parseInt(round) + 1
        history.push(`../${gameId}/${nextRound}`)
        if (playersArr) {
            console.log(playersArr[0][0][0]["scores"])
        }
    }

    const handleResultsPage = () => {
        history.push(`../${gameId}/results`)
    }

    return (
        <motion.div
            className="gameRound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>

            <div className="gameRound__round">
                <div className="gameRound__roundTracker">
                    <h1 className="gameRound__roundTrackerCur">{round}</h1>
                    <h1 className="gameRound__roundTrackerTot">{gameData && gameData[0].rounds}</h1>
                </div>
            </div>

            {playersArr &&
                <div className={playersArr[0][0].length > 4 ? "gameRound__playersMany" : "gameRound__playersFew"}>
                    {playersArr[0][0].map((player) => (
                        <div className="gameRound__playersCard" key={player.name}>
                            <div className="gameRound__playerCardName">
                                <h1>{player.name.toUpperCase()}</h1>
                            </div>

                            <div className="gameRound__playerCardTotal">
                                <h1>{player.scores[0].score}</h1>
                            </div>
                            <div className="gameRound__playerCardScore">
                            <input className="gameRound__scoreInput" type="number" pattern="[0-9]" inputmode="numeric" id="quantity" name="quantity" min="0" max="20" value="0"/>
                            </div>
                        </div>
                    ))}
                </div>
            }
            {gameData &&
                <div className="gameRound__buttons">
                    <div>
                        <button
                            onClick={handleLastPage}
                            style={{ display: (round == 1 ? "none" : "block") }}>
                            Back
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleNextPage}
                            style={{ display: round === gameData[0].rounds ? "none" : "block" }}>
                            Next
                        </button>
                        <button
                            onClick={handleResultsPage}
                            style={{ display: round === gameData[0].rounds ? "block" : "none" }}>
                            Done
                        </button>
                    </div>
                </div>
            }
        </motion.div>
    )
}

export default GameRounds
