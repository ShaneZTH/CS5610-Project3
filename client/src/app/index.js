import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
import NavBar from "../components/navbar";
import Login from "../components/login";
import Footer from "../components/footer";
import Dashboard from "../pages/dashboard";
import Rank from "../pages/rank";
import Budget from "../pages/budget";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  var [name, setName] = useState("");

  useEffect(() => {
    // console.log(window.localStorage.getItem("name"));
    setName(window.localStorage.getItem("name"));
  }, []);

  const updateUser = (name) => {
    setName(name);
    localStorage.setItem("name", name);
  };
  // console.log(name);
  return (
    <div role="main">
      <Router classname="router">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Login updateUser={updateUser} />} />
          <Route exact path="/myaccount" element={<Dashboard username={name} />} />
          <Route exact path="/mybudget" element={<Budget />} />
          <Route exact path="/myuserrank" element={<Rank />} />
        </Routes>
      </Router>
      {/* <h1>Welcome to Spending Tracker!</h1> */}

      <Footer />
    </div>
  );
}

export default App;
