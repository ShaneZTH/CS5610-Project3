import React, { useState, useEffect } from "react";
import "../style/tipBox.css";
import PropTypes from "prop-types";

function TipBox() {
  const [tip, setTip] = useState("");
  const tipURI = "/api/tip";

  async function loadTip() {
    // Load tip from db
    let uri = tipURI;
    try {
      const res = await fetch(uri, {
        method: "GET",
        credentials: "include"
      });
      console.log("res: " + res);

      let data = await res.json();
      let userTip = data.tip[0].tip;
      console.log("Tip data: ", userTip);
      setTip(userTip);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadTip();
  }, []);

  let handleChange = (event) => {
    const val = event.target.value;
    setTip(val);
  };

  function saveTip() {
    console.log("Save Tip: ", tip);
    let uri = tipURI;

    const username = window.localStorage.getItem("name");
    const reqBody = JSON.stringify({
      user: username,
      tip: tip
    });
    console.log("saveTip reqBody: " + reqBody);

    fetch(uri, {
      body: reqBody,
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
      .then((res) => {
        console.log("saveTip: " + JSON.stringify(res));
        return res.text();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="tipBox-wrapper">
      <h3>Set a Personal Saving Tip</h3>
      <div className="rounded-lg">
        <textarea
          className="outline-0 mt-2 mb-2"
          id="tip-text"
          value={tip}
          aria-label="Tip box"
          onChange={handleChange}
        >
          Nice, Mrs Pancakes. Real nice. aww. Look it up.
        </textarea>
        <div className="bg-grey-light rounded-b-lg saveBtn">
          <button
            className="border border-grey px-2 py-1 rounded hover:bg-grey outline-0 text-grey-darkest mr-1"
            onClick={saveTip}
          >
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

TipBox.PropTypes={};
export default TipBox;
