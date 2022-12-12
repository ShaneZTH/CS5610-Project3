// TODO: make a new login page for authorized users and direct unauthorized to login page
import React, {useState, useEffect} from "react";

function HomePage() {
  // const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");
  const [auth, setAuth] = useState({isAuth: false, user: null});

  useEffect(() => {

    let user;
    fetch("/auth", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((resp) => {
      if (resp.status === 200) return resp.json();
    })
      .then((resp) => {
        console.log("Auth:" + resp.message);
        console.log(resp);
        if (resp.success) {
          console.log("A user: " + resp.user);
          setAuth(e => ({isAuth: true, user: resp.user}));
        } 
      });

    if (auth.isAuth) {
      setGreeting(`Hi ${auth.user}, lets start saving today!`);
    } else {
      setGreeting("Please log in before starting!");
    }
  }, []);

  return (
    <div className="container">
      <h1 className="greeting">{greeting}</h1>
    </div>
  );
}

HomePage.propTypes={};
export default HomePage;