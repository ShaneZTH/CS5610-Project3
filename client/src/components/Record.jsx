// Record.js
import React from "react";

// deconstructed props
function Record({ record: { id, category, date, item, cost } }) {
  return (
    <tr key={id}>
      <td>{date}</td>
      <td>{category}</td>
      <td>{item}</td>
      <td>{cost}</td>
      <td>
        <button>Edit</button>
      </td>
    </tr>
  );
}
export default Record;
