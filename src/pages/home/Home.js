import React, {useState} from 'react'
import "./Home.css"
import NetImg from "../../images/net.png"
import StartButton from '../../components/buttons/StartButton'
import {useHistory} from "react-router-dom"

const Home = () => {
    const [discToss, setDiscToss] = useState(false);
    let history = useHistory();
    
    const startGame = () => {
       if (discToss){
           setDiscToss(false);
       } else (
           setDiscToss(true)
       )
       
        setTimeout(()=> {
            history.push("/newgame")

        },800)
     
    }

    console.log(discToss)
    return (
        <div className="home">
            <div className="buttonContainer" onClick= {()=> startGame()} >
              <StartButton/>
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
