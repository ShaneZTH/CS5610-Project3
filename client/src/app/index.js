import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
//import { NavBar } from '../components'
import NavBar from "../components/navbar";
import Login from "../components/login";
import Footer from "../components/footer";
import Dashboard from "../pages/dashboard";
import Rank from "../pages/rank";
import Budget from "../pages/budget";
// import background from "../images/bg-img.jpeg"
// import { Image } from 'primereact/image';

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  var [name, setName] = useState("");

  useEffect(() => {
    console.log(window.localStorage.getItem("name"));
    setName(window.localStorage.getItem("name"));
  }, []);

  /*   useEffect(() => {
    window.localStorage.setItem('name', name);
  }, [name]);  */

  const updateUser = (name) => {
    setName(name);
    localStorage.setItem("name", name);
  };
  console.log(name);
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login updateUser={updateUser} />} />
          <Route path="/account" element={<Dashboard username={name} />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
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
