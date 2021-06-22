import React, { useState, useEffect } from 'react'
import "./GameRounds.css"
import { motion } from "framer-motion"
import { db } from '../../firebase'
import { useParams, useHistory } from 'react-router-dom'



const GameRounds = () => {
    let history = useHistory()
    const [gameData, setGameData] = useState()
    const { gameId, round } = useParams()
    const [playersArr, setPlayersArr] = useState()
    let roundsArr = []




    useEffect(() => {
        getGames();
    })


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

    if (playersArr && gameData) {

        console.log("players", playersArr[0][0])
        console.log("gameData", gameData[0].rounds)
        const roundCount = parseInt(gameData[0].rounds);
        for (let i = 1; i <= roundCount; i++) {
            roundsArr.push(i)
        }


    }

    const handleLastPage = () => {
        let nextRound = parseInt(round) - 1
        history.push(`../${gameId}/${nextRound}`)
    }

    const handleNextPage = () => {
        let nextRound = parseInt(round) + 1
        history.push(`../${gameId}/${nextRound}`)
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
                            <h1>{player.name.toUpperCase()}</h1>
                        </div>

                    ))}
                </div>
            }
            {gameData &&
                <div className="gameRound__buttons">
                    <div>
                        <button
                            onClick={handleLastPage}
                            style={{ display: (round == 1 ? "none" : "block" )}}>
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
