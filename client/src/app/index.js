import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";

import NavBar from "../components/navbar";
import Login from "../components/login";
import Footer from "../components/footer";
import Dashboard from "../pages/dashboard";
import Rank from "../pages/rank";
import Budget from "../pages/budget";
// import background from "../images/bg-img.jpeg"
// import { NavBar, Login } from "../components";
import RecordPage from "../pages/RecordPage";

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
          <Route path="/budget" element={<RecordPage />} />
          <Route path="/rank" element={<Rank />} />
        </Routes>
      </Router>

      <Footer />
    </div>
  );
}

export default App;
