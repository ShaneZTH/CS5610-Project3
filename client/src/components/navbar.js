import React from 'react';
import '../style/navbar.css'
import {  Link } from "react-router-dom";
function NavBar(){
    return(
        <div className='navbar'>
            <li>
                <Link to="/" className='title'>Spending Tracker</Link>
            </li>
            <li>
                <Link to="/budget" className='menu'>Budget & Expenses</Link>
            </li>
            <li>
                <Link to="/rank" className='menu'>Ranking & Tips</Link>
            </li>
            <li>
                <Link to="/account" className='menu'>My Dashboard</Link>
            </li>
        </div>
    );
}
export default NavBar;