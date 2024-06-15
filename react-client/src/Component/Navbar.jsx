// src/Navbar.js
import React from 'react';
import './navbar.css'; // Import custom CSS for styling
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar=() => {
    const handleLogout=async () => {
        try {
            await axios.post( 'http://localhost:5000/user/logout', {
                withCredentials: true // Send cookies with the request
            } );
            localStorage.removeItem( 'user' ); // Remove user session data
            window.location.href='/login'; // Redirect to login page
        } catch ( error ) {
            console.error( 'Logout error:', error );
            // Handle error if needed
        }
    };

    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/homepage">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/timeline">Timeline</Link>
                </li>
                <li className="nav-item">
                    <Link to="/friend">Friends</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about">About</Link>
                </li>
                <li className="nav-item">
                    <button onClick={handleLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
