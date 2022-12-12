// TODO: make a new login page for authorized users and direct unauthorized to login page
import React, {useState, useEffect} from "react";
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";
import Login from "../components/login";
import save_img from "../images/save.jpg";
import PropTypes from "prop-types";
import "../style/homepage.css";

function HomePage({ updateUser }) {
  // const [greeting, setGreeting] = useState("");
  let greeting = "";
  const [auth, setAuth] = useState({isAuth: false, user: null});

  useEffect(() => {
    fetch("/auth", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => {
      return resp.json();
    })
      .then((resp) => {
        console.log(resp);
        if (resp.success) {
          console.log("Auth user: " + resp.user);
          setAuth({isAuth: true, user: resp.user});
        } else {
          console.error("User not authenticated.");
        }
      });
  }, []);


  if (auth.isAuth) {
    greeting = `Hi ${auth.user}, lets start saving today!`;
    return (
      <div className="container">
        <div>
          <h1 className="greeting">{greeting}</h1>
        </div>
        <div>
          <img src={save_img} alt="piggy bank" className="pig-img" />
        </div>
      </div>
    );
  } else {
    greeting = "Please log in before starting!";
    return (
      <div className="container">
        <h1 className="greeting">{greeting}</h1>
        <Login updateUser={updateUser} />
      </div>
    );
  }
}

HomePage.propTypes={};
export default HomePage;