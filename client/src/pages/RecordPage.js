import React, { useState } from "react";

import FabForm from "../components/FabForm";
import RecordList from "../components/RecordList";

function RecordPage() {
  return (
    <div>
      <h2>Budget</h2>
      <RecordList></RecordList>
      <FabForm></FabForm>
    </div>
  );
}

export default RecordPage;
