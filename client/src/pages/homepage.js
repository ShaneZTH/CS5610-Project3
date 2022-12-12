// TODO: make a new login page for authorized users and direct unauthorized to login page
import React, {useState, useEffect} from "react";

function HomePage() {
  // const [username, setUsername] = useState("");
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    // setUsername(window.localStorage.getItem("name"));
    let user = localStorage.getItem("name");
    console.log("Home's window: " + user);
    console.log("localStorage: ");
    console.log(window.localStorage);
    
    console.log("localStorage: ");
    console.log(localStorage);
    if (user) {
      setGreeting(`Hi ${user}, lets start saving today!`);
    } else {
      setGreeting("Please log in before starting!");
    }
    
  }, []);

  // FIXME: Fix this username
  return (
    <div className="container">
      <h1 className="greeting">{greeting}</h1>
      <h3>GGG</h3>
    </div>
  );
}

HomePage.propTypes={};
export default HomePage;