// Records.js
import React from "react";
import Record from "./Record";

function Records({ records }) {
  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Category</th>
          <th scope="col">Item</th>
          <th scope="col">Cost</th>
          <th scope="col">Modify Record</th>
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
