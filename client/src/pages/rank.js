import React, { useState, useEffect } from "react";
import refresh_img from "../images/refresh.jpeg";
import "../style/rank.css";
import Alert from "react-bootstrap/Alert";
import TipBox from "../components/tipBox";
import { useNavigate } from "react-router-dom";
function Rank() {
  const navigate = useNavigate();

  const [userList, setuserList] = useState([]);
  const [username, setUsername] = useState("");
  const [currspend, setCurrspend] = useState(0);
  const [percentile, setPercentile] = useState(0);
  const [oldrank, setOldrank] = useState(0);
  const [isbetter, setisbetter] = useState(false);
  const [showbetter, setshowbetter] = useState(true);
  const [showworse, setshowworse] = useState(true);
  const [isAuth, setAuth] = useState(false);

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
          setAuth(true);
          setUsername(resp.user);
        } else { // Reject access
          console.error("User not authenticated.");
          alert("You haven't logged in yet.");
          navigate("/");
          return;
        }
      });
      
    setUsername(window.localStorage.getItem("name"));
    getOldRank();
  }, []);

  const handleRefresh = () => {
    getAllUsers();
    // console.log("user list is", userList);
    for (var i = 0; i < userList.length; i++) {
      if (userList[i] === currspend) {
        const curr_percent = (100 * (1 - (i + 1) / userList.length)).toFixed(2);
        if (!isNaN(curr_percent) && curr_percent < 100) {
          setPercentile(curr_percent);
          break;
        }
      }
    }
    //getOldRank();
    // console.log("old rank is: ", oldrank);
    // console.log("curr percentile is", parseInt(percentile));
    if (parseInt(percentile) > oldrank) {
      setisbetter(true);
    }
    postRank();
  };

  const getAllUsers = () => {
    const getURL = "/rank";
    fetch(getURL, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        var data_arr = JSON.parse(data);
        var userArr = new Array();
        for (var i = 0; i < data_arr.length; i++) {
          const name = data_arr[i]["username"];
          const amount = parseInt(100 * data_arr[i]["overall"]);
          //const percentage = amount * 100;
          if (name === username) {
            setCurrspend(amount);
            // console.log("percentage is", amount);
          }
          userArr.push(amount);
        }
        userArr.sort(function (a, b) {
          return a - b;
        });
        //console.log("sorted arr", userArr);
        setuserList(userArr);
      });
  };

  const getOldRank = () => {
    const getURL = "/rankstatus";
    fetch(getURL, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        //console.log("res is", res);
        return response.text();
      })
      .then((data) => {
        // console.log("data looks like this:", data);
        var data_arr = JSON.parse(data);
        const percent = parseInt(data_arr[0]["data"]["myrank"]);
        // console.log("old rank obtained", percent);
        setOldrank(percent);
      })
      .catch((err) => console.log(err));
  };

  const postRank = () => {
    const postURL = "/rankstatus";
    // console.log("post percentage is:", percentile);
    fetch(postURL, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        myrank: percentile
      })
    })
      .then((res) => {
        return res.text();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="rank-div">
        <h2 className="rank-text">Click to See Rank</h2>
        <button className="refresh-button" onClick={handleRefresh} >
          <img src={refresh_img} alt="" className="refresh-img" aria-label="Close"/>
        </button>
        <TipBox className="rank-tip"></TipBox>
      </div>
      <h4>You have defeated {percentile}% users</h4>
      {isbetter && showbetter && (
        <Alert
          className="alert-window"
          variant="success"
          onClose={() => setshowbetter(false)}
          dismissible
        >
          <Alert.Heading>Keep up the good work </Alert.Heading>
          <p>You rank is getting better 😀</p>
        </Alert>
      )}
      {!isbetter && showworse && (
        <Alert
          className="alert-window"
          variant="warning"
          onClose={() => setshowworse(false)}
          dismissible
        >
          <Alert.Heading>Boost your rank!</Alert.Heading>
          <p>Looks like there are many competiters 🤣</p>
        </Alert>
      )}
    </div>
  );
}
Rank.propTypes={};
export default Rank;
