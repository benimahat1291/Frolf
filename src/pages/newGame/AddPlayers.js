import React, { useState, useEffect } from 'react'
import "./AddPlayers.css"
import { motion } from "framer-motion"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../firebase'

const AddPlayers = () => {
    const [user, loading] = useAuthState(auth)
    const [userGames, setUserGames] = useState([])
    const [playerInputArr, setPlayerInputArr] = useState()

    useEffect(() => {
        getGames()
    }, [])

    const getGames = () => {
        db.collection("games").where("user", "==", user.email).onSnapshot((GamesSnapshot) => {
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

    const makePlayersArr = async () => {
        const num = await userGames[0].playerCount;
        const int = parseInt(num);
        const arry = []
        // console.log(int)
        for(let i=1; i < (int+1); i++) {
            arry.push(`Player ${i}`)
        }
       console.log(arry)
       if(int === arry.length){
        //   return setPlayerInputArr(arry)
       }
        
    }
    
    if(userGames.length > 1) makePlayersArr()

    

    return (
        <div>
            <motion.div
                className="addPlayers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
            </motion.div>
        </div>
    )
}

export default AddPlayers
