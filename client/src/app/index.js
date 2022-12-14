import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../App.css";
// It's personal preference for file naming, but there is an Airbnb React/JSX Style Guide that most people follow. It recommends that Filename: Use PascalCase for filenames. E.g., ReservationCard.jsx.
import NavBar from "../components/navbar";
import Login from "../components/login";
import Footer from "../components/footer";
import Dashboard from "../pages/dashboard";
import Rank from "../pages/rank";
import Budget from "../pages/budget";
import HomePage from "../pages/homepage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  var [name, setName] = useState("");

  useEffect(() => {
    setName(window.localStorage.getItem("name"));
  }, []);

  const updateUser = (name) => {
    setName(name);
    localStorage.setItem("name", name);
  };

  return (
    <div role="main">
      <Router classname="router">
        <NavBar />
        <Routes>
          {/* <Route exact path="/" element={<Homepage updateUser={updateUser} />} /> */}
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/myaccount"
            element={<Dashboard username={name} />}
          />
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
