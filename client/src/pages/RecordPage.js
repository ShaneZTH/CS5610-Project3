import React, { useState } from "react";

import FabForm from "../components/FabForm";
import "../stylesheets/budget.css";
import Records from "../components/Records";

function RecordPage() {
  return (
    <div>
      <h2>Budget</h2>
      <div className="budget">
        <div className="container">
          <div>
            <Records records={records} onUpdateRecords={onUpdateRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordPage;
