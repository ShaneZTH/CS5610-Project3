import React from "react";
import { useState, useEffect } from "react";
import "../stylesheets/budget.css";
import Records from "./Records";
// import PropTypes from "prop-types";

function Budget() {
  const [records, setRecords] = useState([]);

  async function reloadData() {
    console.log("reloadData");
    const res = await fetch("/api/spending/user");
    console.log("res ", res);

    let data = await res.json();
    console.log("getUser data", data);

    setRecords(data.spendings);
  }

  useEffect(() => {
    reloadData();
    return () => {
      console.log("Cleaining up the effect");
    };
  }, []);

  // update records on page after edit
  function onUpdateRecords(updatedRecord) {
    const updatedRecords = records.map((record) => {
      console.log("key ", record.id, updatedRecord.id);
      if (record.id === updatedRecord.id) {
        return updatedRecord;
      } else {
        return record;
      }
    });
    setRecords(updatedRecords);
  }

  return (
    <div className="budget">
      <div className="container">
        <div>
          <Records records={records} onUpdateRecords={onUpdateRecords} />
        </div>

        <div className="floatingButtonWrap">
          <div className="floatingButtonInner">
            <a href="#" className="floatingButton">
              <i className="fa fa-plus icon-default"></i>
            </a>
            <ul className="floatingMenu">
              <li>
                <a href="#">Add Record</a>
              </li>
              <li>
                <a href="https://google.com" target="_blank">
                  Go To Google
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Budget;
