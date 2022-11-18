// Records.js
import React from "react";
import Record from "./Record";

function Records({ records }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Item</th>
          <th>Cost</th>
          <th>Modify Record</th> // where you'll put the edit button
        </tr>
      </thead>
      <tbody>
        {/* iterate through the records array and render a unique Record component for each record object in the array */}
        {records.map((record) => (
          <Record key={record._id} record={record} />
        ))}
      </tbody>
    </table>
  );
}

export default Records;
