import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/login.css";
import PropTypes from "prop-types";

// function Login({ updateUser }) {
function Login() {
  const navigate = useNavigate();
  let [name, setName] = useState();
  let [password, setPassword] = useState();

  const nameUpdate = (event) => {
    setName(event.target.value);
    window.localStorage.setItem("name", name);
  };

  const passwordUpdate = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postURL = "/login";
    fetch(postURL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        password: password
      })
    })
      .then((response) => {
        if (!response.ok) {
          alert("Invalid username or password");
          navigate("/");
          throw new Error(response.statusText);
        }
        navigate("/mybudget");
        return response.text();
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div>
      <div className="login-wrapper">
        <h2>Log In to See Your Customized Plan</h2>
        <form onSubmit={handleSubmit} className="login-form-content">
          <ul>
            <li>
              <label className="form-label">Username: </label>
              <input
                type="text"
                required
                onChange={nameUpdate}
                aria-label="Close"
              />
            </li>
            <li>
              <label className="form-label">Password: </label>
              <input
                type="password"
                required
                onChange={passwordUpdate}
                aria-label="Close"
              />
            </li>
          </ul>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <h3>
          An account will be automatically registered for new user, which may
          take ~2 seconds
        </h3>
      </div>
      {/* <div>
        <img src={save_img} alt="" className="pig-img" />
      </div> */}
    </div>
  );
}

Login.propTypes = {};
export default Login;
