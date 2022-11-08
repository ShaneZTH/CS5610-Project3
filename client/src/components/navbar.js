import React from 'react';
import '../style/navbar.css'
import {  Link } from "react-router-dom";
function NavBar(){
    function changeBackground(e){
        e.target.style.background='blue';
    }
    return(
        <div className='navbar'>
            <li>
                <Link to="/" className='title'>Spending Tracker</Link>
            </li>
            <li>
                <Link to="/budget" className='menu'>My Budget</Link>
            </li>
            <li>
                <Link to="/rank" className='menu'>My Ranking</Link>
            </li>
            <li>
                <Link to="/account" className='menu'>My Account</Link>
            </li>
        </div>
    );
}
export default NavBar;