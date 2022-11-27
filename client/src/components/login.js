import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../style/login.css";
import save_img from "../images/save.jpg";
import PropTypes from "prop-types";

function Login({ updateUser }) {
  const navigate = useNavigate();
  var [name, setName] = useState();
  var [password, setPassword] = useState();

  const nameUpdate = (event) => {
    setName(event.target.value);
    updateUser(event.target.value);
  };
  const passwordUpdate = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postURL = "http://localhost:8080/login";
    //navigate("/budget");
    fetch(postURL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        password: password,
      }),
    })
      .then((response) => {
        //navigate("/account");
        console.log("response for log in is", response);
        if (!response.ok) {
          console.log("response for log in is", response);
          alert("Invalid username or password");
          navigate("/");
          throw new Error(response.statusText);
        }
        navigate("/budget");
        return response.text();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="login-wrapper">
        <h2>Log In to See Your Customized Plan</h2>
        <form onSubmit={handleSubmit}>
          <ul>
            <li>
              <label className="form-label">Username: </label>
              <input type="text" required onChange={nameUpdate} />
            </li>
            <li>
              <label className="form-label">Password: </label>
              <input type="password" required onChange={passwordUpdate} />
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
      <div>
        <img src={save_img} alt="" className="pig-img" />
      </div>
    </div>
  );
}

Login.propTypes = {
  updateUser: PropTypes.func,
};

export default Login;
