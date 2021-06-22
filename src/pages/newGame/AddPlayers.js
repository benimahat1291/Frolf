import React, { useState, useEffect } from 'react'
import "./AddPlayers.css"
import { motion } from "framer-motion"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'


const AddPlayers = () => {
    const [user, loading] = useAuthState(auth)
    const [userGames, setUserGames] = useState([])
    let arry = []

    useEffect(() => {
        getGames()
    }, [])

    const getGames = () => {
        db.collection("games").where("user", "==", user.email).orderBy("timestamp", "asc").onSnapshot((GamesSnapshot) => {
            setUserGames(
                GamesSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().gameName,
                    par: doc.data().gameDificulty,
                    playerCount: doc.data().gamePlayerCount
                }))
            )
        })
    }

    const makePlayersArr = (num) => {
        const playerCount = num;
        const int = parseInt(playerCount);
        for (let i = 1; i < (int + 1); i++) {
            arry.push(`Player ${i}`)
        }
    }


    if (userGames.length > 0) {
        makePlayersArr(userGames[userGames.length-1].playerCount)
        console.log(userGames)
    }

    return (
        <div>
            <motion.div
                className="addPlayers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>

                {arry.map((player) => (
                    <div><h1>{player}</h1></div>
                ))}
            </motion.div>
        </div>
    )
}

export default AddPlayers
