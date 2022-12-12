// TODO: make a new login page for authorized users and direct unauthorized to login page
import React, {useState, useEffect} from "react";

function Home() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(window.localStorage.getItem("name"));
  }, []);

  // FIXME: Fix this username
  return (
    <div className="container">
      
      <h1 className="greeting">Hi {username}, lets start saving today!</h1>
    </div>
  );
}

Home.propTypes={};
export default Home;