import { useState, useEffect } from "react";
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { Switch, Route } from "react-router-dom";
import NewGame from './pages/newGame/NewGame';
import { motion, AnimatePresence } from "framer-motion"
import Login from './pages/login/Login';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase"
import AddPlayers from "./pages/newGame/AddPlayers";


function App() {

    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            db.collection(`users`).doc(user.uid).set(
                {
                    email: user.email,
                    lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
                    photoURL: user.photoURL,
                },
                { merge: true }
            );
        }
    }, [user])


    if (!user) {
        return <Login />
    }

    if (loading) {
        return <div>...</div>
    }

    return (
        <div className="app">
            <div className="frolferApp">
                <Navbar />
                <AnimatePresence>
                    <Switch >
                        <Route path="/newgame/addplayers" component={AddPlayers} exact />
                        <Route path="/newgame" component={NewGame} exact />
                        <Route path="/login" component={Login} exact />
                        <Route path="/" component={Home} />
                    </Switch>
                </AnimatePresence>
            </div>
        </div>

    );
}

export default App;
