import React, { useState } from "react";
import TipBox from "../components/TipBox";
function RankPage() {
  return (
    <div>
      <h2>Rank {window.localStorage.getItem("name")}</h2>
      <br></br>
      <TipBox></TipBox>
    </div>
  );
}

export default RankPage;
