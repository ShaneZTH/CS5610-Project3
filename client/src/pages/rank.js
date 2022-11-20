import React, { useState } from "react";
function Rank() {
  return (
    <div>
      <h2>Rank {window.localStorage.getItem("name")}</h2>
    </div>
  );
}

export default Rank;
