// import {useState} from "react";
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { Switch, Route } from "react-router-dom";
import NewGame from './pages/newGame/NewGame';
import { animiatePresence} from "framer-motion"


function App() {

    return (
        <div className="app">
            <div className="frolferApp">
                <Navbar />
                <animiatePresence>
                    <Switch >
                        <Route path="/newgame" component={NewGame} exact />
                        <Route path="/" component={Home} />
                    </Switch>
                </animiatePresence>
            </div>
        </div>

    );
}

export default App;
