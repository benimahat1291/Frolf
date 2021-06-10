import React from 'react'
import "./NewGame.css"
import { motion} from "framer-motion"

const NewGame = () => {
    return (
        <motion.div 
        className="newGame"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}>
     
        </motion.div>
    )
}

export default NewGame;
