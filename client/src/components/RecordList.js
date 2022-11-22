import React, { useState, useEffect } from "react";
import "../stylesheets/recordList.css";
import Records from "./Records";
import PropTypes from "prop-types";

function RecordList() {
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
    <div className="recordList">
      <div className="container">
        <div>
          <Records records={records} onUpdateRecords={onUpdateRecords} />
        </div>
      </div>
    </div>
  );
}

RecordList.prototype = {};
export default RecordList;
