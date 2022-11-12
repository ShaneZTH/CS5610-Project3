
import React,{useState} from 'react'
//import { BrowserRouter as Router } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css'
//import { NavBar } from '../components'
import NavBar from "../components/navbar"
import Login from "../components/login"
import Footer from '../components/footer';
import Dashboard from '../pages/dashboard';
import Rank from '../pages/rank';
import Budget from '../pages/budget';
import background from "../images/bg-img.jpeg"
import { Image } from 'primereact/image';
 

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div>
    <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/account" element={<Dashboard/>}/>
          <Route path='/budget' element={<Budget/>}/>
          <Route path='/rank' element={<Rank/>}/>
        </Routes>
    </Router>

    <Footer/>
    </div>
  )
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
