import React from 'react'
import "./Navbar.css"
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <>
            <nav className="navbar">
                <Link className="navLink" to={"/"}>
                    <h2>FR-olf</h2>
                </Link>
                <MenuIcon />
            </nav>
        </>
    )
}

export default Navbar
