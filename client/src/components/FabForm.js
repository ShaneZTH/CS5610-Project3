import React from "react";
import PropTypes from "prop-types";
import "../../stylesheets/fabForm.css";

function FabForm() {
  return (
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
  );
}

FabForm.propTypes = {};
export default FabForm;
