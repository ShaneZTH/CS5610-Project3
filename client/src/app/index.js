
import React from 'react'
//import { BrowserRouter as Router } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import { NavBar } from '../components'
import NavBar from "../components/navbar"
import Login from "../components/login"

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Login/>}/>
        </Routes>
    </Router>
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
