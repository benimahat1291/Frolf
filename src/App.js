import {useEffect } from "react";
import './App.css';
import Home from './pages/home/Home';
import Navbar from './components/navbar/Navbar';
import { Switch, Route } from "react-router-dom";
import NewGame from './pages/newGame/NewGame';
import {AnimatePresence } from "framer-motion"
import Login from './pages/login/Login';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from "firebase"
import GameRounds from "./pages/gameRounds/GameRounds";
import GameResults from "./pages/gameResults/GameResults";


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
                    <Route path="/game/:gameId/results" component={GameResults} exact />
                        <Route path="/game/:gameId/:round" component={GameRounds} exact />
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
