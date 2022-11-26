import React, { useState, useEffect } from "react";
import refresh_img from "../images/refresh.jpeg";
import "../style/rank.css";
function Rank() {
  const [userList, setuserList] = useState([]);
  const [rank, setRank] = useState(0);
  const [username, setUsername] = useState("");
  const [currspend, setCurrspend] = useState(0);
  const [percentile, setPercentile] = useState(0);
  const [goodnews, setGoodnews] = useState(false);
  const handleRefresh = () => {
    getAllUsers();
    //window.location.reload();
    console.log("user list is", userList);
    for (var i = 0; i < userList.length; i++) {
      if (userList[i] == currspend) {
        setRank(i + 1);
      }
    }
    const curr_percent = 100 * (1 - rank / userList.length);
    if (!isNaN(curr_percent) && curr_percent < 100) {
      setPercentile(100 * (1 - rank / userList.length));
    }
    const stored_percentile = window.localStorage.getItem("percentile");
    console.log("stored percentile", stored_percentile);
    console.log("curr percentile", curr_percent);
    if (
      isNaN(curr_percent) &&
      curr_percent < 100 &&
      stored_percentile < curr_percent
    ) {
      //console.log("curr percentile", curr_percent);
      setGoodnews(true);
    }
    if (
      !isNaN(curr_percent) &&
      curr_percent < 100 &&
      stored_percentile !== curr_percent
    ) {
      localStorage.setItem("percentile", curr_percent);
    }
    console.log(goodnews);
  };

  const getAllUsers = () => {
    const getURL = "http://localhost:8080/rank";
    fetch(getURL, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
            console.log("percentage is", amount);
          }
          userArr.push(amount);
        }
        userArr.sort(function (a, b) {
          return a - b;
        });
        console.log("sorted arr", userArr);
        setuserList(userArr);
      });
  };

  useEffect(() => {
    console.log(window.localStorage.getItem("name"));
    setUsername(window.localStorage.getItem("name"));
  }, []);

  return (
    <div>
      <div className="rank-div">
        <h2 className="rank-text">Current Rank</h2>
        <button className="refresh-button" onClick={handleRefresh}>
          <img src={refresh_img} alt="" className="refresh-img" />
        </button>
      </div>
      <h3>You have defeated {percentile}% users</h3>
      {goodnews && <h4>Good job</h4>}
    </div>
  );
}

export default Rank;
