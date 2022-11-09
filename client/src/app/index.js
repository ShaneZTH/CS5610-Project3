
import React from 'react'
//import { BrowserRouter as Router } from 'react-router-dom'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import '../App.css'
//import { NavBar } from '../components'
import NavBar from "../components/navbar"
import Login from "../components/login"
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
        </Routes>
    </Router>
    <Image src='../images/save.jpg' alt="Image text"></Image>
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
