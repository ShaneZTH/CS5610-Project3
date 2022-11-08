import React from 'react';
import '../App.css'
import {  Link } from "react-router-dom";
const NavBar=()=>{
    return(
        <div>
            <li>
                <Link to="/">Spending Tracker</Link>
            </li>
            <li>
                <Link to="/budget">My Budget</Link>
            </li>
            <li>
                <Link to="/rank">My Ranking</Link>
            </li>
            <li>
                <Link to="/account">My Account</Link>
            </li>
        </div>
    );
}
export default NavBar;