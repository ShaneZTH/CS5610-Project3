import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import StatusTable from "../components/statusTable";
import refresh_img from "../images/refresh.jpeg";
import reset_img from "../images/reset-img.jpeg";
import Alert from "react-bootstrap/Alert";

function Dashboard() {
  const [showDining, setShowDining] = useState(true);
  const [showGrocery, setshowGrocery] = useState(true);
  const [showEnt, setshowEnt] = useState(true);
  const [showClothes, setshowClothes] = useState(true);
  const [showTravel, setshowTravel] = useState(true);
  const [showMed, setshowMed] = useState(true);
  const [showOther, setshowOther] = useState(true);

  const navigate = useNavigate();
  //const [username, setUsername] = useState("");
  const [parentspendMap, setparentspendMap] = useState(new Map());
  const [parentbudgetMap, setparentbudgetMap] = useState(new Map());
  const handleclick = () => {
    window.location.reload();
  };

  const updateSpend = (spendMap) => {
    setparentspendMap(spendMap);
  };

  const updateBudget = (budMap) => {
    setparentbudgetMap(budMap);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const deleteURL = "/expense";
    fetch(deleteURL, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        alert("Successfully reset current status");
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload();
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const getURL = "/logout";
    fetch(getURL, {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        if (response.status === 204) {
          alert("Successfully Logged Out");
          navigate("/");
        }
        return response.text();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    /*         fetch("http://localhost:8080/user",{
            credentials:'include',
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            }).
            then((res)=>{
                console.log(res);
                if(!res.ok){
                    //window.location.reload();
                    return new Error(res.statusText);
                }
                return res.text();
            })
            .then((data)=>{
                console.log(data);
                setUsername(data);               
            });  */
    console.log(window.localStorage.getItem("name"));
    //setUsername(window.localStorage.getItem("name"));
  }, []);
  return (
    <div className="dashboard-page">
      {/*             <h2 className='greeting'>Hi {username}, let's start saving today!</h2>
            <ExpenseForm curr_user={username}/> */}
      <div className="status-div">
        <h2 className="status-text">Current Status</h2>
        <button className="refresh-button" onClick={handleclick}>
          <img src={refresh_img} alt="" className="refresh-img" />
        </button>
        <button className="reset-button" onClick={handleReset}>
          <img src={reset_img} alt="" className="reset-img" />
        </button>
      </div>
      <StatusTable
        className="curr-table"
        updateBudget={updateBudget}
        updateSpend={updateSpend}
      />

      <div className="warning-div">
        <h2 className="status-text">My Warnings</h2>
        <button className="refresh-button" onClick={handleclick}>
          <img src={refresh_img} alt="" className="refresh-img" />
        </button>
      </div>
      <div className="alert-window">
        {showDining &&
          parentspendMap.get("dining") / parentbudgetMap.get("dining") >= 1 && (
            <Alert
              variant="danger"
              onClose={() => setShowDining(false)}
              dismissible
            >
              <Alert.Heading>Dining Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in dining or you won't have
                enough money by the end of month.
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showGrocery &&
          parentspendMap.get("grocery") / parentbudgetMap.get("grocery") >=
            1 && (
            <Alert
              variant="danger"
              onClose={() => setshowGrocery(false)}
              dismissible
            >
              <Alert.Heading>Grocery Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in grocery shopping or you won't
                have enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showEnt &&
          parentspendMap.get("entertainment") /
            parentbudgetMap.get("entertainment") >=
            1 && (
            <Alert
              variant="danger"
              onClose={() => setshowEnt(false)}
              dismissible
            >
              <Alert.Heading>Entertainment Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in entertainment or you won't
                have enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showClothes &&
          parentspendMap.get("clothes") / parentbudgetMap.get("clothes") >=
            1 && (
            <Alert
              variant="danger"
              onClose={() => setshowClothes(false)}
              dismissible
            >
              <Alert.Heading>Clothes & Makeup Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in clothes & makeup or you won't
                have enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showTravel &&
          parentspendMap.get("travel") / parentbudgetMap.get("travel") >= 1 && (
            <Alert
              variant="danger"
              onClose={() => setshowTravel(false)}
              dismissible
            >
              <Alert.Heading>Travel Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in traveling or you won't have
                enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showMed &&
          parentspendMap.get("medicene") / parentbudgetMap.get("medicene") >=
            1 && (
            <Alert
              variant="danger"
              onClose={() => setshowMed(false)}
              dismissible
            >
              <Alert.Heading>Medication Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in medication or you won't have
                enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>
      <div className="alert-window">
        {showOther &&
          parentspendMap.get("others") / parentbudgetMap.get("others") >= 1 && (
            <Alert
              variant="danger"
              onClose={() => setshowOther(false)}
              dismissible
            >
              <Alert.Heading>Other Budget Exceeded!</Alert.Heading>
              <p>
                Start controling your spending in others or you won't have
                enough money by the end of month. 😢
              </p>
            </Alert>
          )}
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default Dashboard;
